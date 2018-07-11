import * as React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

// A HOC (higher-order component) is a function that takes a component and returns a new component with added capabilities

// a simple HOC that adds a border color:
// note that instead of wrapping a ReactElement inside another, we create a brand new react component

// tip: when there is conflicts with generics and JSX, you can use <T extends {}> instead of <T> to avoid JSX conflicts
// here it's not necessary because we have two type parameters
const makeBordered = <T, P>(component: React.ComponentType<P & React.ClassAttributes<T>>, color: string) => {
  const Wrapped = component; // JSX requires non-HTML tags to be capitalized

  // the ref property will return instances of Wrapper instead of Wrapped; so we need to use React.forwardRef to forward the ref property
  // we also use {...this.props} to pass all props received by the Wrapper component to the Wrapped component
  // we also pass the children to the Wrapped component
  const Wrapper = React.forwardRef<T, P>((props, ref) => (
    <div style={{ borderWidth: 5, borderColor: color, borderStyle: 'solid' }}>
      <Wrapped {...props} ref={ref}>
        {props.children}
      </Wrapped>
    </div>
  ));

  // for easier debugging, we can set a nice name to the Wrapper component
  const name = Wrapped.displayName || Wrapped.name || 'Component'; // we take the name of the Wrapped component, if any
  Wrapper.displayName = `makeBordered(${name})`;
  
  // problem: the Wrapper component hides all static methods that could be provided by the Wrapped component
  // this problem can be solved using a library called 'hoist-non-react-statics'
  // it will simply map all static methods from Wrapped to Wrapper, except the static methods related to the component lifecycle
  hoistNonReactStatic(Wrapper, Wrapped);

  return Wrapper;
};

export default makeBordered;
