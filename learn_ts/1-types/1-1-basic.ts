{
  // JS의 Type
  // Primitive Type(원시타입) - 숫자, 문자열, boolean, BigInt, Symbol, null, undefined
  // Referrence Type(참조타입) - Object, Array 등등 참조값
  // TS에서는 타입을 정의하면 타입을 변경 할 수 없다.
  
  // number type
  const num:number = 1;

  // 숫자타입으로 지정하고 String타입을 사용하면 에러가 발생한다.
  const num2:number = '1';

  // string type
  const str:string = 'hello';

  // boolean type
  const bool:boolean = true;

  // undefined type
  // 일반적으로 undefined 타입을 지정하지않는다. 다른 값을 사용 할 수 없기때문이다.
  const undi:undefined = undefined;

  // 이렇게 Union을 사용한다.
  // 옵셔널 타입을 선언할때 사용한다.
  let age:number | undefined = undefined;
  age = 29;

  // null type
  // null도 undefined와 같은 맥락이다. 단독으로 사용되지 않는다.
  let nully:null | string = null;
  nully = 'str';

  // 숫자를 리턴하거나 undefined를 리턴한다
  // 숫자를 찾지못하면 undefined를 리턴하는 함수로 이해하면 된다.
  function find(): number | undefined {
    return undefined;
  }
  

  // unknown type
  // 어떤 타입이 들어올지 모르는 타입(가능하면 사용하지않는다)
  // TS를 사용한다면 웬만하면 타입을 지정하자!
  let notSure: unknown = 0;
  notSure = 'str';
  notSure = true;

  // any type
  // unknown과 비슷하다. 어떤 타입이든 다 담을 수 있는 타입이다.
  // 가능하면 사용하지말자
  let anything:any = 0;
  anything = 'str';

  // void type
  // 아무것도 없는
  // 함수가 아무것도 리턴하지 않을 때 사용한다
  // 생략도 가능하다
  // 변수에 void 타입을 사용하는 케이스도 거의 없다.(undefined만 할당이 가능하기 때문이다.)
  function print(): void {
    console.log('hello types');
  }

  // never type
  function throwError(message: string):never {
    // message => server에 로깅 후 에러 출력
    throw new Error(message)
    // while(true) {  }

    // 위와같이 에러를 던지던, while처럼 무한루프를 돌아 리턴하는 값이 없는 함수에 never type을 사용한다
    // 함수에서 '절대' 리턴되지 않는 경우 타입을 명시할때 사용한다.
  }

  // object type
  // 원시타입을 제외한 모든 참조타입을 할당 할 수 있다.
  // obj도 어떤 타입이던 할당이 가능하기에 사용하지않는것을 추천한다
  // obj도 어떤 타입이 올건지 명시하고 사용하는게 좋다.
  let obj:object;
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({name: 'choi'});
  acceptSomeObject({age: 28});
}