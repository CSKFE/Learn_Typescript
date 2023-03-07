// 배열과 튜플
{
  // 문자열 배열
  const fruits: string[] = ['tomato', 'banana'];
  // 숫자 배열
  const scores: number[] = [1,2,3];
  const scores2: Array<number> = [1,2,3];

  // readonly 를 사용하면 주어진 데이터를 출력하지만 변경하거나 업데이트할수없다.
  //function printArray(fruits: readonly Array<string>) readonly에 해당 문법은 사용할 수 없다.
  function printArray(fruits: readonly string[]) {
    //fruits.push() 배열에 추가를 하려하자, 에러를 발생시킨다.
  }
  // 객체의 불변성을 보장해준다.

  // Tuple 배열이지만 서로 다른 타입을 함께 가질 수 있는 타입이다.
  let student: [string, number];
  student = ['name', 123];
  student[0] // name
  student[1] // 123

  // 엘리는 Tuple을 사용하는것을 추천하지않는다.
  // 배열의 인덱스로 접근하는것은 가동성이 떨어진다.
  // 직관적으로 확인하기 어렵기때문이다.
  // Tuple 대신 interface, type alias, class 등으로 대체하는게 좋다.

  // 디스트럭쳐링 할당으로 사용하면 조금 더 직관적인 코드가 된다.
  const [name, age] = student;


  // Tuple 예제
  // React의 useState()가 Tuple의 형태다

  // const [num, setNum] = useState(0)
  // useState의 retrun type이 Tuple을 잘 사용한 예제다.
  
}