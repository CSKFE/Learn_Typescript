{
  /**
   * * Type assertion
   * * 일단, 좋은 케이스는 아니다
   * * 하지만, 불가피하게 써야할 경우도 있다.
   */

  // TODO: JS
  function jsStrFunc():any {
    return 'hello';
  }
  const result = jsStrFunc();
  console.log(result.toUpperCase());
  console.log((result as string).length);

  /**
   * todo: 위의 jsStrFunc는 any 타입을 반환하는 함수다
   * * 함수는 string 타입을 반환했다.
   * * 이때 String.prototype 메서드들의 코드헬퍼가 나오지않는다.
   * * 타입스크립트는 any를 리턴하는 함수에서 string을 리턴했기때문에 타입을 추론하지못했다
   * ! 이때, 타입을 단정지어 주는것이 "as string" 이 부분 타입어설션이다.
   * * 타입어설션을 해주니 코드헬퍼가 나와 String.prototype의 메서드들을 보여준다.
   */

  function jsNumFunc():any {
    return 2;
  }
  const result2 = jsNumFunc();
  console.log((<string>result).length); // * undefined
  /**
   * * 위와같이 any타입을 반환하는 함수가 2를 반환했을때
   * * string으로 어설션하여 강제로 타입을 캐스팅해주었다.
   * * 그리고 length api를 이용하여 길이를 알아보려했지만 undefined가 나왔다.
   * * 따로 에러를 발생하진 않지만 값을 읽지못해 undefined가 나왔다.
   * * 예상하지 못한 결과가 나올 수 있다.
   * todos: 타입 앞에 <Type> 으로도 타입 어설션을 사용할 수 있다.
   */

  const errorCase:any = 5;
  console.log((errorCase as Array<number>).push(2));
  /**
   * ! 이런 케이스의 경우 에러가 발생한다
   * * any타입으로 캐스팅해주고 어설션을 이용해 number가 담긴 Array로 강제 타입캐스팅해주었다
   * * 그리고 Array.prototype의 메서드인 push를 사용했다.
   * * 이때는 JS와 같이 에러를 발생시켰다.
   */

  function findNums(): number[] | undefined {
    return undefined;
  }

  const res = findNums();
  res.push(1);

  /**
   * * 위의 예제에서는 findNums가 number형태의 배열이나 undefined를 리턴한다
   * * 함수는 undefined를 리턴했다.
   * * 이때 함수의 평가값이 담긴 res 변수의 타입또한 타입추론에 의해 number[] | undefined가 됐다.
   * * 하지만 이 변수가 무조건 배열이라 확신하여 push를 사용하고싶었지만 타입이 두개로 추론되므로 push를 사용하려하자 에러가발생한다.
   */

  res!.push(1);
  // * 이렇게 ! 를 참조연산자 앞에 붙히게되면 이 변수는 배열이라고 장담하게된다.
  // * TS컴파일러에게 ! 를 사용하게되면, 이는 falsy한 값이 아님을 단언해준다.
  // * JS의 ?. 옵셔널체이닝과 비슷하다

  const res2 = findNums()!;
  // * 이렇게 할당문 맨 마지막에 붙힐수도있다.

}