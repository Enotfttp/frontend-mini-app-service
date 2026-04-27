import { DetailInfoModalContent } from '@widgets/detail-info-modal';
import type { ComponentType } from 'react';

export interface ModalRouteEntry {
  component: ComponentType<{ params: Record<string, string> }>;
  title: string;
  customWidth?: string;
  /** Ключи query, которые принадлежат этой модалке (удаляются вместе с `modal` при закрытии). */
  paramKeys?: readonly string[];
}

export const modalRouteConfig = {
  'detail-info': {
    component: DetailInfoModalContent,
    title: 'Детали',
    customWidth: '440px',
    paramKeys: ['id', 'type'] as const,
  },
} as const satisfies Record<string, ModalRouteEntry>;

export type ModalRouteName = keyof typeof modalRouteConfig;

export function isModalRouteName(name: string): name is ModalRouteName {
  return name in modalRouteConfig;
}
