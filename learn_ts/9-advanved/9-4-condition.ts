{
  // 타입에도 condition을 줄 수 있다.
  // 사람도 컨디션에 따라 오락가락할때가 있듯, 타입또한 제네릭으로 타입을 받아와서 그 타입에 따라 다른 타입 또는 값을 줄 수 있다.
  // 마치 삼항연산자와 같다
  // 제네릭으로 타입을 받아오고 해당 타입에따라서 타입을 결정해준다
  type Check<T> = T extends string? boolean : number;
  type Type = Check<string>; // boolean
  type Type2 = Check<number>; // number
  type Type3 = Check<[]>; // number

  type TypeName<T> = 
  T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';

  type Name = TypeName<string>; // 'string'
  type Name1 = TypeName<'a'>; // 'string'
  type Name2 = TypeName<number>; // 'number'
  type Name3 = TypeName<boolean>; // 'boolean'
  type Name4 = TypeName<undefined>; // 'undefined'
  type Name5 = TypeName<Function>; // 'function'
  type Name6 = TypeName<() => void>; // 'function'
  type Name7 = TypeName<[]>; // 'object'
}
