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
    constructor(
      beans:number, 
      public readonly serialNumber:string, 
      private milkFother: ChipMilkSteamer) {
      super(beans);
    }
    makeCoffee(shots:number):CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkFother.makeMilk(coffee);
    } 
  }

  class SweetCoffeeMaker extends CoffeMachine{
    constructor(private beans:number, private suger: SugerMixer) {
      super(beans)
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.suger.addSuger(coffee);
    }
  }

  /** 각각의 기능을 구현하는게 아니라 따로 구현해서 composition 한다 */

  // 싸구려 우유 거품기
  class ChipMilkSteamer {
    private steamMilk():void {
      console.log('우유를 데우고 있어요.')
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      }
    }
  }

  // 설탕 제조기
  class SugerMixer {
    private getSuger() {
      console.log('설탕을 시럽으로 만들고있어요.');
      return true;
    }
    addSuger(cup: CoffeeCup):CoffeeCup {
      const suger = this.getSuger();
      return {
        ...cup,
        isSyrup: suger,
      }
    }
  }

  class SweetLatteMachine extends CoffeMachine {
    constructor(
      private beans:number,
      private suger:SugerMixer, 
      private milk: ChipMilkSteamer
    ) {
      super(beans)
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(1);
      const suger = this.suger.addSuger(coffee);
      return this.milk.makeMilk(suger);
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



  /**
   * ! 상속의 문제점
   * * 상속이 길어질수록 서로의 관계가 복잡해진다.
   * * 부모클래스의 내부를 수정하면 상속받은 클래스들의 내부도 영향이간다.
   * * TS는 한가지 이상의 클래스를 상속할 수 없다.
   * * 위의 예제를 이어서, 달달한 라떼를 만드는 머신 인스턴스를 만들려면 어떻게 해야할까?
   * * Composition을 이용해보자
   * * 
   */
}