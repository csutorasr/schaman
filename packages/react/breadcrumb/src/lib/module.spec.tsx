import { render } from '@testing-library/react';

import Breadcrumb from './breadcrumb';
import BreadcrumbRenderer from './breadcrumb-renderer';
import { BreadcrumbContextProvider } from './breadcrumb.context';

describe('BreadcrumbModule', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <BreadcrumbContextProvider>
        <Breadcrumb>Test</Breadcrumb>
        <BreadcrumbRenderer></BreadcrumbRenderer>
      </BreadcrumbContextProvider>
    );
    expect(baseElement.textContent).toBe('Test');
  });

  it('should not render without renderer', async () => {
    const { baseElement } = render(
      <BreadcrumbContextProvider>
        <Breadcrumb>Test</Breadcrumb>
      </BreadcrumbContextProvider>
    );
    expect(baseElement.textContent).not.toBe('Test');
  });

  it('should not render without breadcrumb', async () => {
    const { baseElement } = render(
      <BreadcrumbContextProvider>
        <BreadcrumbRenderer></BreadcrumbRenderer>
      </BreadcrumbContextProvider>
    );
    expect(baseElement.textContent).not.toBe('Test');
  });

  it('should render more breadcrumb', async () => {
    const { baseElement } = render(
      <BreadcrumbContextProvider>
        <Breadcrumb>Test</Breadcrumb>
        <div>
          <Breadcrumb>Test</Breadcrumb>
        </div>
        <BreadcrumbRenderer></BreadcrumbRenderer>
      </BreadcrumbContextProvider>
    );
    expect(baseElement.textContent).toBe('TestTest');
  });

  it('should render more breadcrumb in order', async () => {
    const { baseElement } = render(
      <BreadcrumbContextProvider>
        <Breadcrumb>Test1</Breadcrumb>
        <div>
          <Breadcrumb>Test2</Breadcrumb>
        </div>
        <BreadcrumbRenderer></BreadcrumbRenderer>
      </BreadcrumbContextProvider>
    );
    expect(baseElement.textContent).toBe('Test1Test2');
  });
});
