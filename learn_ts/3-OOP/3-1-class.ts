{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

  class CoffeeMaker {
    // static 키워드를 사용하지않으면, 만들어지는 인스턴스마다 값을 갖게된다
    // 이 값은 부모클래스에서만 사용하는 공통적인 값 이기때문에 static 키워드를 사용해서 관리해야한다.
    static BEANS_PER_COFFEE:number = 7;
    coffeeBeans:number = 0;

    constructor(coffeBeans: number) {
      this.coffeeBeans = coffeBeans;
    }

    // constructor를 사용하지않고 호출하려면 클래스 자체를 리턴하는 메서드를 작성할수있다.
    // 해당 인스턴스는 클래스 내부의 어떤 속성값도 필요로하지않기에 static 키워드를 사용할수있다
    static makeMachine(coffeeBeans:number):CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
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
  
  const maker = new CoffeeMaker(14);
  const maker2 = new CoffeeMaker(28);
  // static 메서드로 바로 인스턴스를 생성할수도있다.
  // 이때 생성자(constructor)로 생성하는게 아니기 때문에 new 연산자를 사용할 필요가없다.
  // static 키워드가 붙었기때문에 클래스레벨에서 자체적으로 사용하는 메서드를 이용해 생성하는것이다.
  const maker3 = CoffeeMaker.makeMachine(35);
  console.log(maker);
  console.log(maker2);
  console.log(maker3);
}