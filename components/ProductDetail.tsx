
import React from 'react';

interface ProductDetailProps {
  drug: any;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ drug, onBack }) => {
  // Mocking data based on the screenshot
  const price = 7.45;
  const discountPrice = 7.31;
  const margin = "40.4%";
  const retailPrice = 12.5;

  return (
    <div className="flex flex-col h-screen bg-[#f7f8fa] overflow-y-auto no-scrollbar relative">
      {/* 1. Immersive Header Icons */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-between px-4 items-center">
        <button onClick={onBack} className="w-9 h-9 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex gap-2">
          <button className="w-9 h-9 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" /></svg>
          </button>
          <button className="w-9 h-9 bg-black/20 rounded-full flex items-center justify-center backdrop-blur-sm text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* 2. Banner Image with Ribbon */}
      <div className="relative w-full aspect-[4/3] bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
          className="w-full h-full object-cover" 
          alt="Product"
        />
        <div className="absolute bottom-6 left-0 bg-[#e60012] text-white px-6 py-2 rounded-r-full font-bold text-lg shadow-lg">
          厂牌优选
        </div>
      </div>

      {/* 3. Price and Title Section */}
      <div className="bg-white px-4 py-5 shadow-sm">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[#ff5c00] text-2xl font-black">{price.toFixed(2)}</span>
            <span className="text-gray-400 text-[12px]">元/盒 (含票)</span>
          </div>
          <span className="text-gray-500 text-[12px] font-medium">2盒起购</span>
        </div>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            折合约 ¥{discountPrice.toFixed(2)}
            <div className="w-3 h-3 border border-gray-300 rounded-full flex items-center justify-center text-[7px] font-bold">i</div>
          </div>
          <div className="flex-1 flex gap-4 text-[11px] text-gray-500">
            <span>最低零售价: ¥{retailPrice}</span>
            <span className="text-emerald-500 font-bold">参考毛利率: {margin}</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 leading-tight">
          白云山 何济公 感冒灵颗粒 10g*9袋
        </h1>
      </div>

      {/* 4. Discounts Section */}
      <div className="bg-white px-4 py-4 mt-2 flex items-center justify-between shadow-sm">
        <div className="flex gap-3 items-center">
          <span className="text-[13px] text-gray-400">平台优惠</span>
          <div className="flex gap-2">
            <CouponTag text="平台券" />
            <CouponTag text="旗舰店99折" />
            <CouponTag text="跨店98折" />
          </div>
        </div>
        <button className="bg-[#ff5c00] text-white text-[11px] font-bold px-4 py-1.5 rounded-full">领券</button>
      </div>

      {/* 5. Shipping Section */}
      <div className="bg-white px-4 py-4 mt-2 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-[13px] text-gray-400 whitespace-nowrap">配送说明</span>
          <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
            [广东广州发货] 满199元包邮，未满包邮金额，补充运费6元发货
          </p>
        </div>
      </div>

      {/* 6. Medical Info Table */}
      <div className="bg-white px-4 py-6 mt-2 mb-20 shadow-sm">
        <div className="flex gap-2 mb-6">
          <span className="bg-[#00c250] text-white text-[11px] px-2 py-0.5 rounded font-medium">甲类医保</span>
          <OutlineTag text="OTC" color="text-red-500" border="border-red-200" />
          <OutlineTag text="溯源码" color="text-blue-500" border="border-blue-200" />
          <OutlineTag text="出库扫码" color="text-blue-500" border="border-blue-200" />
        </div>

        <div className="space-y-5">
          <InfoRow label="商品名称" value="感冒灵颗粒 10g*9袋" />
          <InfoRow label="药品代码" value="X8612345678901234567890" />
          <InfoRow label="包装规格" value="10g*9袋" />
          <InfoRow label="生产厂家" value="广州白云山医药集团股份有限公司白云山何济公制药厂" />
          <InfoRow label="医保备注" value="限定二级医院及以上使用" />
        </div>
      </div>

      {/* 7. Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-2 flex items-center gap-4 z-50">
        <div className="flex gap-5 px-1">
          <NavIcon label="购物车" icon={<CartIcon />} />
          <NavIcon label="客服" icon={<SupportIcon />} />
          <NavIcon label="店铺" icon={<ShopIcon />} />
        </div>
        <button className="flex-1 bg-[#ff5c00] text-white font-bold py-3.5 rounded-full text-base active:opacity-90 transition-all shadow-lg shadow-orange-100">
          加入购物车
        </button>
      </div>
    </div>
  );
};

const CouponTag: React.FC<{ text: string }> = ({ text }) => (
  <span className="border border-orange-200 text-[#ff5c00] text-[10px] px-2 py-0.5 rounded font-medium">
    {text}
  </span>
);

const OutlineTag: React.FC<{ text: string, color: string, border: string }> = ({ text, color, border }) => (
  <span className={`border ${border} ${color} text-[11px] px-2 py-0.5 rounded font-medium`}>
    {text}
  </span>
);

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex">
    <span className="w-24 text-[13px] text-gray-400 shrink-0">{label}</span>
    <span className="flex-1 text-[13px] text-gray-800 font-medium leading-relaxed">{value}</span>
  </div>
);

const NavIcon: React.FC<{ label: string; icon: React.ReactNode }> = ({ label, icon }) => (
  <div className="flex flex-col items-center gap-1 active:opacity-60">
    {icon}
    <span className="text-[10px] text-gray-500 font-medium">{label}</span>
  </div>
);

const CartIcon = () => (
  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const SupportIcon = () => (
  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
);

const ShopIcon = () => (
  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
);

export default ProductDetail;
