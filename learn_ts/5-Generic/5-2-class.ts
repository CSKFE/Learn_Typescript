{
  interface Either<L, R> {
    left: () => L;
    right: () => R;
  }
  class SimpleEither<L, R> implements Either<L, R> {
    constructor(private leftValue: L, private rightValue: R) {}

    left(): L {
      return this.leftValue;
    }
    
    right(): R {
      return this.rightValue;
    }
  }

  const either = new SimpleEither(1, 2);
  const left = either.left();
  const right = either.right();
  console.log(left, right);
  // 함수에서는 물론, 클래스, 인터페이스에서도 제네릭을 이용해 사용자가 직접 타입을 넣어 사용할 수 있다.
}