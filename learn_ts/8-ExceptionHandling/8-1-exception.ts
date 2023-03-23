/** Exception? 
  * 자바스크립트에서는 Erorr클래스로 처리한다.
  * 작성한 API를 사용하는 개발자들에게 예상치못한 에러를 나타내줄때 Error을 통해 처리했다.
  * 보통은 컴파일 단계에서 에러가 발생하지않도록 만드는게 더 이상적이다.
  * TS컴파일러는 똑똑하다, 어디에 에러가 나는지 잘 알려준다.
*/

// const arr = new Array(10000000000000000); // Error가 발생했으나 예상치못한 에러엿다.

// Error(Exception) Handling : try -> catch -> finally

const readFile = (fileName: string): string => {
  if(fileName === '') throw new Error('file name is not defined');
  return `file name is ${fileName}`;
}

const closeFile = (fileName: string) => {
  console.log(`close ${fileName}`);
}

const file = 'file.pdf';
readFile(file);
closeFile(file);
const notFileName = '';
try {
  readFile(notFileName);
}catch(error) {
  console.log(`Error!`);
}finally {
  closeFile(notFileName);
}
console.log(`!!!!!!`);

/**
 * try, catch를 이용해 에러핸들링을하면 어디서 에러가 발생했는지 체크도 가능ㅎ다
 * 에러가 발생하더라도 어플리케이션이 죽지않는다.
 * 위의 흐름에서는 파일을 읽고, 반드시 닫아주어야한다
 * 읽는 과정에서 에러가 나더라도 finally에서 닫아줄 수 있다.
 * try -> catch -> finally 를 적극이용해서 에러가 발생해도 전체적인 흐름에 지장이 가지않도록 흐름을 구성하자.
 */