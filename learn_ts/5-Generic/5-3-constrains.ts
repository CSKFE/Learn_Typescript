{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee{
    pay() {
      console.log(`FullTime pay`);
    };

    workFullTime() {}
  }

  class PartTimeEmployee implements Employee{
    pay() {
      console.log(`PartTime pay`);
    };

    workPartTime() {}
  }

  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // 인터페이스 Employee을 상속받은 값만 인자로 받을 수 있도록 조건을 걸어줆.
  function pay<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }


  const choi = new FullTimeEmployee();
  const lee = new PartTimeEmployee();

  choi.workFullTime();
  lee.workPartTime();

  const choisPay = pay(choi);
  const leePay = pay(lee);
  // pay 함수에 제네릭을 조건으로 사용하여 Employee를 따르는 타입이 아닌 값은 사용할 수 없어짐.
  const otherPay = pay(1);

  choisPay.pay();

}