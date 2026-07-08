import type { CaseBundle, Department } from './types';
import { withPromptQualityBar, type PromptQualityLang } from '../../lib/promptQuality';
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
  financeExpensePortalWeb,
  customerServiceSelfServePortalWeb,
  dataKpiPortalWeb,
  productFeedbackPortalWeb,
} from './web';
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

export type { AppPlatform, CaseBundle, CaseCopy, Department } from './types';

// Ordered so website and desktop examples are visible early instead of burying
// website cases at the bottom of the /cases page.
export const caseBundles: CaseBundle[] = [
  financeReconciliation,
  financeExpensePortalWeb,
  operationsCampaign,
  customerServiceSelfServePortalWeb,
  customerServiceReplyHelper,
  hrOnboardingTracker,
  dataKpiPortalWeb,
  logisticsTracker,
  procurementPriceMonitor,
  productFeedbackPortalWeb,
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
  const target = bundle.platforms?.includes('web') ? 'web' : 'desktop';
  return withPromptQualityBar(bundle.prompt[locale], locale, target);
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
