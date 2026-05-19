import type { DesktopCase } from '../types';

export const ecommerceProductPhotoWatermark: DesktopCase = {
  id: 'ecommerce-product-photo-watermark',
  category: 'ecommerce',
  title: { zh: '商品图批量加水印', en: 'Batch Watermark Product Photos' },
  description: {
    zh: '拖入商品图文件夹，自动给每张图加店铺水印，保存到新文件夹',
    en: 'Drag product photo folder, auto-watermark each image, save to new folder',
  },
  caseGoal: {
    zh: '给电商运营用的批量加水印工具，拖入文件夹就能处理完',
    en: 'Batch watermarking tool for e-commerce ops — drag folder and done',
  },
  caseFeatures: {
    zh: [
      '拖入商品图文件夹（支持 jpg/png）',
      '自动给每张图右下角加半透明水印',
      '保存到"已加水印"文件夹',
      '显示处理进度和完成数量',
    ],
    en: [
      'Drag product photo folder (jpg/png supported)',
      'Auto-add semi-transparent watermark to bottom-right',
      'Save to "Watermarked" folder',
      'Show progress and completion count',
    ],
  },
  caseInputOutput: {
    zh: '输入：商品图文件夹 → 输出：加了水印的图片文件夹',
    en: 'Input: product photo folder → Output: watermarked image folder',
  },
  caseAcceptance: {
    zh: '能拖入文件夹、看到进度条、打开输出文件夹看到水印图',
    en: 'Can drag folder, see progress bar, open output folder to verify watermarks',
  },
  caseRole: {
    zh: '电商运营，每天要处理几十张商品图',
    en: 'an e-commerce data analyst whose teammates across the business will use this tool — make it one-click and friendly',
  },
  caseMetric: {
    zh: '从手工 Photoshop 一张张加水印（30 分钟）压到拖入文件夹 10 秒搞定',
    en: 'from manual Photoshop per-image (30 min) to drag-folder-done in 10 sec',
  },
};

export const ecommerceSkuPriceUpdater: DesktopCase = {
  id: 'ecommerce-sku-price-updater',
  category: 'ecommerce',
  title: { zh: 'SKU 价格批量更新', en: 'Batch Update SKU Prices' },
  description: {
    zh: '导入 Excel 价格表，一键更新店铺后台的 SKU 价格',
    en: 'Import Excel price sheet, one-click update store SKU prices',
  },
  caseGoal: {
    zh: '给电商运营用的价格批量更新工具，导入 Excel 就能同步到店铺后台',
    en: 'Batch price update tool for e-commerce ops — import Excel and sync to store backend',
  },
  caseFeatures: {
    zh: [
      '导入 Excel 价格表（SKU 编码 + 新价格）',
      '连接店铺后台 API',
      '批量更新价格',
      '显示成功/失败数量',
    ],
    en: [
      'Import Excel price sheet (SKU code + new price)',
      'Connect to store backend API',
      'Batch update prices',
      'Show success/failure count',
    ],
  },
  caseInputOutput: {
    zh: '输入：Excel 价格表 → 输出：更新结果报告',
    en: 'Input: Excel price sheet → Output: update result report',
  },
  caseAcceptance: {
    zh: '能导入 Excel、看到更新进度、导出成功/失败清单',
    en: 'Can import Excel, see update progress, export success/failure list',
  },
  caseRole: {
    zh: '电商运营，每周要更新几百个 SKU 价格',
    en: 'merchandising/product teammates — the tool should feel natural in their hands, one-click with no setup',
  },
  caseMetric: {
    zh: '从手工后台一个个改（2 小时）压到导入 Excel 5 分钟搞定',
    en: 'from manual backend editing per-SKU (2 hours) to Excel-import-done in 5 min',
  },
};
