{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  }

  // 인터페이스는 일종의 명세서같은거다.
  // 인터페이스를 따르는 자료가 어떤 행동을 해야할지 명시해준다.
  // 인터페이스에 정의된 내용을 이 인터페이스를 따르는 무언가는 반드시 정의해야한다.
  interface CoffeMaker {
    makeCoffee(shots:number): CoffeeCup
  }
  interface CommercialCoffeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean():void;
  }

  // 인터페이스 규약을 두가지로도 설정이가능하다.
  // 두가지의 모든 타입인터페이스를 따라야한다.
  class CoffeeMachine implements CoffeMaker, CommercialCoffeMaker {
    private static BEANS_PER_COFFEE:number = 7;
    private coffeeBeans:number = 7;

    private constructor(coffeBeans: number) {
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
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(14);
  maker.fillCoffeeBeans(14);
  maker.makeCoffee(2);
  // 위 처럼 클래스에 여러 메서드들을 정의하면 이 클래스를 사용하려는 사용자는 어떤 메서드를 먼저 사용해야할지 혼란이온다.
  // private 접근자를 추가해서 외부에서는 내부의 메서드들이 어떤 일을 하는지 알수없게(알필요도없다) 추상화한다.
  
  
  // 
  const maker2: CoffeMaker = CoffeeMachine.makeMachine(28);
  // maker2는 CoffeMaker 인터페이스를 따르기때문에 인터페이스에 정의되지않은 메서드를 호출할수없다.
  // 이로써 인터페이스는 행동제약도 걸어줄 수 있다.
  //maker2.fillCoffeBeans(28);

  // CommercialCoffeMaker 인터페이스를 따르기에 해당 인터페이스에 정의된 메서드를 사용할수잇다.
  const maker3: CommercialCoffeMaker = CoffeeMachine.makeMachine(35);
  maker3.clean();
  maker3.fillCoffeeBeans(35);
  maker3.makeCoffee(2);

  class Amature {
    constructor(private machine:CoffeMaker){}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(1);
      console.log(coffee);
    }
  }

  class Pro {
    constructor(private machine: CommercialCoffeMaker) {}
    makeCoffee() {
      this.machine.fillCoffeeBeans(7)
      const coffee = this.machine.makeCoffee(1);
      this.machine.clean();

      console.log(coffee);
    }
  }

  const makers = CoffeeMachine.makeMachine(35);
  // Amature와 Pro 클래스는 생성자에 인자를 받을때
  // 받은 인자의 인터페이스만 알면
  // 생성된 인스턴스에서 어떤 메서드를 사용할지 알 수 있다.
  // 이처럼 constructor에 인자의 인터페이스만으로도 생성된 인스턴스가 같은 인스턴스를 받더라도
  // 다른 인터페이스를 참조하고있다면, 인터페이스에 정의된 규약을 따르게된다.
  const amature = new Amature(makers);
  amature.makeCoffee();
  const proBaristar = new Pro(makers);
  proBaristar.makeCoffee();
}