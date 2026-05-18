import { ArrowUpRight } from 'lucide-react';

export function FeishuForm() {
  return (
    <section className="py-24 border-t border-subtle relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold rounded-full opacity-[0.05] blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <h2 className="font-serif text-3xl md:text-5xl font-light text-primary mb-6">
          参与共建：留下您的时代印记
        </h2>
        <p className="text-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          如果您手中也保存着关于月牙湖村五社、六社的老照片、旧土地证、录音，或者任何带有岁月痕迹的物件，欢迎您提供给我们。历史不应被遗忘，让我们共同丰富这座云端档案馆。
        </p>
        
        <a 
          href="https://my.feishu.cn/share/base/form/shrcnEjmKVCgQvdK09PMxrNXt6J"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-base font-medium hover:bg-gold transition-all duration-300 group shadow-md"
          // In light mode, primary is dark text, so we need inverse text on primary block... wait.
          // Let's explicitly set the button text and background
        >
          <span className="text-inverse">提交老资料 (飞书表单)</span>
          <ArrowUpRight size={18} className="text-inverse group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
        
        <div className="mt-8 text-xs text-muted opacity-70">
          * 您的资料提交后，我们将进行筛选与整理，并使用数字水印技术保护您的版权与隐私。
        </div>
      </div>
    </section>
  );
}
