// import of default export
import value from './module2';
console.log(value);
// == Output ==
// A

// import of regular exports 
import { MODULE2_CONSTANT, module2_function } from './module2';
console.log(MODULE2_CONSTANT, module2_function);
// == Output ==
// 10 [Function: module2_function]

// or both at the same time: import value, { MODULE2_CONSTANT } from './module2';


// import of all regular exports
import * as inModule3 from './module3';
console.log(inModule3);
// == Output ==
// { MODULE3_CONSTANT1: 'constant1', MODULE3_CONSTANT2: 'constant2' }


// re-export
// see https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export for full details
export { default } from './module2';
export { MODULE3_CONSTANT1, MODULE3_CONSTANT2 as ANOTHER_CONSTANT } from './module3';

console.log('----');
