import * as React from 'react';

// the context api helps you to share a property for a tree of react components (e.g., the current language)

// first, we initialize a context with the default value for the shared property (here a simple string)
export const SomeContext = React.createContext('A default value');

// SomeContext will contain two components:
// - a Provider, that can be used to set the shared property
// - a Consumer, that can be used to read the shared property
