{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeMaker {
    // private 키워드로 변수를 외부에서 액세스하지못하게 접근제어
    private static BEANS_GRAMM_PER_SHOT:number = 7; 
    // protected 키워드는 인스턴스에서만 접근이 가능해짐
    protected coffeeBeans:number = 0;

    // constructor에 private를 사용하면 static 메서드로만 인스턴스를 생성하게 가능해짐
    private constructor(coffeeBeans:number) {
      this.coffeeBeans = coffeeBeans;
    }

    // static 키워드로 인스턴스를 생성하지 않고 클래스의 메서드를 바로 호출하여 클래스를 생성
    static makeMachine(coffeeBeans:number):CoffeMaker {
      return new CoffeMaker(coffeeBeans)
    }
  
    // 외부에서 private 변수에 액세스할때, 검증을 거침
    fillCoffeBeans(coffeeBeans:number) {
      if(coffeeBeans < 0) {
        throw new Error('0개 미만의 콩은 넣을 수 없습니다.')
      }
      this.coffeeBeans = coffeeBeans;
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

  // const coffeMachine = new CoffeMaker(32); // constructor에 private 접근제어가를 추가하여 new 키워드로 인스턴스 생성이 불가해짐
  // console.log(coffeMachine);
  // coffeMachine.fillCoffeBeans(32);
  const coffeMachine2 = CoffeMaker.makeMachine(32);
  console.log(coffeMachine2);

  class User {
    // constructor에 인자에도 private를 이용하여 바로 멤버변수로 만들 수 있다.
    constructor(private firstName: string, private lastName: string) {}
    private interalAge = 29;

    get getFullName():string {
      return `${this.firstName} ${this.lastName}`
    }

    get age():number {
      return this.interalAge;
    }

    set age(age:number) {
      this.interalAge = age;
    }
  }

  const user = new User('steve', 'jobs');
  console.log(user.getFullName); // choi jobs - getter를 이용해 값을 가져옴
  user.age = 28; // setter로 내부의 private 필드의 값을 갱신
}