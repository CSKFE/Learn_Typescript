{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  }

  interface CoffeMaker {
    makeCoffee(shots:number): CoffeeCup
  }

  // abstract 클래스는 생성자를 만들지않는다.
  abstract class CoffeeMachine implements CoffeMaker {
    private static BEANS_PER_COFFEE:number = 7;
    private coffeeBeans:number = 7;
    
    constructor(coffeBeans: number) {
      this.coffeeBeans = coffeBeans;
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

    // 추상적인 함수기 때문에 상속받은 자식에서 직접적으로 구현해야한다
    // 그러므로 부모 클래스에서는 이 함수는 추상적이다 라는것만 구현해놓는다.
    // 인터페이스에서 규격을 정의한것처럼
    // abstract 클래스는 구현해야하는 클래스마다 달라져야하는 함수만 따로 상속받은 클래스에서 구현해주면된다.
    protected abstract extract(shots:number):CoffeeCup;

    clean():void {
      console.log('커피 머신을 청소합니다.')
    }
    
    makeCoffee(shots:number):CoffeeCup {
      this.preHeat();
      this.grindBeans(shots);
      return this.extract(shots)
    }
  }

  class CaffeLatteMachine extends CoffeeMachine{
    constructor(beans:number, public readonly serialNum: string) {
      super(beans);
    }
    private steamMilk():void {
      console.log('우유를 데우고있습니다.');
    }

    protected extract(shots: number): CoffeeCup {
      this.steamMilk();
      return {
        shots,
        hasMilk: true
      }
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine{
    constructor(beans: number) {
      super(beans);
    }

    addSugar():void {
      console.log(`설탕을 추가합니다.`);
    }
    
    protected extract(shots: number): CoffeeCup {
      this.addSugar();
      return {
        shots,
        hasSugar: true
      }
    }
  }

  const sweetCoffee = new SweetCoffeeMaker(35).makeCoffee(1);
  console.log(sweetCoffee);


  const machineArray: CoffeMaker[] = [
    new CaffeLatteMachine(28, 'SS-2'),
    new SweetCoffeeMaker(28),
    new CaffeLatteMachine(28, 'SS-3'),
    new SweetCoffeeMaker(28),
  ];

  machineArray.map(e => {
    console.log('-----------------');
    e.makeCoffee(1);
  });
}