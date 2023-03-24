type Student = {
  passed: boolean;
}
const students:Student[] = [ {passed: true},  {passed: true}, {passed: false},];
const res = students.every(e => e.passed);
// console.log(res);

class Animal {};
class Cat extends Animal {
  isCat:boolean = true;
};
class Dog extends Animal {
  isDog:boolean = true;
};

const animals = [ new Cat(), new Cat(), new Dog() ];

const isCatFunction = (e: Animal):e is Cat => {
  return (e as Cat).isCat !== undefined
}
const isCats = animals.every<Cat>(isCatFunction);

console.log(isCats)