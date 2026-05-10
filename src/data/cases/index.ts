import type { CaseBundle, Department } from './types';
import { financeReconciliation } from './finance';
import { operationsCampaign } from './operations';
import { customerServiceReplyHelper } from './customer-service';
import { hrOnboardingTracker } from './hr';
import { logisticsTracker } from './logistics';
import { procurementPriceMonitor } from './procurement';
import { marketingCampaignAnalyzer } from './marketing';
import { legalContractTracker } from './legal';
import { dataDailyReport } from './data';
import { adminConferenceRoom } from './admin';
import { productFeedbackInbox } from './product';

export type { CaseBundle, CaseCopy, Department } from './types';

export const caseBundles: CaseBundle[] = [
  financeReconciliation,
  operationsCampaign,
  customerServiceReplyHelper,
  hrOnboardingTracker,
  logisticsTracker,
  procurementPriceMonitor,
  marketingCampaignAnalyzer,
  legalContractTracker,
  dataDailyReport,
  adminConferenceRoom,
  productFeedbackInbox,
];

export function getCaseBySlug(slug: string): CaseBundle | undefined {
  return caseBundles.find((c) => c.slug === slug);
}

export function getCasesByDepartment(department: Department): CaseBundle[] {
  return caseBundles.filter((c) => c.department === department);
}

export const departments: Department[] = [
  'finance',
  'operations',
  'customer-service',
  'hr',
  'logistics',
  'procurement',
  'marketing',
  'legal',
  'data',
  'admin',
  'product',
];

export const departmentOrder: Department[] = departments;
