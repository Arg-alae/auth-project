import logo from '../assets/logo.png';

interface AuthLayoutProps {
  image: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ image, title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAF9F7]">

      {/* CÔTÉ GAUCHE — IMAGE */}
      <div className="hidden md:block md:w-1/2 md:min-w-[50%] md:max-w-[50%] relative overflow-hidden">
        <img
          src={image}
          alt="background"
          className="w-full h-full object-cover object-center"
        />

        {/* LOGO */}
        <div className="absolute top-7 left-7">
          <img src={logo} alt="Morazon" className="h-5 brightness-0 invert" />
        </div>

        {/* TEXTE EN BAS */}
        <div
          className="absolute bottom-0 left-0 right-0 px-7 py-8"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
        >
          <h2 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {title}
          </h2>
          <p className="text-white/75 text-xs leading-relaxed max-w-xs" style={{ fontFamily: 'Georgia, serif' }}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* CÔTÉ DROIT — FORMULAIRE */}
      <div className="w-full md:w-1/2 md:min-w-[50%] md:max-w-[50%] flex flex-col justify-center items-center bg-[#FAF9F7] overflow-auto px-6">

        {/* Logo mobile */}
        <div className="md:hidden mb-8">
          <img src={logo} alt="Morazon" className="h-5" />
        </div>

        {/* Contenu */}
        <div className="w-full max-w-[300px]">
          {children}
        </div>

      </div>
    </div>
  );
}