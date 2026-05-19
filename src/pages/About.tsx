import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import { Layout } from '../components/Layout';
import { aboutMarkdown } from '../data/about';

export function About() {
  return (
    <Layout>
      <div className="min-h-screen bg-base pt-12 pb-24 px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative Header */}
          <div className="mb-16 text-center">
             <div className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-xs font-mono tracking-widest uppercase mb-4">
              月牙湖地理志
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-6">
              月牙湖
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          {/* Article Meta */}
          <div className="flex items-center justify-center gap-8 mb-12 text-muted text-sm font-serif italic border-y border-subtle/30 py-6">
            <span>百科词条</span>
            <span className="w-1 h-1 rounded-full bg-subtle"></span>
            <span>更新于 2024年</span>
            <span className="w-1 h-1 rounded-full bg-subtle"></span>
            <span>王信堡村</span>
          </div>

          {/* Featured Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-subtle/50 group">
                <img 
                  src="https://s3.bitiful.net/gudong/yueyahu/scenery/2017年10月5日-站在前山坡看月牙湖.jpg" 
                  alt="站在前山坡看月牙湖" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-muted text-center font-serif italic">站在前山坡看月牙湖 (2017)</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg border border-subtle/50 group">
                <img 
                  src="https://s3.bitiful.net/gudong/yueyahu/scenery/2017年10月5日-中泉湖滩以及大树林.jpg" 
                  alt="中泉湖滩以及大树林" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-muted text-center font-serif italic">中泉湖滩以及大树林 (2017)</p>
            </motion.div>
          </div>

          {/* Markdown Content */}
          <div className="markdown-body">
            <Markdown 
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a 
                    {...props} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gold hover:underline cursor-pointer transition-all underline-offset-4"
                  />
                )
              }}
            >
              {aboutMarkdown}
            </Markdown>
          </div>

          {/* Footer of article */}
          <div className="mt-24 pt-12 border-t border-subtle/50 text-center">
            <p className="text-muted text-sm italic font-serif">
               “山河依旧，时光恒久。记录是为了更好地见证。”
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
