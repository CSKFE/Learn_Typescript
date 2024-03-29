{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
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

  class SweetCoffeeMaker extends CoffeeMachine{
    constructor(beans: number) {
      super(beans);
    }

    addSugar():void {
      console.log(`설탕을 추가합니다.`);
    }
    
    makeCoffee(shots: number):CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.addSugar();
      return {
        ...coffee,
        hasSugar: true
      }
    }
  }

  const machine = new CoffeeMachine(28);
  const sweetCoffee = new SweetCoffeeMaker(35).makeCoffee(1);
  console.log(sweetCoffee);


  // 인스턴스를 배열화 하여 반복문으로 생성가능하다
  // 고로 해당 클래스의 인터페이스의 배열형태의 타입이라고 지정할 수 있다.
  // 인터페이스에는 makeCoffee 메서드만 정의됐기때문에 makeCoffe 메서드만 사용할 수 있게된다.
  const machineArray: CoffeMaker[] = [
    new CoffeeMachine(28),
    new CaffeLatteMachine(28, 'SS-2'),
    new SweetCoffeeMaker(28),
    new CoffeeMachine(28),
    new CaffeLatteMachine(28, 'SS-3'),
    new SweetCoffeeMaker(28),
  ];

  machineArray.map(e => {
    console.log('-----------------');
    e.makeCoffee(1);
  });
}