
import React, { useMemo } from 'react';

interface DrugSearchListProps {
  searchTerm: string;
  targetPrice: number;
  onBack: () => void;
  onSelectProduct: (drug: any) => void;
  onAddToCart: (drug: any) => void;
}

const DrugSearchList: React.FC<DrugSearchListProps> = ({ searchTerm, targetPrice, onBack, onSelectProduct, onAddToCart }) => {
  const searchResults = useMemo(() => [
    {
      id: 'd1',
      name: `白云山 何济公 ${searchTerm} 10g*9袋`,
      manufacturer: '石家庄以岭药业股份有限公司', // Updated to match image context
      isOfficial: true,
      price: targetPrice || 18.80,
      discountPrice: (targetPrice || 18.80) * 0.97,
      expiry: '2023-01-28',
      category: '甲',
      moq: '1盒起购',
      shipping: '1000免邮',
      store: '药利达旗舰店',
      isGroup: false,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'd2',
      name: `【首推】 以岭 ${searchTerm} 0.35g*24粒`,
      manufacturer: '石家庄以岭药业股份有限公司',
      isOfficial: false,
      price: 18.80,
      expiry: '2023-01-28',
      category: '乙',
      moq: '1盒起购',
      shipping: '1000免邮',
      isTomorrow: true,
      store: '药利达旗舰店',
      isGroup: false,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400'
    }
  ], [searchTerm, targetPrice]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* 1. Header */}
      <div className="px-4 py-2 flex items-center gap-3 bg-white">
        <button onClick={onBack} className="p-1">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex-1 bg-[#f2f3f5] rounded-full h-9 flex items-center px-4 gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-gray-800 text-sm font-medium">{searchTerm}</span>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative">
             <CartIcon />
             <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">1</span>
           </div>
           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
      </div>

      {/* 2. Primary Filters */}
      <div className="flex justify-around py-3 border-b border-gray-50 text-[13px] text-gray-700 font-medium">
        <div className="flex items-center gap-0.5">排序 <span className="text-[10px] text-gray-400">∨</span></div>
        <div className="flex items-center gap-0.5">厂家/规格 <span className="text-[10px] text-gray-400">∨</span></div>
        <div className="flex items-center gap-0.5">商家 <span className="text-[10px] text-gray-400">∨</span></div>
        <div className="flex items-center gap-1.5">筛选 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg></div>
      </div>

      {/* 3. Filter Chips */}
      <div className="flex gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar bg-white">
        <Chip text="平台97折" active />
        <Chip text="1盒起购" />
        <Chip text="整件购" />
        <Chip text="效期1年以上" />
      </div>

      {/* 4. Product List */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9fb]">
        {searchResults.map((item) => (
          <div 
            key={item.id} 
            className="flex p-4 bg-white mb-2 last:mb-0 active:bg-gray-50 transition-colors"
            onClick={() => onSelectProduct(item)} // Card click goes to detail
          >
            <div className="relative w-[110px] h-[110px] shrink-0">
              <img src={item.image} className="w-full h-full object-cover rounded-md bg-gray-50" alt="" />
              <div className="absolute top-0 left-0 bg-red-400/90 text-white text-[9px] px-1.5 py-0.5 rounded-br font-bold">近效期</div>
            </div>

            <div className="ml-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="bg-amber-100 text-amber-700 text-[9px] px-1 py-0.5 rounded">优选</span>
                  <span className="bg-orange-600 text-white text-[9px] px-1 py-0.5 rounded">金方一级</span>
                  <h3 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-1">{item.name}</h3>
                </div>
                <div className="bg-gray-50 text-gray-400 text-[10px] px-1.5 py-0.5 rounded inline-block">有效期至 {item.expiry}</div>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[#e60012] text-[18px] font-bold">¥{item.price.toFixed(2)}</span>
                  <span className="text-orange-500 text-[10px] ml-1">折合约¥{item.discountPrice?.toFixed(2)}</span>
                </div>

                <div className="text-[10px] text-gray-400 mt-1">{item.moq}</div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                       <span className="text-orange-600 text-[9px] font-bold">京东快递</span>
                       <span className="text-gray-400 text-[9px] border border-gray-200 px-1 rounded">商家券</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-1">
                      {item.shipping}免邮 {item.store} <span className="ml-0.5">›</span>
                    </div>
                  </div>
                  <button 
                    className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-sm active:scale-90 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent detail navigation
                      onAddToCart(item);
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Bottom Navigation Bar */}
      <div className="bg-white border-t border-gray-100 flex h-14 shrink-0 px-2 shadow-inner">
        <NavTab label="分类" icon={<CategoryIcon />} />
        <NavTab label="消息" icon={<MessageIcon />} />
        <NavTab label="购物车" icon={<CartIcon />} />
        <NavTab label="我的" icon={<UserIcon />} />
      </div>
    </div>
  );
};

const Chip: React.FC<{ text: string; active?: boolean }> = ({ text, active }) => (
  <div className={`${active ? 'bg-gray-100 text-orange-600' : 'bg-[#f2f3f5] text-gray-600'} text-[11px] px-4 py-1.5 rounded-full whitespace-nowrap font-medium active:bg-gray-200`}>
    {text}
  </div>
);

const NavTab: React.FC<{ label: string; icon: React.ReactNode; active?: boolean }> = ({ label, icon, active }) => (
  <div className="flex-1 flex flex-col items-center justify-center gap-0.5">
    {icon}
    <span className={`text-[10px] ${active ? 'text-[#ff5c00] font-bold' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const CategoryIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);

export default DrugSearchList;
