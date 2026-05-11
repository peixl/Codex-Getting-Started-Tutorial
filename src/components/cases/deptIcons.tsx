import type { ReactNode } from 'react';
import type { Department } from '@/data/cases';
import {
  FinanceIcon,
  OpsIcon,
  SupportIcon,
  HRIcon,
  LogisticsIcon,
  ProcurementIcon,
  MarketingIcon,
  LegalIcon,
  DataIcon,
  AdminIcon,
  ProductIcon,
} from '@/components/icons';

// Server-safe map: lives in a non-'use client' module so RSC can render the
// JSX elements directly. Importing this from a client component is fine.
export const deptIcons: Record<Department, ReactNode> = {
  finance: <FinanceIcon size={24} />,
  operations: <OpsIcon size={24} />,
  'customer-service': <SupportIcon size={24} />,
  hr: <HRIcon size={24} />,
  logistics: <LogisticsIcon size={24} />,
  procurement: <ProcurementIcon size={24} />,
  marketing: <MarketingIcon size={24} />,
  legal: <LegalIcon size={24} />,
  data: <DataIcon size={24} />,
  admin: <AdminIcon size={24} />,
  product: <ProductIcon size={24} />,
};
