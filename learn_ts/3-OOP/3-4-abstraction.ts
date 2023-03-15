{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  interface CommercialCoffeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeBeans(beans:number): void;
    cleanMachine():void;
  }
  // 인터페이스를 구현하는 클래스다 라는 뜻의 implements
  // 인터페이스에 정의된것을 구현하지않으면 에러를 발생시킨다.
  // 두가지 인터페이스의 규칙을 따르는 클래스
  class CoffeMachine implements CoffeeMaker, CommercialCoffeMaker {
    private static BEANS_GRAMM_PER_SHOT:number = 7; 
    protected coffeeBeans:number = 10000;

    private constructor(coffeeBeans:number) {
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

  const coffeMachine:CoffeMachine = CoffeMachine.makeMachine(32);
  coffeMachine.fillCoffeBeans(32);
  coffeMachine.makeCoffee(2);

  // interface를 이용하면 정의되지않은 메서드를 인스턴스에서 사용할 수 없다.
  const coffeMachine2:CoffeeMaker = CoffeMachine.makeMachine(32);
  /** 
   *! error --- coffeMachine2.fillCoffeBeans(32); 
  */
  coffeMachine2.makeCoffee(2);

  const coffeMachine3:CommercialCoffeMaker = CoffeMachine.makeMachine(28);
  coffeMachine3.fillCoffeBeans(32);
  coffeMachine3.makeCoffee(2);
  coffeMachine3.cleanMachine();

  class AmatureUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(4);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeMaker) {}
    makeCoffee() {
      this.machine.fillCoffeBeans(3000);
      const coffee = this.machine.makeCoffee(10);
      this.machine.cleanMachine();
      console.log(coffee);
    }
  }

  const makers:CoffeMachine = CoffeMachine.makeMachine(30);
  const amatuer = new AmatureUser(makers);
  const pro = new ProBarista(makers);
  amatuer.makeCoffee();
  pro.makeCoffee();

  /**
   * * 정리
   * * CoffeMachine 클래스는 두 가지 인터페이스를 따르는 인스턴스를 생성하는 클래스다
   * * 멤버변수로는 coffeBeans가 있고, 이는 인스턴스에서 액세스가 가능하다 
   * * 그리고 해당 클래스로 인스턴스를 생성할때는, new 키워드가 아닌 CoffeMachine.makeMachine으로 가능하다
   * * 이는 컨스트럭터가 private으로 접근제어가 걸려있고, makeMachine 메서드가 스테텍 메서드로 정의됐기 때문이다.
   * * 또 private static 변수로는 BEANS_GRAMM_PER_SHOT이 있다, 이는 샷 한잔에 몇 그람의 콩이 들어가는지 추상화한 정보다.
   * * 멤버변수로 정의된 메서드는 preheat, grindBeans, extract 가 있으며 인스턴스에서 접근이 불가하고 내부적으로 처리되는 로직이다.
   * * 해당 클래스는 두가지 인터페스의 규약을 따르는데, CoffeeMaker와 CommercialCoffeMaker다
   * * CoffeeMaker 인터페이스를 따르는 클래스의 인스턴스는 커피를 만들수있는 makeCoffee 메서드만 가질 수 있다.
   * * CommercialCoffeMaker 인터페이스를 따르는 클래스의 인스턴스는 makeCoffee, clearMachine, fillCoffeeBeans 메서드를 가질 수 있다.
   * * 두 가지 인터페이스로 만든 클래스는 AmatureUser, ProBarista 다.
   * * 두 클래스는 makers 라는 인스턴스를 인자로 받아 생성됐는데, makers는 CoffeeMachine.makerMachine으로 생성된 인스턴스다.
   * * 두 클래스를 정의 할 때, constructor에 machine를 멤버 변수로 정의 했는데 이때, 이 멤버변수가 따르는 인터페이스가 위에서 정의했던 CoffeeMaker와 CommercialCoffeMaker다.
   * * 결국 두 클래스가 인자로 받은 makers도 동일하게 CoffeeMaker와 CommercialCoffeMaker 인터페이스를 따르는 클래스에서 파생된 인스턴스이기때문에 
   * * 두 클래스 모두 CoffeeMaker와 CommercialCoffeMaker를 상속받아 인스턴스를 생성 할 수 있게된다.
   */
}