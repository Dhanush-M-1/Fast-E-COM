export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="font-semibold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
            Fast-E-COM
          </span>
        </div>
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Fast-E-COM. All rights reserved.
        </p>
        <div className="flex gap-4 text-text-muted text-sm">
          <a href="#" className="hover:text-text transition-colors">Privacy</a>
          <a href="#" className="hover:text-text transition-colors">Terms</a>
          <a href="#" className="hover:text-text transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
