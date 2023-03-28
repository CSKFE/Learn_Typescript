type PositionType = {
  x: number;
  y: number;
}

interface PositionInterface {
  x: number;
  y: number;
}

// interface를 오버라이딩하면 해당 인터페이스를 사용하는곳은 두가지 인터페이스의 규약 모두를 따라야한다.
interface PositionInterface {
  z: number;
}

// Type Alias와 interface 모두 Object타입 정의가능.
const positionObj1: PositionType = { x: 1, y: 1 };
const positionObj2: PositionInterface = { x: 1, y: 1, z: 1 };

class Pos1 implements PositionType {
  x: number;
  y: number;
}

class Pos2 implements PositionInterface {
  x: number;
  y: number;
  z: number;
}

interface ZPositionInterface extends PositionInterface {
  z: number;
}

// Type은 intersection을 통해 확장이 가능
type ZPositionType = PositionType & { z: number; };

// type PositionType {}; => error 오버라이딩 불가

// Type Alias는 computed properties 로 확장이가능하다
// ex

type Person = {
  name: string,
  age: number,
}
type Name = Person['name']; // string 마치 객체의 키를 읽어오는 문법과 똑같다

// 그러면 언제 어떤걸 쓸까?

/**
 * * interface
 * * 규격을 통해 어떤것을 구현해야한다면 interface를 사용하는것이 좋다
 * * 규격을 작성한 규격서라고 생각해보면 좋다
 * 
 * * Type Alias
 * * 어떤 데이터를 담을때, 데이터의 모습(타입)을 정의한다.
 * * 위의 예제에서는 Position은 inerface보다는 Type alias가 적절하다.
 */