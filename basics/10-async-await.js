// promises are pretty verbose, especially when chained
// => async-await are intended to simplify the use of promises by simulating a synchronous flow

// async functions returns promises
const asynchronousFunction = async () => {
  return new Promise((resolve, reject) => {
    let timer = Math.random() * 1000 + 1000;
    setTimeout(() => {
      resolve(timer);
    }, timer);
  });
};

// other async function can consume those promises using await:
// return a value = the call to resolve
// throwing an exception = the call to reject
const asynchronousFunction2 = async () => {
  try {
    const value1 = await asynchronousFunction(); // the code after this function will run like a new promise
    const value2 = await asynchronousFunction(); // the code after this function will run like a new promise, after the previous one
    return value1 + value2;
  } catch (error) { // equivalent to '.catch(error => ...)'
    // ...
  }
}

// is equivalent to
/*const asynchronousFunction3 = () => {
  return new Promise((resolve, reject) => {
    asynchronousFunction().then((value1) => {
      asynchronousFunction().then((value2) => {
        resolve(value1 + value2);
      }).catch((e) => reject(e));
    }).catch((e) => reject(e));
  });
}*/

// async functions always returns a promise (meaning that, at some point, you have to use it as a promise)
console.log(asynchronousFunction2() instanceof Promise); // will be true
asynchronousFunction2().then(result => console.log(result));

// you can easily mix promises and async functions
const someFunction = async () => {
  const value1 = await new Promise((resolve, reject) => {
    let timer = Math.random() * 1000 + 1000;
    setTimeout(() => {
      resolve(timer);
    }, timer);
  });
  const value2 = await asynchronousFunction();
  return value1 + value2;
}
someFunction().then(result => console.log(result));
