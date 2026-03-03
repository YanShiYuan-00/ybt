
export interface Drug {
  id: string;
  name: string;
  category: '甲类' | '乙类';
  insuranceCode: string;
  spec: string; // 规格
  conversionRatio: number; // 转换比
  manufacturer: string; // 药品企业
  listedPrice: number; // 挂网价
  lowestPrice: number; // 药师帮最低价/30天成交均价
  margin: number; // 参考毛利 (0-1)
  approvalNumber: string; // 批准文号
  hasListedPrice: boolean;
}

export type SortType = 'default' | 'price_desc' | 'margin_desc';

export interface LocationInfo {
  province: string;
  city: string;
}
