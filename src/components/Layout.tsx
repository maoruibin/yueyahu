import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-base selection:bg-gold selection:text-inverse transition-colors duration-300">
      <nav className="px-6 py-6 md:px-12 flex justify-between items-center border-b border-subtle/50 sticky top-0 bg-nav backdrop-blur-md z-40 transition-colors duration-300">
        <Link to="/" className="font-serif text-xl tracking-widest text-primary hover:text-gold transition-colors">
          数字月牙湖
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/archive" className="text-sm font-serif text-muted hover:text-primary transition-colors">
            全宗档案
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-surface transition-colors text-muted hover:text-primary flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-footer border-t border-subtle pt-16 pb-8 px-6 md:px-12 text-center transition-colors duration-300">
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-muted text-sm md:text-base leading-relaxed font-serif italic opacity-80 decoration-gold underline-offset-4 pointer-events-auto">
            “本项目纯属个人兴趣驱动，自费维护，是非官方、非盈利的数字化记录行为。所有展示资料仅供乡情寄托与历史记忆留存，受技术手段保护，请勿通过任何违规方式下载或用于商业用途。”
          </p>
        </div>
        
        <div className="text-xs font-mono text-muted/50 uppercase tracking-widest flex flex-col gap-2">
          <span>&copy; {new Date().getFullYear()} 数字月牙湖 (Digital Yueyahu)</span>
          <span>Designed & Handcrafted with Heart</span>
        </div>
      </footer>
    </div>
  );
}
