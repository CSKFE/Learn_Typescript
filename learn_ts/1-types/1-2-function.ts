// 함수에서의 타입 활용
{
  // 함수의 어떤값을 넣고 어떤값을 리턴하는지 명확하지 않다.
  // 그렇기때문에 설계의 예상과 달리 다른 결과를 반환할 수 있다.
  // function jsAdd(num1, num2) {
  //   return num1 + num2;
  // }
  
  // 각각 숫자를 전달 할 수 있고, 숫자를 반환하는것을 명시적으로 알 수 있다.
  // function add(num1:number, num2:number):number {
  //   return num1 + num2;
  // }


  // 이런식으로 코드가 긴 비동기 함수가 있다
  // 무엇을 리턴하는지 확인하려면 코드를 많이 내려야한다.(명시적이지 않다)
  // function jsFetchNum(id) {
  //   // code ...
  //   // code ...
  //   // code ...
  //   // code ...
  //   // code ...
  //   // code ...
  //   return new Promise((resolve, reject) => {
  //     resolve(100)
  //   });
  // }

  
  // 이렇게 스트링을 인자로 받아 프로미스<넘버> 타입을 리턴한다 라는것을 명시적으로 알 수 있다.
  // 무언가 id:스트링 을 받아 패칭 후 숫자를 프로미스로 리턴한다 를 알 수 있다.
  // function tsFetchNum(id:string):Promise<number> {
  //   // code...
  //   // code...
  //   // code...
  //   // code...
  //   // code...
  //   // code...
  //   return new Promise((resolve, reject) => {
  //     resolve(100)
  //   });
  // };

  // 타입을 기재함으로 더 문서화됐고, 명시적인 코드가 됐다.

  // Optional Params
  // 인자에 ? 를 붙히면 인자를 받을 수 도있고, 아닐 수 도 있다
  // 옵셔널한 인자가 됐다.
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }

  printName('Sun', 'Choi');
  printName('El'); // El undefined
  printName('choi', undefined); // choi undefined 

  // Optional Parmas를 사용하면 string 일수도있고, undefined일수도있다.
  // function printName(firstName: string, lastName: string | undefined) {
  // Union을 사용할수도있지만, 반드시 undefined를 전달해야하는 불편함이 있다.

  // default Params
  // 옵셔널 파라미터는 전달하지않으면 undefined지만
  // 디폴트 파라미터는 디폴트로 설정된 값으로 된다.
  // ES6의 기능이다.
  function printMessage(message: string = 'default message') {
    console.log(message);
  }
  printMessage(); // default message

  // Rest Params
  // ES6에 추가된 기능이며 가변인자를 배열 형태로 받을 수 있다.
  // number[] 숫자로 구성된 배열이라는 타입으로 지정했다.
  function adds(...args: number[]):number {
    return args.reduce((calc, val) => calc + val, 0);
  }
  adds(1,2,3,4,5,6);
}