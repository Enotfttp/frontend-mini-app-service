import { isModalRouteName, modalRouteConfig } from './modalRouteConfig';

export function stripModalSearchParams(search: string): string {
  const sp = new URLSearchParams(search);
  const modalName = sp.get('modal');
  sp.delete('modal');

  if (modalName && isModalRouteName(modalName)) {
    const { paramKeys } = modalRouteConfig[modalName];
    paramKeys?.forEach((key) => sp.delete(key));
  }

  return sp.toString();
}
