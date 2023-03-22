{
  function checkNotNull(arg: number | null): number {
    if(arg == null) {
      throw new Error('Arg is Null');
    }
    return arg;
  };
  /*
   * 위의 코드를 제네릭을 이용해서 입력 받은 타입이 null이 아니라면 입력받은 값의 타입을 리턴해 null 체크를 해보자
   */

  function checkNotNullForGeneric<T> (arg: T | null): T {
    if(arg == null) {
      throw new Error('Arg is Null');
    }
    return arg;
  };
  const res:number = checkNotNullForGeneric(123);
  const res2:string = checkNotNullForGeneric('str');

  // 제네릭을 사용하면 위와같이 어떤 타입이 들어오던 들어온 타입으로 정의할 수 있다.
}