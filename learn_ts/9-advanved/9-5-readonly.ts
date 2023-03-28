{
  // 앞서 작성했던 유틸리티 타입은 사실 미리 다 정의돼있다.
  type Todo = {
    title: string;
    desc: string;
  };

  function displayTodos(todo: Readonly<Todo>) {
    // 가변성의 수정이 가능한 object를 전달하는것은 위험하다.
    // 항상 불변성을 유지해주자.
    todo.title = 'hahahaha';
  }
}