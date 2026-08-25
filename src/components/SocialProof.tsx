export default function SocialProof() {
  return (
    <section className="py-16 bg-[#0A1628] text-white border-y border-white/10 relative overflow-hidden">
      {/* Network background subtle */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="network-proof" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#3B9EFF" />
              <line x1="50" y1="50" x2="100" y2="0" stroke="#1E5FE0" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="0" y2="100" stroke="#1E5FE0" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#network-proof)" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-transparent to-[#0A1628] z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3B9EFF] to-[#1E5FE0] mb-2">[+50]</span>
            <span className="text-gray-300 font-medium">Projetos Entregues</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 pt-8 md:pt-4">
            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3B9EFF] to-[#1E5FE0] mb-2">[+5]</span>
            <span className="text-gray-300 font-medium">Anos de Experiência</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 pt-8 md:pt-4">
            <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3B9EFF] to-[#1E5FE0] mb-2">[100%]</span>
            <span className="text-gray-300 font-medium">Clientes Satisfeitos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
