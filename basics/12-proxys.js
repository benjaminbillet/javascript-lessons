// a Proxy object is used to customize behavior for fundamental operations: property lookup, assignment, function invocation, ...

const wrap = obj => {
  return new Proxy(obj, {
    get(target, propKey) {
        console.log(`Reading property "${propKey}"`)
        return target[propKey]
    }
  })
}

const object = { message: 'Hello' };
const proxified = new Proxy(object, {
  get(target, propKey) {
      console.log('Reading property', propKey);
      return target[propKey];
  },
});
console.log(proxified.message);
// == Output ==
// Reading property message
// Hello


// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy for all 'hooks'