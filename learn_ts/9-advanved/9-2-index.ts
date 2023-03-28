{
  const obj = {
    name: 'choi',
  };

  // object property에 접근하는 방법
  obj.name;
  obj['name'];

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'femail';
  };

  type Name = Animal['name']; // Type Name의 type은 string이다

  const str:Name = 'str';
  const str2:Name = 1; // error

  type Gender = Animal['gender'];
  type Keys = keyof Animal; // name | age | gender  keyof를 사용하면 복사한 타입의 key들이 문자열 유니온형태로 들어간다.

  const key1: Keys = 'name';
  const key2: Keys = 'age';
  const key3: Keys = 'gender';

  type Person = {
    name: string;
    gender: Animal['gender']
  };

  const person: Person = { name: 'choi', gender: 'male'};
  // person.gender => 'male' | 'female'

  // 인덱스 타입을 사용하면 다른 타입의 키에 접근해서 키의 value의 타입을 가져올 수 있다.
  // keyof는 타입의 키들을 스트링 타입의 유니온으로 가져온다.
}