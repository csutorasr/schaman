import { Fragment } from 'react';
import { useBreadcrumbGetterContext } from './breadcrumb.context';

export function BreadcrumbRenderer(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) {
  const { breadcrumbs } = useBreadcrumbGetterContext();
  return (
    <Fragment>
      {Object.keys(breadcrumbs).map((key) => (
        <Fragment key={key}>{breadcrumbs[key]}</Fragment>
      ))}
    </Fragment>
  );
}

export default BreadcrumbRenderer;
