// mixins are a way of adding behaviors to prototype (composition)
// there is two type of mixins:
// - object mixins are simple objects that must be composed with a prototype
// - functional mixins are functions that add things into a prototype received as parameter
// the two types of mixins are very similar (in the end they add things into a prototype), only the way to use them is different

function Class1() {
}

// object mixin
const NameMixin = {
  setName: function (name) {
    this.name = name;
  },
};
// as a developer using an object mixin, we are responsible for merging the mixin into the prototype we want to enrich
Object.assign(Class1.prototype, NameMixin); // equivalent to 'Class1.prototype = { ...Class1.prototype, ...NameMixin };'

var obj = new Class1();
obj.setName('my beautiful object');
console.log(obj.name);
// == Output ==
// my beautiful object




// functional mixin
const NameMixin2 = (target) => {
  return Object.assign(target, {
    setName2(name2) {
      this.name2 = name2;
    }
  });
};
// as a developer using a functional mixin, we simply apply the mixin function to the prototype we want to enrich
NameMixin2(Class1.prototype);
  
var obj2 = new Class1();
obj2.setName2('my beautiful object');
console.log(obj2.name2);
// == Output ==
// my beautiful object