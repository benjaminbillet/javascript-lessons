// import of default export
import something from './import-export-modules/module1';
console.log(something);
// == Output ==
// A


// import of regular exports 
import { MODULE3_CONSTANT1, ANOTHER_CONSTANT } from './import-export-modules/module1';
console.log(MODULE3_CONSTANT1, ANOTHER_CONSTANT);
// == Output ==
// constant1 constant2
