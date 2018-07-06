// Javascript has two comparison operators:
// weak comparison (==): try to do dynamic conversions (the string '10' will be considered equal to the number 10)
// strict comparison (===): no dynamic conversions (the string '10' will not be considered equal to the number 10)
console.log('1' == 1);
console.log('1' == true);
console.log('abc' == false);
console.log('1' === 1);
console.log('1' === '1');
// == Output ==
// true
// true
// false
// false
// true


console.log('----');


// '', '0' and 0 are considered as false in the weak comparison
console.log(0 == false);
console.log('' == false);
console.log('0' == false);
console.log(0 === false);
console.log('' === false);
console.log('0' === false);
// == Output ==
// true
// true
// true
// false
// false
// false

// see 'weak-equality.png' for all weak comparison conversions


console.log('----');


// == and === are optionals, in this case a set of rules called 'ToBoolean conversion' are applied
// ...and it is not exactly a weak comparison!
console.log(0 ? true : false);
console.log('' ? true : false);
console.log('0' ? true : false); // /!\
// == Output ==
// false
// false
// true

// see 'to-boolean.png' for ToBoolean conversion rules


console.log('----');


// remark: the result of a conditional expression is the last interpreted term
console.log('x' !== 'x' || 'x' === 'x');
console.log('x' !== 'x' && 'x' === 'x');
console.log(false || false || 'x' || true);
console.log(0 || 0 || 'x' || true);
console.log(true && true && 'x' && 'y');
console.log((true && 'x') && (false || 'y'));
// == Output ==
// true
// false
// x
// x
// y
// y
