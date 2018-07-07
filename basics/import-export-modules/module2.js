// modules can have two types of export
// - regular exports
// - default export (zero or one per module)


// example of regular exports

export const MODULE2_CONSTANT = 10;

export const module2_function = () => console.log('Hello world');

export class Module2_Class {

}


// example of default export

const MODULE2_DEFAULT_CONSTANT = 'A';
export default MODULE2_DEFAULT_CONSTANT;
