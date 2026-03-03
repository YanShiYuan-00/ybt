
import React from 'react';

interface YaoShiBangHomeProps {
  onEntryClick: () => void;
}

const YaoShiBangHome: React.FC<YaoShiBangHomeProps> = ({ onEntryClick }) => {
  return (
    <div className="flex flex-col h-screen bg-white overflow-y-auto no-scrollbar">
      {/* 1. Header Area - Orange Background */}
      <div className="bg-[#FF6B01] px-4 pt-10 pb-4">
        <div className="flex justify-between items-center relative">
          <div className="w-10 flex items-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">药师帮</h1>
          <div className="w-10 flex items-center justify-end">
            {/* Empty for balance */}
          </div>
        </div>

        {/* 2. Banner Area - Integrated in Orange Header */}
        <div className="mt-6 bg-gradient-to-br from-[#FF8E53] to-[#FF6B30] rounded-2xl p-5 relative overflow-hidden flex shadow-lg border border-white/10">
          <div className="flex-1 z-10">
            <h2 className="text-white text-2xl font-black mb-1 italic tracking-wider">尾品捡漏区</h2>
            <p className="text-white/90 text-sm font-medium mb-4">大牌近效期 特价直降</p>
            <div className="flex gap-1.5">
              <div className="w-4 h-1.5 rounded-full bg-white"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            </div>
          </div>
          
          {/* Illustration Mockup */}
          <div className="absolute right-2 bottom-2 w-32 h-32 z-0">
             <div className="relative w-full h-full">
                {/* Gift Box Mockup */}
                <div className="absolute right-4 bottom-4 w-20 h-20 bg-yellow-400 rounded-xl rotate-12 shadow-md flex items-center justify-center">
                   <div className="w-full h-4 bg-red-500 absolute top-1/2 -translate-y-1/2"></div>
                   <div className="w-4 h-full bg-red-500 absolute left-1/2 -translate-x-1/2"></div>
                </div>
                {/* Pill Bottle Mockup */}
                <div className="absolute right-16 bottom-2 w-10 h-14 bg-pink-100 rounded-lg -rotate-12 shadow-sm border border-pink-200">
                   <div className="w-full h-4 bg-pink-400 rounded-t-lg"></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Grid Icons (3x3) */}
      <div className="px-4 py-8 grid grid-cols-3 gap-y-10">
        <GridItem 
          icon={
            <div className="relative flex items-center justify-center w-full h-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="absolute text-[10px] font-bold text-white mt-1">保</span>
            </div>
          }
          bgColor="bg-[#33B5FF]"
          label="医保通"
          onClick={onEntryClick}
        />
        <GridItem 
          icon={
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          bgColor="bg-[#5D99FF]"
          label="非药馆"
        />
        <GridItem 
          icon={
            <div className="relative flex items-center justify-center w-full h-full">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span className="absolute text-[8px] font-bold text-white -mt-1">药</span>
            </div>
          }
          bgColor="bg-[#FF6B6B]"
          label="药采购"
        />
        <GridItem 
          icon={
            <div className="relative flex items-center justify-center w-full h-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="absolute text-[8px] font-bold text-white mt-4">进口</span>
            </div>
          }
          bgColor="bg-[#A855F7]"
          label="全球购"
        />
        <GridItem 
          icon={
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          bgColor="bg-[#FB923C]"
          label="个人中心"
        />
        <GridItem 
          icon={
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </svg>
          }
          bgColor="bg-[#84CC16]"
          label="中药馆"
        />
        <GridItem 
          icon={
            <div className="relative flex items-center justify-center w-full h-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="absolute text-[10px] font-bold text-white mt-1">+</span>
            </div>
          }
          bgColor="bg-[#22C55E]"
          label="诊所优选"
        />
        <GridItem 
          icon={
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full shadow-inner shadow-blue-500/50"></div>
            </div>
          }
          bgColor="bg-[#3B82F6]"
          label="光谱小屋"
        />
        <GridItem 
          icon={
            <div className="relative flex items-center justify-center w-full h-full">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute text-[10px] font-bold text-white -mt-1">...</span>
            </div>
          }
          bgColor="bg-[#FACC15]"
          label="我的消息"
        />
      </div>
    </div>
  );
};

interface GridItemProps {
  icon: React.ReactNode;
  bgColor: string;
  label: string;
  onClick?: () => void;
}

const GridItem: React.FC<GridItemProps> = ({ icon, bgColor, label, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95" onClick={onClick}>
      <div className={`${bgColor} w-[68px] h-[68px] rounded-full flex items-center justify-center shadow-md`}>
        {icon}
      </div>
      <span className="text-[13px] font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default YaoShiBangHome;
