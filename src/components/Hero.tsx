import ProductDemo from './ProductDemo';

export default function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-8 pt-10 pb-20 flex items-center gap-4">
      {/* Left — copy */}
      <div className="flex flex-col gap-8 w-[44%] shrink-0">
        <h1 className="text-white font-bold text-[64px] leading-[1.1] tracking-tight">
          <span style={{ display: 'block', animation: 'fadeInUp 0.5s ease 0.05s both' }}>Turn private</span>
          <span style={{ display: 'block', animation: 'fadeInUp 0.5s ease 0.2s both' }}>archives into</span>
          <span style={{ display: 'block', animation: 'fadeInUp 0.5s ease 0.35s both' }}>
            <span style={{ display: 'inline-block', padding: '3px 8px', lineHeight: '1', position: 'relative' }}>
              instant answers.
              <span style={{
                position: 'absolute',
                inset: 0,
                border: '2px solid #ff9359',
                borderRadius: 6,
                animation: 'draw-border 0.55s ease 0.85s both',
              }} />
            </span>
          </span>
        </h1>

        <p className="text-[#8b90a6] text-lg leading-relaxed" style={{ animation: 'fadeInUp 0.5s ease 0.55s both' }}>
          Helios searches decades of your knowledge in<br />natural language.
        </p>

        <div className="flex items-center gap-4 mt-2" style={{ animation: 'fadeInUp 0.5s ease 0.7s both' }}>
          <button className="bg-white text-black font-semibold text-sm px-6 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
            Request Access
          </button>
          <button className="border border-white/60 text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-white/8 transition-colors cursor-pointer">
            View Demo
          </button>
        </div>
      </div>

      {/* Right — animated product demo */}
      <div className="flex-1 min-w-0" style={{ position: 'relative', isolation: 'isolate', animation: 'fadeInUp 0.6s ease 0.15s both' }}>
        {/* Liquid gradient background */}
        <div style={{ position: 'absolute', inset: '-90px -110px', zIndex: -1, filter: 'blur(60px)' }}>
          <div className="animate-blob-1" style={{
            position: 'absolute', width: '60%', height: '65%',
            top: '10%', left: '8%',
            borderRadius: '42% 58% 65% 35% / 45% 52% 48% 55%',
            background: 'rgba(255,147,89,0.45)',
          }} />
          <div className="animate-blob-2" style={{
            position: 'absolute', width: '55%', height: '60%',
            bottom: '8%', right: '6%',
            borderRadius: '68% 32% 42% 58% / 55% 45% 65% 35%',
            background: 'rgba(255,80,20,0.38)',
          }} />
          <div className="animate-blob-3" style={{
            position: 'absolute', width: '45%', height: '50%',
            top: '35%', left: '28%',
            borderRadius: '55% 45% 35% 65% / 40% 60% 40% 60%',
            background: 'rgba(255,120,50,0.28)',
          }} />
        </div>
        <ProductDemo />
      </div>
    </section>
  );
}
