import type { CaseBundle, Department } from './types';
import { withDesktopQualityBar, type PromptQualityLang } from '../../lib/promptQuality';
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
import {
  financeExpenseClassifier,
  financeInvoiceTaxChecker,
  operationsDailyStandupBoard,
  operationsCustomerLifecycleTracker,
  customerServiceComplaintClassifier,
  customerServiceFAQBuilder,
  hrLeaveTracker,
  hrInterviewSchedule,
  logisticsWarehouseStock,
  logisticsReturnTracker,
  procurementPOTracker,
  procurementSupplierQualification,
  marketingContentCalendar,
  marketingKOLTracker,
  legalNDAVault,
  legalTrademarkMonitor,
  dataWeeklyTrendSnapshot,
  dataKPIDashboard,
  adminVisitorLog,
  adminAssetInventory,
  productPriorityBoard,
  productBetaTesterTracker,
  financeMonthlyBudgetTracker,
  marketingEventChecklist,
  hrBirthdayReminder,
  financePlatformFeeReconciliation,
  operationsPromotionPriceInspector,
  customerServiceCompensationDesk,
  logisticsCarrierSlaScorecard,
  procurementPackagingDemandPlanner,
  marketingLiveRoomRunOfShow,
  dataSkuProfitRadar,
  productListingQualityChecker,
} from './_more';

export type { CaseBundle, CaseCopy, Department } from './types';

// Ordered so the home-page teaser (first 8) shows distinct departments first,
// while the /cases page lists everything.
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
  financeExpenseClassifier,
  financeInvoiceTaxChecker,
  operationsDailyStandupBoard,
  operationsCustomerLifecycleTracker,
  customerServiceComplaintClassifier,
  customerServiceFAQBuilder,
  hrLeaveTracker,
  hrInterviewSchedule,
  logisticsWarehouseStock,
  logisticsReturnTracker,
  procurementPOTracker,
  procurementSupplierQualification,
  marketingContentCalendar,
  marketingKOLTracker,
  legalNDAVault,
  legalTrademarkMonitor,
  dataWeeklyTrendSnapshot,
  dataKPIDashboard,
  adminVisitorLog,
  adminAssetInventory,
  productPriorityBoard,
  productBetaTesterTracker,
  financeMonthlyBudgetTracker,
  marketingEventChecklist,
  hrBirthdayReminder,
  financePlatformFeeReconciliation,
  operationsPromotionPriceInspector,
  customerServiceCompensationDesk,
  logisticsCarrierSlaScorecard,
  procurementPackagingDemandPlanner,
  marketingLiveRoomRunOfShow,
  dataSkuProfitRadar,
  productListingQualityChecker,
];

export function getCaseBySlug(slug: string): CaseBundle | undefined {
  return caseBundles.find((c) => c.slug === slug);
}

export function getCasesByDepartment(department: Department): CaseBundle[] {
  return caseBundles.filter((c) => c.department === department);
}

export function getCasePrompt(bundle: CaseBundle, locale: PromptQualityLang): string {
  return withDesktopQualityBar(bundle.prompt[locale], locale);
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
