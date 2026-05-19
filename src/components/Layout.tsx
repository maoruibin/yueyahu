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
          <Link to="/about" className="text-sm font-serif text-muted hover:text-primary transition-colors">
            关于月牙湖
          </Link>
          <Link to="/archive" className="text-sm font-serif text-muted hover:text-primary transition-colors">
            时光印记
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
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-serif pt-4">
            “本项目纯属个人兴趣驱动，自费维护，是非官方、非盈利的数字化记录行为。所有展示资料仅供乡情寄托与历史记忆留存，受技术手段保护，请勿通过任何违规方式下载或用于商业用途。”
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-serif pt-4">
            网站中涉及的老照片、印鉴、影像等资料，均为个人自发收集整理。若任何内容侵犯了您的肖像权、隐私权或著作权，请通过 <a href="https://my.feishu.cn/share/base/form/shrcnEjmKVCgQvdK09PMxrNXt6J" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">飞书表单</a> 留言或发送邮件至 <a href="mailto:gudong.name@gmail.com" className="text-gold hover:underline font-medium">gudong.name@gmail.com</a> 联系我，我将在核实后第一时间删除处理。
          </p>
        </div>
        
        <div className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest flex flex-col gap-2">
          <span>&copy; {new Date().getFullYear()} 数字月牙湖 (Digital Yueyahu)</span>
          <span>Designed & Handcrafted with Heart</span>
        </div>
      </footer>
    </div>
  );
}
