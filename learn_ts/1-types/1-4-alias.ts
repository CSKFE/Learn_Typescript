{
  // type alias
  type Text = string;
  type Number = number;
  type Student = {
    name: string;
    age: number;
  };
  const name: Text = 'choi';
  const addr: Text = 'Kr';
  const student: Student = {
    name: 'choi',
    age: 29
  };

  // String Literal Types

  type Name = 'choi';
  let choiName: Name;
  // Name 타입은 name이 정의됐기때문에 다른 문자열을 할당 할 수 없다.
  choiName = 'Lee'; 

  type JSON = 'json';
  const json: JSON = 'json';

  type Bool = true;
  const isCat: Bool = !false;
}