{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 상수에 값을 할당할땐, 타입추론에 의해 타입을 정의하지않아도 된다.
  const BEANS_GRAMM_PER_SHOT:number = 7; 

  let coffeeBeans:number = 0;
  const makeCoffee = (shots: number):CoffeeCup => {
    if(coffeeBeans < shots * BEANS_GRAMM_PER_SHOT) {
      throw new Error('커피 콩이 부족합니다.');
    }
    coffeeBeans -= shots * BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false
    };
  }
  coffeeBeans += BEANS_GRAMM_PER_SHOT * 3;
  const coffee = makeCoffee(2);
  console.log(coffee);
}