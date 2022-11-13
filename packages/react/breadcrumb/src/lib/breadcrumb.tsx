import { useEffect, ReactNode, useId } from 'react';
import { useBreadcrumbSetterContext } from './breadcrumb.context';

export function Breadcrumb({ children }: { children?: ReactNode }) {
  const { setChildren, removeChildren } = useBreadcrumbSetterContext();
  const id = useId();
  useEffect(() => {
    setChildren(id, children);
    return () => removeChildren(id);
  }, [children, id, removeChildren, setChildren]);
  return null;
}

export default Breadcrumb;
