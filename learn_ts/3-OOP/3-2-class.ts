{
  type CoffeeCup = {
  shots: number;
    hasMilk: boolean;
  };

  class CoffeMaker {
    static BEANS_GRAMM_PER_SHOT:number = 7; 
    coffeeBeans:number = 0;

    constructor(coffeeBeans:number) {
      this.coffeeBeans = coffeeBeans;
    }

    // static 키워드로 인스턴스를 생성하지 않고 클래스의 메서드를 바로 호출하여 클래스를 생성
    static makeMachine(coffeeBeans:number):CoffeMaker {
      return new CoffeMaker(coffeeBeans)
    }
  
    makeCoffee(shots: number):CoffeeCup {
      if(this.coffeeBeans < shots * CoffeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error('커피 콩이 부족합니다.');
      }
      this.coffeeBeans -= shots * CoffeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false
      };
    }
  }

  const coffeMachine = new CoffeMaker(32);
  console.log(coffeMachine)
}