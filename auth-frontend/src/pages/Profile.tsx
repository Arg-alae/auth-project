import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import type { User } from '../types/auth.types';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  // User | null → soit un User soit null
  // plus de "any" → TypeScript sait exactement ce que contient user

  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    api.get<User>('/auth/me')
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        window.location.href = '/login';
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: 100 }}>Chargement...</p>;

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>Mon Profil</h2>
      <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 20, marginBottom: 20 }}>
        <p><strong>Nom :</strong> {user?.name}</p>
        <p><strong>Email :</strong> {user?.email}</p>
        <p><strong>Membre depuis :</strong> {new Date(user?.createdAt ?? '').toLocaleDateString('fr-FR')}</p>
      </div>
      <button
        onClick={logout}
        style={{
          width: '100%',
          padding: 10,
          background: '#e53e3e',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
        }}>
        Se déconnecter
      </button>
    </div>
  );
}