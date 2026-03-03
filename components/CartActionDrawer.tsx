
import React, { useState } from 'react';

interface CartActionDrawerProps {
  drug: any;
  onClose: () => void;
  onConfirm: () => void;
}

const CartActionDrawer: React.FC<CartActionDrawerProps> = ({ drug, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const total = drug.price * quantity;
  
  // Derived or mock data for the specific requirements
  const retailPrice = 12.5;
  const margin = "40.4%";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 animate-in fade-in duration-300">
      <div className="fixed inset-0" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-t-2xl px-4 pt-4 pb-6 w-full max-w-md mx-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header Section */}
        <div className="flex gap-3 mb-4 relative">
          <div className="w-24 h-24 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative">
            <img src={drug.image} className="w-full h-full object-cover" alt="" />
            {/* Added Type A Insurance Tag on Image */}
            <div className="absolute top-0 left-0 bg-[#00c250] text-white text-[8px] px-1 py-0.5 rounded-br font-bold">甲类医保</div>
          </div>
          <div className="flex-1 pr-6">
            <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">
              {drug.name}
            </h3>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-[#ff5c00] text-xl font-bold">¥{drug.price.toFixed(2)}</span>
              <span className="text-orange-500 text-[10px]">折合约¥{drug.discountPrice?.toFixed(2)}</span>
            </div>
            
            {/* Added Retail Price and Margin under Main Price */}
            <div className="mt-1 flex gap-3 text-[10px] text-gray-500">
              <span>最低零售价: ¥{retailPrice}</span>
              <span className="text-emerald-600 font-bold">毛利率: {margin}</span>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
               <div className="flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded">
                  <span className="text-red-500 text-[9px] font-bold italic">!</span>
                  <span className="text-red-500 text-[9px]">近效期药品</span>
               </div>
               {/* Updated Limited Reimbursement Condition to red style as requested */}
               <div className="flex items-center gap-1 bg-red-50 px-1.5 py-0.5 rounded">
                  <span className="text-red-600 text-[9px] font-medium">！限定报销条件</span>
               </div>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-0 right-0 p-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Promo */}
        <div className="flex items-center gap-2 mb-6">
           <span className="bg-orange-50 text-orange-600 text-[10px] px-1 py-0.5 rounded border border-orange-100 flex items-center justify-center font-bold">券</span>
           <span className="text-[12px] text-gray-800 font-medium">全场 97 折</span>
        </div>

        {/* Info Rows */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 text-xs">有效期至</span>
            <span className="text-orange-600 font-bold text-xs">{drug.expiry}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 text-xs">生产厂家</span>
            <span className="text-gray-800 font-medium text-xs max-w-[200px] truncate text-right">{drug.manufacturer}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 text-xs font-medium">购买数量</span>
            <div className="flex items-center border border-gray-200 rounded overflow-hidden h-8">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 h-full text-gray-400 bg-gray-50 active:bg-gray-100 transition-colors"
              >-</button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                className="w-12 text-center text-sm font-bold text-gray-800 border-x border-gray-200"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 h-full text-orange-600 bg-gray-50 active:bg-gray-100 transition-colors"
              >+</button>
            </div>
          </div>
        </div>

        {/* Summary and Shipping */}
        <div className="mb-6 pt-4 border-t border-gray-50">
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className="text-sm text-gray-800 font-bold">单品合计：</span>
            <span className="text-orange-600 text-xl font-black">¥ {total.toFixed(2)}</span>
          </div>
          <div className="text-[10px] text-gray-400 flex items-center flex-wrap gap-1 bg-[#fffaf5] p-2 rounded border border-orange-50">
            <span className="text-orange-600 font-bold">运费 ¥20</span>
            <span className="text-gray-300 mx-1">|</span>
            <span>药利达旗舰店 1000 元包邮，距包邮还差 981.20 元</span>
          </div>
        </div>

        {/* Bottom Button */}
        <button 
          onClick={onConfirm}
          className="w-full bg-[#ff5c00] text-white font-bold py-4 rounded-xl text-base shadow-lg shadow-orange-100 active:scale-[0.98] transition-all"
        >
          确认加入购物车
        </button>
      </div>
    </div>
  );
};

export default CartActionDrawer;
