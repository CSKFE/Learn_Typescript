// 제네릭을 사용해서 stack의 타입을 정의해보자
// 간단하다 받아오는 부분의 타입만 제네릭으로 재정의해주면된다.
interface Stack<T> {
  readonly size: number;
  push(value: T): void;
  pop(): T;
}

type StackNodeType<T> = {
  readonly value: T;
  readonly next?: StackNodeType<T>;
}
class StackImpl<T> implements Stack<T> {
  private _size: number = 0;
  private head?: StackNodeType<T>;

  constructor(private maxLength:number) {}

  get size():number {
    return this._size;
  }

  push(value: T):void {
    if(this._size === this.maxLength) throw new Error('스택이 꽉 찼습니다.');
    const node = { value, next: this.head };
    this.head = node;
    this._size++;
  };

  pop():T {
    if(this.head == null) throw new Error('스텍이 비어있습니다.');
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  };
};