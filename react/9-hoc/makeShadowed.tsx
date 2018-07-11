import * as React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';


// a simple HOC that adds a shadow
// see 'makeBordered.tsx' for a commented HOC

const makeShadowed = <T, P>(component: React.ComponentType<P & React.ClassAttributes<T>>) => {
  const Wrapped = component;

  const Wrapper = React.forwardRef<T, P>((props, ref) => (
    <div style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
      <Wrapped {...props} ref={ref}>
        {props.children}
      </Wrapped>
    </div>
  ));

  const name = Wrapped.displayName || Wrapped.name || 'Component'; // we take the name of the Wrapped component, if any
  Wrapper.displayName = `makeShadowed(${name})`;
  
  hoistNonReactStatic(Wrapper, Wrapped);

  return Wrapper;
};

export default makeShadowed;
