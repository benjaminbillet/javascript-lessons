// promises are interfaces for asynchronous computation
// resolve: the function to call in case of success
// reject: the function to call in case of failure

// the asynchronous computation starts as soon as the promise is created
// so it is common to have functions that build promises
const makePromise = () => {
  return new Promise((resolve, reject) => {
    let timer = Math.random() * 2000 + 1000;
    setTimeout(() => {
      resolve(timer);
    }, timer);
  });
};

makePromise().then((val) => { // this is the resolve function
  console.log('promise1', `resolve called after ${val} ms`);
}).catch((e) => { // this is the reject function
  console.log('promise1', 'reject called', e)
});



// promises can be chained
makePromise().then((val) => {
  console.log('promise2', `myPromise resolve called after ${val} ms`);
  return makePromise();
}).then((val) => {
  console.log('promise2', `myPromise2 resolve called after ${val} ms`);
}).catch((e) => {
  console.log('promise2', 'reject called', e)
});



// some useful helpers
Promise.all([ makePromise(), makePromise() ])
  .then((values) => {
    console.log('promise3', `all promises resolved: ${values}`);
  }).catch((e) => {
    console.log('promise3', 'reject called', e)
  });


Promise.race([ makePromise(), makePromise() ])
  .then((values) => {
    console.log('promise4', `one promise resolved: ${values}`);
  }).catch((e) => {
    console.log('promise4', 'reject called', e)
  });
