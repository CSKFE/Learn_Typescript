{
  /* 
  ! 상속의 문제점 
  * 상속의 깊이가 깊어질수록 서로의 관계가 조금씩 복잡해진다.
  */

  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  }
  interface CoffeMaker {
    makeCoffee(shots:number): CoffeeCup
  }

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }
  
  class CoffeeMachine implements CoffeMaker {
    private static BEANS_PER_COFFEE:number = 7;
    private coffeeBeans:number = 7;
    
    // 상속을 하려면 constructor가 private면 안된다.
    // public혹은 상속받은 자식에서 접근할 수 있는 protected여야한다.
    constructor(
      coffeBeans: number,
      private milkMaker: MilkFrother,
      private sugarMaker: SugarProvider,
      ) {
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
      const coffee = this.extract(shots);
      return this.sugarMaker.addSugar(this.milkMaker.makeMilk(coffee));
    }
  }

  // class CaffeLatteMachine extends CoffeeMachine{
  //   // 기존에는 해당 클래스에서 우유를 만들어 넣었다
  //   // 하지만 Composition을 이용해서 우유를 만드는 기능을 하는 클래스의 인스턴스를 인자로 받아
  //   // 멤버변수로 만들어 주고, 해당 인스턴스의 메서드를 이용해서 최종적인 결과를 산출한다.
  //   // 이렇게 composition을 이용해서 추가적인 기능을 따로 빼서 관리 할 수 있다.
  //   constructor(beans:number, public readonly serialNum: string, private milkMaker: MilkFrother) {
  //     super(beans);
  //   }

  //   makeCoffee(shots: number):CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.milkMaker.makeMilk(coffee);
  //   }
  // }

  // class SweetCoffeeMaker extends CoffeeMachine{
  //   constructor(beans: number, private sugarMaker: SugarProvider) {
  //     super(beans);
  //   }
    
  //   makeCoffee(shots: number):CoffeeCup {
  //     const coffee = super.makeCoffee(shots);
  //     return this.sugarMaker.addSugar(coffee);
  //   }
  // }

  // 우유를 만드는 composition
  class CheapMilkSteamer implements MilkFrother {
    private steamer():void {
      console.log('우유 거품을 만들고있습니다.')
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamer();
      return {
        ...cup,
        hasMilk: true
      }
    }
  }
  class FansyMilkSteamer implements MilkFrother {
    private steamer():void {
      console.log('좋은 우유의 거품을 만들고있습니다.')
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamer();
      return {
        ...cup,
        hasMilk: true
      }
    }
  }
  class ColdMilkSteamer implements MilkFrother {
    private steamer():void {
      console.log('차가운 우유의 거품을 만들고있습니다.')
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamer();
      return {
        ...cup,
        hasMilk: true
      }
    }
  }

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // 설탕을 넣는 composition
  class CandySugarMixer implements SugarProvider {
    private getSugar(): boolean {
      console.log('설탕을 사탕에서 얻어올게요');
      return true
    };

    addSugar(cup: CoffeeCup):CoffeeCup {
      const isSugar = this.getSugar();
      return {
        ...cup,
        hasSugar: isSugar
      };
    };
  }
  class SugarMixer implements SugarProvider {
    private getSugar(): boolean {
      console.log('설탕을 통에서 가져올게요');
      return true
    };

    addSugar(cup: CoffeeCup):CoffeeCup {
      const isSugar = this.getSugar();
      return {
        ...cup,
        hasSugar: isSugar
      };
    };
  }
  class SyrupMixer implements SugarProvider {
    private getSugar(): boolean {
      console.log('시럽을 펌프합니다.');
      return true
    };

    addSugar(cup: CoffeeCup):CoffeeCup {
      const isSugar = this.getSugar();
      return {
        ...cup,
        hasSugar: isSugar
      };
    };
  }
  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }
  // 기능을 분리하여 디펜던시 인젝션으로 조금 더 유연하고 확장된 클래스를 만들었다
  // 하지만 클래스들간의 커플링이 너무 강해졌다
  // 이러한 현상은 좋지못하다.
  // 누군가 변경되거나 대체되면 나머지를 다 수정해주어야한다.
  // composition기능들의 interface를 정의해서 클래스들간의 커플링을 디커플링해줬다.
  // class SweetCaffeLatteMachine extends CoffeeMachine{
    // 외부에서 필요한 기능을 가져와서 넣어준다
    // 디펜던시 인젝션 이라고 한다.
  //   constructor(
  //     private beans: number, 
  //     private milkFrother: MilkFrother, 
  //     private sugarMaker: SugarProvider
  //     ) {
  //       super(beans)
  //     }
  //     makeCoffee(shots: number): CoffeeCup {
  //       const coffee = super.makeCoffee(shots);
  //       const mlik = this.milkFrother.makeMilk(coffee);
  //       return this.sugarMaker.addSugar(mlik);
  //     }
  // }


  
  // 우유 생성
  const mlikMachine = new CheapMilkSteamer();
  const fansyMilk = new FansyMilkSteamer();
  const coldMilk = new ColdMilkSteamer();
  const nomilk = new NoMilk();

  // 사탕 생성
  const candySugarMachine = new CandySugarMixer();
  const sugarMachine = new SugarMixer();
  const syrupPump = new SyrupMixer();
  const nosugar = new NoSugar();


  // 커피머신
  const machine = new CoffeeMachine(28, nomilk, nosugar);
  const latteMachine = new CoffeeMachine(35, coldMilk, nosugar);
  const sweetCoffeeMachine = new CoffeeMachine(35, nomilk, syrupPump);

  /**
   * * 최종적으로 여러가지 머신을 만드는 클래스를 사용하지않고,
   * * 우유를 만드는 클래스들, 사탕을 만드는 클래스들을 정의해서
   * * 부모 클래스에서 이 인자들을 디펜던시 인젝션을 사용해서 다양한 형태의 인스턴스들을 생성 할 수 있게됐다.
   */

  // 달달한 커피머신을 생성
  // 같은 클래스를 재사용해도 각각의 다른 인스턴스들을 생성함.
  // const candyCoffeMachine = new SweetCoffeeMaker(14, candySugarMachine);
  // const sweetCoffeMachine = new SweetCoffeeMaker(14, sugarMachine);
  // const syrupCoffeMachine = new SweetCoffeeMaker(14, syrupPump);


  // const latteMachine = new CaffeLatteMachine(28, 'SS-3', mlikMachine);
  // const latte = latteMachine.makeCoffee(1);
  // console.log(latte);

  // const sweetLatteMachine = new SweetCaffeLatteMachine(35, mlikMachine, sugarMachine);
  // const sweetLatte = sweetLatteMachine.makeCoffee(1);
  // console.log(sweetLatte);



}