
import { BookOpen, Copy, Check, FileDown, ArrowRight, Wand2 } from 'lucide-react';
import React, { useState, useRef } from 'react';

interface StepFormattedProps {
  formattedText: string;
  onConvertToPdf: () => void;
  onBack: () => void;
}

const StepFormatted: React.FC<StepFormattedProps> = ({ formattedText, onConvertToPdf, onBack }) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (contentRef.current) {
      navigator.clipboard.writeText(contentRef.current.innerText || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#0f172a] rounded-3xl border border-gray-800 p-8 max-w-5xl mx-auto animate-fade-in shadow-2xl">
      {/* Header Section Matches StepRawText Style */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-900/20 p-2 rounded-lg border border-cyan-700/30">
             <BookOpen className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">المذكرة الأكاديمية المنسقة</h2>
            <p className="text-sm text-gray-500">مراجعة وتحرير المحتوى قبل التصدير النهائي</p>
          </div>
        </div>
        <button 
          onClick={handleCopy}
          className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold bg-white/5 px-4 py-2 rounded-xl border border-white/5"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          {copied ? 'تم النسخ' : 'نسخ النص'}
        </button>
      </div>

      {/* Main Content Area Matches StepRawText Styling */}
      <div className="bg-[#020617] p-8 rounded-2xl border border-gray-800 mb-8 max-h-[650px] overflow-y-auto custom-scrollbar relative group">
        <style>{`
          .editable-formatted-content {
            font-family: 'Tajawal', sans-serif;
            line-height: 1.8;
            color: #cbd5e1;
            direction: rtl;
            text-align: right;
            outline: none;
          }
          .editable-formatted-content h2 {
            color: #60a5fa;
            font-size: 1.5rem;
            font-weight: 800;
            margin: 2rem 0 1rem;
            border-right: 4px solid #2563eb;
            padding-right: 12px;
          }
          .editable-formatted-content h3 {
            color: #38bdf8;
            font-size: 1.25rem;
            font-weight: 700;
            margin: 1.5rem 0 0.8rem;
            border-right: 3px solid #0ea5e9;
            padding-right: 10px;
          }
          .editable-formatted-content p { 
            margin-bottom: 1.2rem; 
            font-size: 1.15rem;
            color: #94a3b8;
          }
          .editable-formatted-content .mansa-gold-box {
            border: 1px solid rgba(234, 179, 8, 0.3);
            border-radius: 16px;
            padding: 1.5rem;
            margin: 2rem 0;
            background-color: rgba(254, 243, 199, 0.02);
          }
          .editable-formatted-content .gold-label {
            color: #fbbf24;
            font-weight: 800;
            font-size: 1.1rem;
            margin-bottom: 8px;
            display: block;
          }
          .editable-formatted-content ul, .editable-formatted-content ol {
            padding-right: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .editable-formatted-content li {
            margin-bottom: 0.8rem;
            font-size: 1.15rem;
            color: #cbd5e1;
          }
          .editable-formatted-content b, .editable-formatted-content strong {
            color: #ffffff;
            font-weight: 700;
          }
        `}</style>
        
        <div 
          ref={contentRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          className="editable-formatted-content"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
        
        {/* Floating helper for users */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-black text-primary-400 pointer-events-none">
          المحتوى متاح للتعديل المباشر
        </div>
      </div>

      {/* Action Buttons Matches StepRawText Style */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-cyan-500/60 text-[10px] font-black tracking-widest uppercase">
           <Wand2 size={12} />
           <span>Academic Structuring Active</span>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onBack}
            className="flex-1 md:flex-none bg-gray-800/50 hover:bg-gray-800 text-gray-400 px-6 py-4 rounded-2xl border border-gray-700 transition-all flex items-center justify-center gap-2 font-bold"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع للتفريغ</span>
          </button>
          
          <button
            onClick={onConvertToPdf}
            className="flex-[2] md:flex-none bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-cyan-950/20 flex items-center justify-center gap-3 transform transition hover:-translate-y-1 active:scale-95"
          >
            <FileDown className="w-5 h-5" />
            <span>معاينة وتصدير PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFormatted;
