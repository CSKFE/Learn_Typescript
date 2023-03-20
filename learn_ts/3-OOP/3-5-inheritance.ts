{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }
  interface CoffeMaker {
    makeCoffee(shots:number): CoffeeCup
  }

  class CoffeeMachine implements CoffeMaker {
    private static BEANS_PER_COFFEE:number = 7;
    private coffeeBeans:number = 7;
    
    // 상속을 하려면 constructor가 private면 안된다.
    // public혹은 상속받은 자식에서 접근할 수 있는 protected여야한다.
    constructor(coffeBeans: number) {
      this.coffeeBeans = coffeBeans;
    }

    static makeMachine(coffeeBeans:number):CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans:number) {
      if(beans < 0) {
        throw new Error('0개 미만의 커피콩은 넣을 수 없습니다.')
      }
      this.coffeeBeans = beans;
    }

    private grindBeans(shots:number):void {
      if(this.coffeeBeans < shots * CoffeeMachine.BEANS_PER_COFFEE) {
        throw new Error('커피 콩이 부족합니다.');
      }
      console.log(`${shots}샷 만큼의 커피 콩을 갈고있습니다.`);
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_PER_COFFEE;
    };

    private preHeat():void {
      console.log('머신 온도를 올리고 있습니다.');
    };

    private extract(shots:number):CoffeeCup {
      console.log(`${shots}샷 만큼의 커피를 내리고 있습니다.`);
      return {
        shots,
        hasMilk: false
      }
    }

    clean():void {
      console.log('커피 머신을 청소합니다.')
    }
    
    makeCoffee(shots:number):CoffeeCup {
      this.grindBeans(shots);
      this.preHeat();
      return this.extract(shots);
    }
  }

  class CaffeLatteMachine extends CoffeeMachine{
    constructor(beans:number, public readonly serialNum: string) {
      super(beans);
    }
    private steamMilk():void {
      console.log('우유를 데우고있습니다.');
    }

    makeCoffee(shots: number):CoffeeCup {
      const coffee = super.makeCoffee(1);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true
      }
    }
  }

  const machine = new CoffeeMachine(28);
  const latteMachine = new CaffeLatteMachine(28, 'SS-1');
  // 상속받은 클래스는 부모 클래스의 메서드를 모두 사용가능하다
  const latte = latteMachine.makeCoffee(2);
  console.log(latte);
  console.log(latteMachine.serialNum);

  // 상속을 이용하면 부모의 기능을 그대로 사용하면서,
  // 자식에서 따로 추가해야할 기능만 추가해서 사용가능하다.
}