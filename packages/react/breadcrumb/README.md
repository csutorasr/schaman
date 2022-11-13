# @schaman/react-breadcrumb

Adds breadcrumb functionality to any React application. Use the provider and every child will be shown in the breadcrumb.

```tsx
<BreadcrumbContextProvider>
  <Breadcrumb>Test1</Breadcrumb>
  {/* Here you can add routes, also. */}
  <div>
    <Breadcrumb>Test2</Breadcrumb>
  </div>
  <BreadcrumbRenderer />
</BreadcrumbContextProvider>
```

To customize styles wrap the component:

```tsx
function FancyBreadcrumb({ children }) {
  return (
    <Breadcrumb>
      <FancyComponent>{children}</FancyComponent>
    </Breadcrumb>
  );
}
```

## Running unit tests

Run `nx test react-breadcrumb` to execute the unit tests via [Jest](https://jestjs.io).
