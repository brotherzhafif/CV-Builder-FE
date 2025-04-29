// components/HeaderFooter.jsx

export function ScoringHeader() {
  return (
    <header className="bg-[#2889CE] text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          {/* Tambahkan logo di sini - ganti dengan path logo Anda */}
          <img 
            src="src/assets/mbc-logo.png" 
            alt="Logo" 
            className="h-12 w-13" 
          />
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold">CV Builder</span>
            <span className="text-sm font-semibold">CV Scoring</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Header() {
  return (
    <header className="bg-[#2889CE] text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-3">
          {/* Tambahkan logo di sini - ganti dengan path logo Anda */}
          <img 
            src="src/assets/mbc-logo.png" 
            alt="Logo" 
            className="h-12 w-13" 
          />
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold">CV Builder</span>
            <span className="text-sm font-semibold">CV Scoring</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#2889CE] text-white py-4 text-center shadow-md">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">HACKATHON MAXY ACADEMY 2025</h1>
        <p className="text-sm mt-1 font-medium">Batch 17</p>
      </div>
    </footer>
  );
}