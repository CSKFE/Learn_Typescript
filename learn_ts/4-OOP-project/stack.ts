interface Stack {
  readonly size:number;
  push(value:string): void;
  pop(): string;
}

class Stack implements Stack {
  constructor(private value: string) {
  }
  private head = this.value;
  
}

class Push extends Stack {

}
class Pop extends Stack {
  
}