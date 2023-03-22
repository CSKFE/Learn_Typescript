interface Stack {
  readonly size: number;
  push(value: string): void;
  pop(): string;
}

type StackNodeType = {
  readonly value: string;
  // next는 head의 정보를 담기에 초기값이 undefined일 수 있으므로, 옵셔널하게 정의한다.
  readonly next?: StackNodeType;
}
class StackImpl implements Stack {
  private _size: number = 0;
  // head역시 undefined가 초기값으로 올 경우가 있어 옵셔널로 정의해준다.
  private head?: StackNodeType;

  constructor(private maxLength:number) {}

  get size():number {
    return this._size;
  }

  push(value: string):void {
    if(this._size === this.maxLength) throw new Error('스택이 꽉 찼습니다.');
    const node = { value, next: this.head };
    this.head = node;
    this._size++;
  };

  pop():string {
    // === undefined를 해주면 null이 들어 올 경우에도 예외 처리를 해버리므로 느슨한 비교를 통해 falsy한 값을 필터링해준다.
    if(this.head == null) throw new Error('스텍이 비어있습니다.');
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  };
};

const stack = new StackImpl(3);
stack.push('choi');
stack.push('lee');
stack.push('park');
stack.push('park2');
// console.log(stack);

/*
  TODO: Stack 구현
  * Stack은 LIFO(Last In First Out) 구조다.
  * 나중에 들어온 스택이 가장 먼저 제거된다.
  * Stack의 인터페이스
  * 
  * - size = 스택의 사이즈를 반환하는 getter
  * - push = 스택에 값을 추가하는 메서드, string 타입의 value를 인자로 받는다
  * - pop = 스택의 값을 제거하는 메서드, string 타입의 value를 반환해준다.
  * 
  * NodeStackType 타입
  * - value = 실제 스텍에 쌓일 값의 실체, string타입이고 한 번 받은 값을 바꿀 수 없기때문에 readonly
  * - next = 스텍의 head(포인터)가 가리킬 값, 가리킬 값의 타입은 스텍 그 자체기 때문에 NodeStackType 타입을 그대로 받는다. 
  *          역시 바뀔 수 없기 때문에 readonly
  * 
  * 멤버변수
  * _size = 멤버변수로 외부에서 접근할 수 없기때문에 private를 사용했다. 조회는 오직 getter로만 가능하다.
  * head = 스텍의 포인터다, 스텍이 생성됐을때 바라볼 스택을 담는 데이터, 스택을 가리키기때문에 스택의 타입인 NodeStackType을 갖는다.
  * 
  * 메서드
  * push(value: string):void = 실제 값을 받아 스택을 쌓는다.
  *  - string타입의 값을 받아온다.
  *  - node 라는 객체를 생성한다. 이 객체는 스택의 실체고, 스택의 정보를 저장한다.
  *  - node.value = 인자로 받아온 값의 정보를 가짐
  *  - node.next = head가 참조하고 있는 정보를 담고있다, 스택의 첫 번째 next는 undefined다, head가 참조할 다음 스택이 없기때문이다.
  *  -- 스택이 2개가 되면, 이전 스택의 정보를 담고있다. 이 역시 스택이 추가될때 head가 이전 들어온 스택을 바라보고 있기 때문이다.
  *  -- 이렇게 node.next는 새로운 스택이 들어오면 이전 스택의 node를 바라보고있어야한다.
  * 
  * pop(): string = 쌓인 스택의 값을 제일 나중에 들어온 순서로 제거한다(LIFO)
  *  - push와 동일하게 node를 생성한다. 이 node는 node.next를 참조하기 위한 노드다.
  *  - node는 마지막 스택을 찾아야하는데 이를 담고있는 정보는 head가 바라보고있으므로, head를 할당해준다.
  *  - 이제 이 함수가 호출 될때에는, 마지막 스택을 무시해줘야 하므로 head의 포인터를 이전 스택으로 변경해주면된다.
  *  - 이전 스택의 정보는 node.next가 참조하고있으므로 head에 node.next를 할당해주므로 마지막 스택을 무시해준다.
  *  - 마지막으로 제거된 value를 반환해준다.
 */