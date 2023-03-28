{
  // map타입은 기존의 타입을 이용하면서, 다른 형태로 변환이 가능하다.

  type Video = {
    title: string;
    author: string;
    description: string;
  };
  
  // Video 타입의 옵셔널을 추가하고싶을때 정의
  // type VideoOptional = {
  //   title? : string;
  //   author?: string;
  //   description?: string;
  // }
  
  // Video 타입을 불변하게 설정하고싶을때 정의
  // type VideoReadonly = {
  //   readonly title? : string;
  //   readonly author?: string;
  //   readonly description?: string;
  // }

  // 하지만 비디오 타입에 추가될수록 모든 유틸타입에도 정의해야하므로 불편하다

  type Optional<T> = {
    [P in keyof T]?: T[P]; // for..in 과 동일 ==>> T의 키 중의 P
  };

  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  }

  type VideoOptional = Optional<Video>;
  // Optional map타입을 사용하면 아래와 같아진다.
  // type VideoOptional = {
  //   title? : string;
  //   author?: string;
  //   description?: string;
  // }
  const videoOptional: VideoOptional = {
    title: 'choi'
  }
  type Animal = {
    name: string;
    age: number;
  };

  // 옵셔널은 제네릭을 사용했기때문에 따로 할당해주지않고 바로 변수에 적용할 수 있다.
  const animals: Optional<Animal> = {
    name: 'cat',
  }
  animals.name = 'dog';

  const video:Readonly<Video> = {
    title: 'choi',
    author: 'choi',
    description: 'choi',
  };

  video.title = 'Lee'; // Readonly 이기때문에 변경불가

  // key값을 null로 옵셔널하게 정의가능한 유틸리티
  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  }

  type Proxy<T> = {
    get(): T,
    set(value: T): void;
  };
  // 전달받은 타입의 키들을 Proxy타입으로 한 번씩 래핑준다.
  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
  };
}