{
  class Person {
    // 생성자 인자 자체에 private 접근자를 이용하면 따로 바인딩해주지않아도 바로 클래스필드로 사용가능하다
    constructor(private firstName: string, private lastName: string) {
    }

    private age = 29;
    get getFullName():string {
      return `${this.firstName} ${this.lastName}`
    }

    // getter 로 private한 내부 필드를 조회가능하다
    get internalAge():number {
      return this.age;
    }

    // setter로 private한 내부 필드를 갱신가능하다
    set internalAge(num:number) {
      if(num < 0) {
        throw new Error('0보다 작은 수는 넣을 수 없습니다.')
      }
      this.age = num;
    }
  }

  const user = new Person('choi', 'sunkyu');
  console.log(user.fullName);
  user.firstName = 'lee';
  // firstName을 변경해도 초기값이 변경되지않음
  console.log(user.fullName);
  // getter 를 이용해서 호출시점의 값을 조회할수있다.
  // getter는 get 키워드를 사용하고 함수호출이 아닌, 프로퍼티를 접근하듯 사용 해야한다.
  console.log(user.getFullName);
}