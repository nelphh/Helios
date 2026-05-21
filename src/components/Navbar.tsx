import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full max-w-[1280px] mx-auto flex items-center justify-between px-8 py-5">
      <Image
        src="/assets/Helios Duo white.svg"
        alt="Helios"
        width={121}
        height={33}
        priority
      />

      <button className="text-white p-1" aria-label="Menu">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="5"  width="18" height="2" rx="1" />
          <rect x="3" y="11" width="18" height="2" rx="1" />
          <rect x="3" y="17" width="18" height="2" rx="1" />
        </svg>
      </button>
    </nav>
  );
}
