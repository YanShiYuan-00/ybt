
import React, { useState, useMemo } from 'react';
import { Drug, SortType, LocationInfo } from '../types';
import { MOCK_DRUGS } from '../mockData';

interface MedicalInsuranceSearchProps {
  onBack: () => void;
  onBuy: (drug: Drug) => void;
  membershipExpiry?: string | null;
  isMember: boolean;
  onShowMembershipPopup: () => void;
}

const MedicalInsuranceSearch: React.FC<MedicalInsuranceSearchProps> = ({ 
  onBack, 
  onBuy, 
  membershipExpiry,
  isMember,
  onShowMembershipPopup
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClickCount, setSearchClickCount] = useState(0);
  const [location] = useState<LocationInfo>({ province: '四川', city: '成都' });
  const [sort, setSort] = useState<SortType>('default');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['甲类', '乙类']);
  const [listedPriceFilter, setListedPriceFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('全部');
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchMatchedDrugs = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return MOCK_DRUGS.filter(d => 
      d.name.toLowerCase().includes(term) || 
      d.insuranceCode.toLowerCase().includes(term) ||
      d.approvalNumber.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const dynamicManufacturers = useMemo(() => {
    const manufacturers = new Set<string>();
    const baseSet = searchTerm ? searchMatchedDrugs : MOCK_DRUGS;
    baseSet.forEach(d => manufacturers.add(d.manufacturer));
    return ['全部', ...Array.from(manufacturers)];
  }, [searchMatchedDrugs, searchTerm]);

  const filteredDrugs = useMemo(() => {
    let result = searchTerm ? [...searchMatchedDrugs] : [...MOCK_DRUGS].filter(d => d.hasListedPrice);

    if (selectedManufacturer !== '全部') {
      result = result.filter(d => d.manufacturer === selectedManufacturer);
    }

    if (listedPriceFilter === 'yes') {
      result = result.filter(d => d.hasListedPrice);
    } else if (listedPriceFilter === 'no') {
      result = result.filter(d => !d.hasListedPrice);
    }

    result = result.filter(d => selectedCategories.includes(d.category));

    if (sort === 'price_desc') {
      result.sort((a, b) => b.listedPrice - a.listedPrice);
    } else if (sort === 'margin_desc' || (searchTerm && sort === 'default')) {
      result.sort((a, b) => b.margin - a.margin);
    }

    return result;
  }, [searchTerm, searchMatchedDrugs, selectedManufacturer, listedPriceFilter, selectedCategories, sort]);

  const handleLoadMore = () => {
    if (searchTerm && visibleCount < filteredDrugs.length) {
      setIsLoading(true);
      setTimeout(() => {
        setVisibleCount(prev => prev + 10);
        setIsLoading(false);
      }, 600);
    }
  };

  const displayedDrugs = filteredDrugs.slice(0, searchTerm ? visibleCount : 10);

  const suggestions = useMemo(() => {
    if (!searchTerm || searchTerm.length < 1) return [];
    const term = searchTerm.toLowerCase();
    return MOCK_DRUGS.filter(d => d.name.toLowerCase().includes(term)).slice(0, 8);
  }, [searchTerm]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <span key={i} className="text-orange-500 font-bold">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  const handleManufacturerClick = (manufacturer: string) => {
    setSelectedManufacturer(manufacturer);
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScanClick = () => {
    // In a real app, this would trigger the camera/scanner
    alert('正在打开扫码器...');
  };

  return (
    <div className="flex flex-col h-screen bg-[#f7f8fa]">
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="p-1">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex-1 text-center font-bold text-orange-600 text-lg">
          医保通
        </div>
        <div className="w-8"></div>
      </div>

      {membershipExpiry && (
        <div className="bg-orange-50 px-4 py-2 flex items-center justify-between border-b border-orange-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-[11px] text-orange-700 font-medium">会员有效期至：{membershipExpiry}</span>
          </div>
          <span className="text-[10px] text-orange-400">尊享权益中</span>
        </div>
      )}

      <div className="bg-white px-4 pt-4 pb-4 flex items-center gap-3">
        {/* Adjusted Scan Entrance: removed text, icon only, centered within height-consistent button */}
        <button 
          onClick={handleScanClick}
          className="h-10 w-10 flex items-center justify-center text-gray-500 active:text-orange-500 transition-colors shrink-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10" />
          </svg>
        </button>

        <div className="flex-1 h-10 relative group">
          <input 
            type="text" 
            placeholder="通用名/医保编码/批准文号" 
            className="w-full h-full bg-gray-100 rounded-full pl-10 pr-4 text-base text-black focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium cursor-pointer"
            value={searchTerm}
            readOnly={!isMember && searchClickCount >= 2}
            onFocus={() => setShowSuggestions(true)}
            onClick={() => {
              if (!isMember) {
                const nextCount = searchClickCount + 1;
                setSearchClickCount(nextCount);
                if (nextCount >= 2) {
                  onShowMembershipPopup();
                }
              }
              setShowSuggestions(true);
            }}
            onChange={(e) => {
              if (isMember || searchClickCount < 2) {
                setSearchTerm(e.target.value);
                setVisibleCount(10);
                setSelectedManufacturer('全部');
                setShowSuggestions(true);
              }
            }}
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowSuggestions(false)} />
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {suggestions.map((drug) => (
                  <div 
                    key={drug.id}
                    className="px-4 py-3 hover:bg-orange-50 active:bg-orange-100 cursor-pointer border-b border-gray-50 last:border-0 flex items-center justify-between"
                    onClick={() => {
                      setSearchTerm(drug.name);
                      setShowSuggestions(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-800">
                        {highlightText(drug.name, searchTerm)}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {drug.manufacturer}
                      </div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 只有在搜索时展示筛选工具栏 */}
      {searchTerm && (
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 text-xs font-medium text-gray-600 overflow-x-auto no-scrollbar">
          <Dropdown 
            label="排序" 
            value={sort === 'default' ? '默认' : sort === 'price_desc' ? '价格降序' : '毛利降序'}
            options={[
              { label: '默认', value: 'default' },
              { label: '价格降序', value: 'price_desc' },
              { label: '毛利降序', value: 'margin_desc' }
            ]}
            onChange={(v) => setSort(v as SortType)}
          />
          <Dropdown 
            label="厂家" 
            value={selectedManufacturer.length > 5 ? selectedManufacturer.substring(0, 4) + '...' : selectedManufacturer}
            options={dynamicManufacturers.map(m => ({ label: m, value: m }))}
            onChange={(v) => setSelectedManufacturer(v as string)}
          />
          <Dropdown 
            label="最低零售价" 
            value={listedPriceFilter === 'all' ? '全部' : listedPriceFilter === 'yes' ? '有' : '无'}
            options={[
              { label: '全部', value: 'all' },
              { label: '有', value: 'yes' },
              { label: '无', value: 'no' }
            ]}
            onChange={(v) => setListedPriceFilter(v as any)}
          />
          <Dropdown 
            label="医保类型" 
            value={selectedCategories.length === 2 ? '全部' : selectedCategories.join(',')}
            options={[
              { label: '甲类', value: '甲类' },
              { label: '乙类', value: '乙类' }
            ]}
            multi
            selectedValues={selectedCategories}
            onChange={(v) => Array.isArray(v) && setSelectedCategories(v)}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-2 py-3">
        {displayedDrugs.length > 0 ? (
          <div className="space-y-3">
            {displayedDrugs.map(drug => (
              <DrugCard 
                key={drug.id} 
                drug={drug} 
                onBuy={() => onBuy(drug)} 
                onManufacturerClick={handleManufacturerClick}
              />
            ))}
            
            {searchTerm && visibleCount < filteredDrugs.length && (
              <div className="py-4 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  className="text-orange-500 text-sm font-medium border border-orange-200 px-6 py-2 rounded-full active:bg-orange-50"
                  disabled={isLoading}
                >
                  {isLoading ? '加载中...' : '加载更多'}
                </button>
              </div>
            )}
            
            {!searchTerm && (
              <div className="text-center py-6 text-xs text-gray-400">
                默认展示10条有最低零售价的药品
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm">未搜索到相关药品</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DrugCard: React.FC<{ 
  drug: Drug, 
  onBuy: () => void, 
  onManufacturerClick: (m: string) => void 
}> = ({ drug, onBuy, onManufacturerClick }) => {
  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm active:bg-gray-50 transition-colors border border-gray-100"
      onClick={onBuy}
    >
      <div className="flex justify-between items-start mb-3 border-b border-gray-50 pb-2">
        <h3 className="text-base font-bold text-gray-800 flex items-center">
          {drug.name}
          <span className="ml-2 px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] rounded font-medium">
            {drug.category}
          </span>
        </h3>
      </div>

      <div className="space-y-1.5 text-[13px] text-gray-500 mb-4">
        <div className="flex">
          <span className="w-20 flex-shrink-0">医保编码：</span>
          <span className="text-gray-400 font-mono truncate">{drug.insuranceCode}</span>
        </div>
        <div className="flex">
          <span className="w-20 flex-shrink-0">规格：</span>
          <span className="text-gray-700">{drug.spec}</span>
        </div>
        <div className="flex">
          <span className="w-20 flex-shrink-0">转换比：</span>
          <span className="text-gray-700 font-medium">{drug.conversionRatio}</span>
        </div>
        <div className="flex">
          <span className="w-20 flex-shrink-0">药品企业：</span>
          <span 
            className="text-blue-500 font-medium truncate active:opacity-60 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onManufacturerClick(drug.manufacturer);
            }}
          >
            {drug.manufacturer}
          </span>
        </div>
        <div className="flex">
          <span className="w-20 flex-shrink-0">批准文号：</span>
          <span className="text-gray-400">{drug.approvalNumber}</span>
        </div>
        <div className="flex items-center">
          <span className="w-20 flex-shrink-0">最低零售价：</span>
          <span className="text-red-500 font-bold text-base leading-none">
            {drug.hasListedPrice ? drug.listedPrice.toFixed(2) : '--'}
          </span>
          <span className="ml-2 text-[10px] text-gray-300 font-normal">2025-12-11</span>
        </div>
        <div className="flex items-center">
          <span className="w-20 flex-shrink-0 text-xs">药师帮最低价：</span>
          <span className="text-gray-700 font-medium">{drug.lowestPrice.toFixed(2)}</span>
          <span className="ml-2 text-[10px] text-gray-400 font-normal opacity-70">(单盒最低)</span>
        </div>
      </div>

      <div className="pt-2 flex justify-between items-center">
        <div className="text-orange-500 font-bold flex items-center">
          参考毛利率：
          <span className="text-xl ml-1">{(drug.margin * 100).toFixed(0)}%</span>
        </div>
        <div className="bg-orange-500 text-white text-xs px-5 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95">
          点击购买
        </div>
      </div>
    </div>
  );
};

const Dropdown: React.FC<{ 
  label: string, 
  value: string, 
  options: { label: string, value: string }[], 
  onChange: (v: string | string[]) => void,
  multi?: boolean,
  selectedValues?: string[]
}> = ({ label, value, options, onChange, multi, selectedValues }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        className="flex items-center gap-1 cursor-pointer whitespace-nowrap text-gray-700 hover:text-orange-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label} <span className="text-[10px] text-gray-400 font-normal ml-0.5">{value} ▼</span>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 left-0 bg-white shadow-2xl rounded-xl py-2 min-w-[140px] max-h-60 overflow-y-auto z-40 border border-gray-100 animate-in fade-in zoom-in duration-150">
            {options.map(opt => {
              const isSelected = multi ? selectedValues?.includes(opt.value) : value === opt.label;
              return (
                <div 
                  key={opt.value}
                  className={`px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center justify-between text-sm ${isSelected ? 'text-orange-500 font-bold bg-orange-50' : 'text-gray-600'}`}
                  onClick={() => {
                    if (multi) {
                      const newVals = selectedValues?.includes(opt.value)
                        ? selectedValues.filter(v => v !== opt.value)
                        : [...(selectedValues || []), opt.value];
                      onChange(newVals);
                    } else {
                      onChange(opt.value);
                      setIsOpen(false);
                    }
                  }}
                >
                  {opt.label}
                  {isSelected && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MedicalInsuranceSearch;
