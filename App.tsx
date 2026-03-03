
import React, { useState } from 'react';
import YaoShiBangHome from './components/YaoShiBangHome';
import MedicalInsuranceSearch from './components/MedicalInsuranceSearch';
import ProductDetail from './components/ProductDetail';
import DrugSearchList from './components/DrugSearchList';
import CartActionDrawer from './components/CartActionDrawer';
import { Drug } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'insurance' | 'searchList' | 'detail' | 'cartDrawer' | 'payment'>('home');
  // Store the source drug from Page 2 to maintain Page 3's context
  const [searchContextDrug, setSearchContextDrug] = useState<Drug | null>(null);
  // Store the specific item chosen from Page 3 to show in Drawer and Detail
  const [selectedDrug, setSelectedDrug] = useState<any>(null);

  // Membership states
  const [isMember, setIsMember] = useState(false);
  const [membershipExpiry, setMembershipExpiry] = useState<string | null>(null);
  const [showMembershipPopup, setShowMembershipPopup] = useState(false);
  const [insuranceSearchTerm, setInsuranceSearchTerm] = useState('');
  const currentPurchaseAmount = 15680.50; // Mock current purchase amount

  const navigateToInsurance = () => {
    setCurrentPage('insurance');
  };

  const navigateToHome = () => setCurrentPage('home');
  
  const navigateToSearchList = (drug: Drug, currentSearchTerm: string) => {
    setSearchContextDrug(drug);
    setInsuranceSearchTerm(currentSearchTerm);
    setCurrentPage('searchList');
  };

  const navigateToCartDrawer = (productItem: any) => {
    setSelectedDrug(productItem);
    setCurrentPage('cartDrawer');
  };

  const navigateToDetail = (productItem: any) => {
    setSelectedDrug(productItem);
    setCurrentPage('detail');
  };

  const handleBackToSearchList = () => {
    setCurrentPage('searchList');
  };

  const handlePay = () => {
    setShowMembershipPopup(false);
    setCurrentPage('payment');
  };

  const handlePaymentSuccess = () => {
    setIsMember(true);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    setMembershipExpiry(expiryDate.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }));
    setCurrentPage('insurance');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 overflow-x-hidden shadow-xl relative">
      {currentPage === 'home' && (
        <YaoShiBangHome onEntryClick={navigateToInsurance} />
      )}
      
      {currentPage === 'insurance' && (
        <MedicalInsuranceSearch 
          onBack={navigateToHome} 
          onBuy={navigateToSearchList} 
          membershipExpiry={membershipExpiry}
          isMember={isMember || currentPurchaseAmount > 30000}
          onShowMembershipPopup={() => setShowMembershipPopup(true)}
          searchTerm={insuranceSearchTerm}
          onSearchTermChange={setInsuranceSearchTerm}
        />
      )}
      
      {currentPage === 'searchList' && searchContextDrug && (
        <DrugSearchList 
          searchTerm={insuranceSearchTerm || searchContextDrug.name} 
          targetPrice={searchContextDrug.lowestPrice}
          drugName={searchContextDrug.name}
          onBack={navigateToInsurance} 
          onSelectProduct={navigateToDetail}
          onAddToCart={navigateToCartDrawer}
        />
      )}

      {currentPage === 'cartDrawer' && selectedDrug && (
        <CartActionDrawer 
          drug={selectedDrug} 
          onClose={handleBackToSearchList}
          onConfirm={() => {
            alert('已成功加入购物车');
            setCurrentPage('searchList');
          }}
        />
      )}
      
      {currentPage === 'detail' && selectedDrug && (
        <ProductDetail 
          drug={selectedDrug} 
          onBack={handleBackToSearchList} 
        />
      )}

      {currentPage === 'payment' && (
        <PaymentPage 
          onBack={() => setCurrentPage('home')}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Membership Popup */}
      {showMembershipPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMembershipPopup(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-sm relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#333333] p-8 text-center text-white relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="w-14 h-14 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3">
                <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-1 tracking-tight">开通会员权益</h3>
              <p className="text-gray-400 text-xs font-medium">任选以下一种方式，均可即刻开通</p>
            </div>
            
            <div className="p-6 space-y-5 bg-[#F9F9F9]">
              {/* Option 1: Payment */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative group active:scale-[0.98] transition-all cursor-pointer" onClick={handlePay}>
                <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-md shadow-sm">方式一</div>
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">付费直接开通</h4>
                    <p className="text-xs text-gray-400 mt-0.5">即买即用，尊享30天权益</p>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-500 font-black text-xl">¥899<span className="text-xs font-normal text-gray-400 ml-0.5">/年</span></div>
                    <div className="text-[10px] text-gray-300 line-through">原价 ¥1299</div>
                  </div>
                </div>
                <div className="mt-4 w-full py-2.5 bg-orange-500 text-white rounded-xl text-center text-sm font-bold shadow-md shadow-orange-100">立即支付开通</div>
              </div>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative px-4 bg-[#F9F9F9] text-gray-400 text-xs font-bold italic">OR</div>
              </div>

              {/* Option 2: Purchase */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative">
                <div className="absolute -top-2.5 left-4 px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-md shadow-sm">方式二</div>
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 text-base">当月采购达标</h4>
                  <p className="text-xs text-gray-400 mt-0.5">采购满 <span className="text-blue-500 font-bold">¥30,000</span> 自动升级</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-gray-400 font-medium">当前进度</span>
                    <span className="text-sm font-black text-gray-800">¥{currentPurchaseAmount.toLocaleString()}<span className="text-[10px] text-gray-300 font-normal ml-1">/ 30,000</span></span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out shadow-inner" 
                      style={{ width: `${Math.min((currentPurchaseAmount / 30000) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-[10px] text-blue-500 font-medium tracking-tight">还差 ¥{(30000 - currentPurchaseAmount).toLocaleString()} 即可免费获得会员</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowMembershipPopup(false)}
                className="w-full py-2 text-gray-400 text-xs font-medium hover:text-gray-600 transition-colors"
              >
                暂不处理，返回首页
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PaymentPage: React.FC<{ onBack: () => void, onSuccess: () => void }> = ({ onBack, onSuccess }) => {
  const [isPaying, setIsPaying] = useState(false);

  const handleConfirmPay = () => {
    setIsPaying(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="px-4 py-3 flex items-center border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex-1 text-center font-bold text-gray-800">支付中心</div>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-.08-.01-.16-.02-.24-.03-1.67-.22-3.15-1.26-3.15-3.15 0-1.89 1.48-2.93 3.15-3.15.08-.01.16-.02.24-.03V9.5c-.08.01-.16.02-.24.03-1.67.22-3.15 1.26-3.15 3.15H5.5c0-1.89 1.48-2.93 3.15-3.15.08-.01.16-.02.24-.03V7h2.82v1.91c.08.01.16.02.24.03 1.67.22 3.15 1.26 3.15 3.15 0 1.89-1.48 2.93-3.15 3.15-.08.01-.16.02-.24.03v2.23c.08-.01.16-.02.24-.03 1.67-.22 3.15-1.26 3.15-3.15h1.65c0 1.89-1.48 2.93-3.15 3.15-.08.01-.16.02-.24.03z"/>
          </svg>
        </div>
        <h2 className="text-gray-500 text-sm mb-2">会员开通费用</h2>
        <div className="text-4xl font-black text-gray-900 mb-8">
          <span className="text-2xl font-bold mr-1">¥</span>899.00
        </div>

        <div className="w-full space-y-4 mb-12">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-orange-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/></svg>
              </div>
              <span className="font-bold text-gray-800">微信支付</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 opacity-60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.82v-1.91c-.08-.01-.16-.02-.24-.03-1.67-.22-3.15-1.26-3.15-3.15 0-1.89 1.48-2.93 3.15-3.15.08-.01.16-.02.24-.03V9.5c-.08.01-.16.02-.24.03-1.67.22-3.15 1.26-3.15 3.15H5.5c0-1.89 1.48-2.93 3.15-3.15.08-.01.16-.02.24-.03V7h2.82v1.91c.08.01.16.02.24.03 1.67.22 3.15 1.26 3.15 3.15 0 1.89-1.48 2.93-3.15 3.15-.08.01-.16.02-.24.03v2.23c.08-.01.16-.02.24-.03 1.67-.22 3.15-1.26 3.15-3.15h1.65c0 1.89-1.48 2.93-3.15 3.15-.08.01-.16.02-.24.03z"/></svg>
              </div>
              <span className="font-bold text-gray-800">支付宝</span>
            </div>
            <div className="w-6 h-6 rounded-full border border-gray-300"></div>
          </div>
        </div>

        <button 
          onClick={handleConfirmPay}
          disabled={isPaying}
          className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold text-lg shadow-xl shadow-orange-100 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          {isPaying ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              正在支付...
            </>
          ) : '确认支付 ¥899.00'}
        </button>
      </div>
    </div>
  );
};

export default App;
