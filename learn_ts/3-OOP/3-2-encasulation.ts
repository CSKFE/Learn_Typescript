{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

  class CoffeeMaker {
    // static 키워드를 사용하지않으면, 만들어지는 인스턴스마다 값을 갖게된다
    // 이 값은 부모클래스에서만 사용하는 공통적인 값 이기때문에 static 키워드를 사용해서 관리해야한다.
    private static BEANS_PER_COFFEE:number = 7;
    private coffeeBeans:number = 0;

    // constructor에 private 키워드를 사용하면 constructor를 외부에서 호출할수없다.
    // 그러므로 해당 클래스로 인스턴스를 생성하려면 무조건적으로 static으로 작성된, 인스턴스를 리턴하는 메서드를 사용해야한다
    // ex: 예제에서는 makeMachine 메서드가 있다.
    private constructor(coffeBeans: number) {
      this.coffeeBeans = coffeBeans;
    }

    // constructor를 사용하지않고 호출하려면 클래스 자체를 리턴하는 메서드를 작성할수있다.
    // 해당 인스턴스는 클래스 내부의 어떤 속성값도 필요로하지않기에 static 키워드를 사용할수있다
    static makeMachine(coffeeBeans:number):CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans:number) {
      if(beans < 0) {
        throw new Error('0개 미만의 커피콩은 넣을 수 없습니다.')
      }
      this.coffeeBeans = beans;
    }

    makeCoffee(shots:number) {
      if(this.coffeeBeans < shots * CoffeeMaker.BEANS_PER_COFFEE) {
        throw new Error('커피콩 부족');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_PER_COFFEE;
      return {
        shots,
        hasMilk: false
      }
    }
  }
  
  //const maker = new CoffeeMaker(14); // => constructor에 private 키워드가 사용됐으므로 외부에서 접근 불가능한 생성자가 됐다.
  // coffeBeans 라는 내부의 상태를 외부에서 컨트롤할수있기에 위험하다.
  // 이때 접근자 프로퍼티를 사용할수있는데
  // public, private, protected 가 있다.
  // 따로 정의하지않으면 모두 public 이다.
  // maker.coffeeBeans = -100; => private로 정의하여 접근불가
  // console.log(CoffeMaker.BEANS_PER_COFFEE) => private으로 정의하여 외부에서 조회할수없다.

  // fillCoffeBeans로 외부에서 내부의 private한 필드의 상태를 제어할수있다.
  // 이렇게 함수로 정의하면 검증단계를 넣을 수 있다.
  const maker = CoffeeMaker.makeMachine(14);
  maker.fillCoffeeBeans(14);
}