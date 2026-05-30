import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Moon, Sun, X, MessageCircle } from 'lucide-react';

export function Layout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [showWeChat, setShowWeChat] = useState(false);

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
          <Link to="/archive?view=wall" className="text-sm font-serif text-muted hover:text-primary transition-colors">
            岁月画卷
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
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed font-serif">
            本站为非官方、非盈利个人项目，自费维护以存乡愁记忆，请勿商用。部分馆藏为自发整理，若内容侵犯您的著作权、肖像权或隐私，请通过 <a href="https://my.feishu.cn/share/base/form/shrcnEjmKVCgQvdK09PMxrNXt6J" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">飞书表单</a>、<button onClick={() => setShowWeChat(true)} className="text-gold hover:underline font-medium cursor-pointer">微信联络</button> 或邮件 <a href="mailto:gudong.name@gmail.com" className="text-gold hover:underline font-medium">gudong.name@gmail.com</a> 联系我，将在核实后第一时间处理。
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-[11px] leading-relaxed font-serif italic">
            * 本站由作者在 AI 伙伴（Claude Code & Gemini）协同协助下编码共建，以数字化技术留存岁月的印记。
          </p>
        </div>
        
        <div className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest flex flex-col gap-2">
          <span>&copy; {new Date().getFullYear()} 数字月牙湖 (Digital Yueyahu)</span>
          <span>Designed & Handcrafted with Heart</span>
        </div>
      </footer>

      {/* WeChat Modal Popup */}
      {showWeChat && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setShowWeChat(false)}
        >
          <div 
            className="relative bg-zinc-900 text-white p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl max-w-xs w-full mx-4 text-center transform scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowWeChat(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X size={18} />
            </button>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-gold mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-gold mb-1">我是咕咚</h3>
              <p className="text-white/40 text-xs mb-2">本站发起人 · 月牙湖村村民</p>
              <p className="text-white/60 text-xs mb-6 max-w-[200px] leading-relaxed">
                欢迎扫码添加微信，<br />交流村史乡情，或提供珍贵资料。
              </p>
              
              <div className="relative p-2 bg-white rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.25)] border border-gold/20">
                <img 
                  src="https://gudong.s3.bitiful.net/asset/gudong_wechat_qr.jpg" 
                  alt="作者微信二维码" 
                  className="w-48 h-48 md:w-52 md:h-52 object-cover rounded-xl select-none"
                  draggable={false}
                />
              </div>
              
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono mt-6">
                Digital Yueyahu Archive
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
