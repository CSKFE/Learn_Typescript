{
  /**
   ** Type Inference
   */
  
  /** 
   * ! 타입을 정의하지 않아도, 알아서 타입추론을 해주기때문에
   * ! 초기값에 문자열을 할당하고 숫자로 변경하면 에러를 발생시킨다.
  */ 
  let str = 'hello';
  str = 1;


  /**
   * * 함수의 경우 매개변수의 타입을 따로 지정하지 않으면 any로 추론한다.
   * * 하지만 default Params를 통해 매개변수의 기본값을 지정해주면 기본값으로 지정된 타입으로 추론해준다.
   */
  function print(message = 'default Message') {
    console.log(message)
  }
  print('1');
  print(1);

  /**
   * @param x nunber
   * @param y number
   * @returns number로 자동으로 추론해준다
   */
  function add(x:number, y:number) {
    return x + y;
  }
  /** 
   * * add 함수의 리턴값이 number로 추론됐기때문에 평가값을 담은 res 변수도 number로 추론됐다.
   */
  const res = add(1,2);

  /**
   * * 타입추론은 간편하지만
   * * 위처럼 간단한 코드에서는 따로 타입을 작성하지 않아도 될정도다
   * * 하지만 프로젝트가 거대해지고 코드가 많아진다면 타입추론을 사용하는것은 비추천한다.
   * * 특히 함수의 경우 리턴값을 명시해주는게 좋다.
   */
}