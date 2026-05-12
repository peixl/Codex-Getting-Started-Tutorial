import type { Department } from './types';
import type { PromptQualityLang } from '@/lib/promptQuality';

const SAMPLE_FIELDS: Record<Department, Record<PromptQualityLang, string[]>> = {
  finance: {
    zh: ['订单号', '金额', '交易时间', '摘要/备注', '状态'],
    en: ['Order ID', 'Amount', 'Transaction time', 'Memo / notes', 'Status'],
  },
  operations: {
    zh: ['任务名称', '负责人', '截止时间', '状态', '备注'],
    en: ['Task name', 'Owner', 'Due date', 'Status', 'Notes'],
  },
  'customer-service': {
    zh: ['分类', '标题', '正文', '关键词', '变量'],
    en: ['Category', 'Title', 'Body', 'Keywords', 'Variables'],
  },
  hr: {
    zh: ['员工姓名', '入职日期', '负责人', '事项', '状态'],
    en: ['Employee name', 'Start date', 'Owner', 'Checklist item', 'Status'],
  },
  logistics: {
    zh: ['订单号', '承运商', '运单号', '当前状态', '最近更新时间'],
    en: ['Order ID', 'Carrier', 'Tracking ID', 'Current status', 'Last update'],
  },
  procurement: {
    zh: ['供应商', 'SKU/物料', '报价', '生效日期', '交期'],
    en: ['Supplier', 'SKU / item', 'Quote', 'Effective date', 'Lead time'],
  },
  marketing: {
    zh: ['渠道', '花费', '订单数', '销售额', '日期'],
    en: ['Channel', 'Spend', 'Orders', 'Revenue', 'Date'],
  },
  legal: {
    zh: ['合同编号', '对方公司', '负责人', '生效日期', '到期日期'],
    en: ['Contract ID', 'Counterparty', 'Owner', 'Start date', 'Expiry date'],
  },
  data: {
    zh: ['指标名', '数值', '日期', '环比', '来源'],
    en: ['Metric', 'Value', 'Date', 'Delta', 'Source'],
  },
  admin: {
    zh: ['事项', '申请人', '日期/时间', '地点', '状态'],
    en: ['Item', 'Requester', 'Date / time', 'Location', 'Status'],
  },
  product: {
    zh: ['反馈来源', '用户', '内容', '标签', '优先级'],
    en: ['Source', 'User', 'Feedback', 'Tag', 'Priority'],
  },
};

export function getCaseSampleFields(department: Department, lang: PromptQualityLang) {
  return SAMPLE_FIELDS[department][lang];
}
