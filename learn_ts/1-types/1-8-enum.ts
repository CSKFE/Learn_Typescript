{
  // ENUM type
  // 여러가지의 관련된 상수를 모아서 정의한 타입이다.
  // 다른 언어에는 있지만 JS에는 없다. 하지만 TS에 있다!

  const MAX_NUM = 6;
  const MAX_STUDENT_PER_CLASS = 40;

  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({
    "MONDAY": 0,
    "TUESDAY": 1,
    "WEDNESDAY": 2
  });
  const dayOfToday = DAYS_ENUM.MONDAY; // 0

  // 위는 JS에서의 상수 집합을 정의하는 방식이다.
  // Object.freeze로 불변객체를 정의해서 하나씩 빼서 쓰는 방식이다.
  // 요일과같은 관련된 상수들을 정의했다.


  // TypeScript ENUM
  enum Days {
    Monday = 1, // 기본적으로 enum의 인덱스는 0부터 시작하지만 직접 시작되는 값을 지정해줄수있다.
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Monday); // 0 -> 1
  const day = Days.Thursday;
  console.log(day); // 3 -> 4

  // enum의 시작값을 문자열로도 지정해줄수있다.
  // 하지만 문자열로 바꾸게될 경우 모든 값에 문자열 값을 할당해주어야한다.
  // enum이 열거형 값 이기 때문에 열거 될 수 없는 규칙인 문자열을 할당해주었기 때문이다.

  // enum Days2 {
  //   Monday = 'a',
  //   Tuesday,
  //   Wednesday,
  //   Thursday,
  //   Friday,
  //   Saturday,
  //   Sunday,
  // }

  // enum의 문제점
  // 위의 예제를 이어서 하면,
  let day2 = Days.Monday;
  // 위의 선언은
  // let day2:Days = Days.Monday;
  // 타입 정의가 생략됐다.
  day2 = Days.Saturday;
  day2 = 10;
  // 이처럼 Days enum의 타입을 갖고있는 변수지만
  // 숫자를 할당해도 어떤 에러를 뱉지않고 정상적으로 컴파일된다.
  // 이렇듯 enum으로 정의된 상수의 집합은 명확한 타입을 보장해주기 어렵다는 단점이있다.

  // enum은 충분히 유니온과 스트링리터럴의 조합으로 대체가 가능하다.
  type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday';
  let DayOfWeeek:DayOfWeek = 'Monday';
  DayOfWeeek = 'Tuesday';

  // 정말 enum을 사용할 경우가 아니라면 추천하지는 않는다.
}