export type Department =
  | 'finance'
  | 'operations'
  | 'customer-service'
  | 'hr'
  | 'logistics'
  | 'procurement'
  | 'marketing'
  | 'legal'
  | 'data'
  | 'admin'
  | 'product';

export type CaseCopy = {
  title: string;
  departmentLabel: string;
  summary: string;
  painTitle: string;
  painBody: string;
  solutionTitle: string;
  solutionBody: string;
  expectedTitle: string;
  expectedBullets: string[];
  keywords: string[];
};

export type CaseBundle = {
  slug: string;
  department: Department;
  icon?: string;
  i18n: {
    zh: CaseCopy;
    en: CaseCopy;
  };
  prompt: {
    zh: string;
    en: string;
  };
};

export type LocalizedText = {
  zh: string;
  en: string;
};

export type DesktopCase = {
  id: string;
  category: string;
  title: LocalizedText;
  description: LocalizedText;
  caseGoal: LocalizedText;
  caseFeatures: {
    zh: string[];
    en: string[];
  };
  caseInputOutput: LocalizedText;
  caseAcceptance: LocalizedText;
  caseRole: LocalizedText;
  caseMetric: LocalizedText;
};
