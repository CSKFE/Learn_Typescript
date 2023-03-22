{
  const obj = {
    name: 'choi',
    age: 29
  };

  const obj2 = {
    animal: 'cat'
  };

  // 객체의 키 값을 제네릭으로 지정하려면 객체(T)의 상속값(extends)중의 객체의 key값(keyof)으로 정의할수있다
  // <T, K extends keyof T>는 객체 T의 프로퍼티중에 key인 K다 라는 의미다.
  // 반환값 역시 T[K] 객체 T의 key K다 라는 의미다.
  function getValue<T, K extends keyof T>(obj: T, propName: K): T[K] {
    return obj[propName];
  }
}