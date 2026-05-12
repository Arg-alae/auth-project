import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  // baseURL → l'adresse du backend
  // au lieu d'écrire http://localhost:3001 partout, on l'écrit une fois
});

// INTERCEPTEUR DE REQUÊTE
// avant chaque requête → ajoute automatiquement le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // ajoute le header Authorization automatiquement
  }
  return config;
});

// INTERCEPTEUR DE RÉPONSE
// si le serveur retourne 401 → essaie de rafraîchir le token
api.interceptors.response.use(
  (response) => response,
  // si succès → retourne la réponse normalement

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // 401 = token expiré
      // _retry → évite une boucle infinie

      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post('http://localhost:3001/auth/refresh', {
          refresh_token: refreshToken,
        }, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        // sauvegarde les nouveaux tokens
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);

        // relance la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api(originalRequest);

      } catch {
        // refresh token expiré aussi → logout forcé
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;