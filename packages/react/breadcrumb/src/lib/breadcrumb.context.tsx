import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface BreadcrumbGetterContextData {
  breadcrumbs: Record<string, ReactNode>;
}

interface BreadcrumbSetterContextData {
  setChildren: (id: string, children: ReactNode) => void;
  removeChildren: (id: string) => void;
}

const BreadcrumbGetterContext = createContext<BreadcrumbGetterContextData>({
  breadcrumbs: {},
});
const BreadcrumbSetterContext = createContext<BreadcrumbSetterContextData>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setChildren: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeChildren: () => {},
});

export function useBreadcrumbGetterContext() {
  return useContext(BreadcrumbGetterContext);
}

export function useBreadcrumbSetterContext() {
  return useContext(BreadcrumbSetterContext);
}

export function BreadcrumbContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [breadcrumbs, setBreadcrumbs] = useState<Record<string, ReactNode>>({});
  const setChildren = useCallback(
    (id: string, children: ReactNode) =>
      setBreadcrumbs((current) => ({ ...current, [id]: children })),
    []
  );
  const removeChildren = useCallback(
    (id: string) =>
      setBreadcrumbs((current) => {
        const n = { ...current };
        delete n[id];
        return n;
      }),
    []
  );
  const setterValue = useMemo(
    () => ({
      setChildren,
      removeChildren,
    }),
    [removeChildren, setChildren]
  );
  const getterValue = useMemo(
    () => ({
      breadcrumbs,
    }),
    [breadcrumbs]
  );
  return (
    <BreadcrumbGetterContext.Provider value={getterValue}>
      <BreadcrumbSetterContext.Provider value={setterValue}>
        {children}
      </BreadcrumbSetterContext.Provider>
    </BreadcrumbGetterContext.Provider>
  );
}
