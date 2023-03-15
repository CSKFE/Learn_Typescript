{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    isSyrup?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  // 인터페이스를 구현하는 클래스다 라는 뜻의 implements
  // 인터페이스에 정의된것을 구현하지않으면 에러를 발생시킨다.
  // 두가지 인터페이스의 규칙을 따르는 클래스
  class CoffeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT:number = 7; 
    private coffeeBeans:number = 10000;

    constructor(coffeeBeans:number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans:number):CoffeMachine {
      return new CoffeMachine(coffeeBeans)
    }

    private grindBeans(shots:number) {
      console.log(`커피를 갈고있습니다 ${shots}샷`);
      if(this.coffeeBeans < shots * CoffeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error('커피 콩이 부족합니다.');
      }
      this.coffeeBeans -= shots * CoffeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat() {
      console.log('머신을 데우고 있습니다.');
    }

    private extract(shots:number):CoffeeCup {
      console.log('커피를 추출중입니다.')
      return {
        shots,
        hasMilk: false
      };
    }

    fillCoffeBeans(coffeeBeans:number) {
      if(coffeeBeans < 0) {
        throw new Error('0개 미만의 콩은 넣을 수 없습니다.')
      }
      this.coffeeBeans = coffeeBeans;
    }

    makeCoffee(shots: number):CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
    cleanMachine() {
      console.log('기계를 청소합니다.')
    }
  }

  class LatteMachine extends CoffeMachine {
    constructor(beans:number, public readonly serialNumber:string) {
      super(beans);
    }
    private steamMilk():void {
      console.log('우유를 데우고 있어요.')
    }
    makeCoffee(shots:number):CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true
      };
    } 
  }

  class SweetCoffeeMaker extends CoffeMachine{
    constructor(beans:number) {
      super(beans)
    }
    private pumpSyrup():void {
      console.log('시럽을 넣고 있어요.')
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.pumpSyrup();
      return {
        ...coffee,
        isSyrup: true,
      }
    }
  }

  const machine = new CoffeMachine(23);
  const latteMachine = new LatteMachine(23, 'SS-1');
  const latte = latteMachine.makeCoffee(1);
  console.log(latte);
  console.log(latteMachine.serialNumber);

  const sweetCoffeMachine = new SweetCoffeeMaker(23);
  const sweetAmericano = sweetCoffeMachine.makeCoffee(1);
  console.log(sweetAmericano);

  // CoffeeMachine를 상속한 클래스 들은 결국 CoffeeMachine의 인터페이스인 CoffeeMaker를 따르므로
  // CoffeeMaker[]로 정의 할 수 있다.
  const machines:CoffeeMaker[] = [
    new CoffeMachine(16),
    new LatteMachine(16, 'SS-2'),
    new SweetCoffeeMaker(16)
  ];

  machines.map(machine => {
    console.log('---------------------');
    machine.makeCoffee(1);
  });
}