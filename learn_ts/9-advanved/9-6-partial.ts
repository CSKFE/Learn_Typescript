{
  type Todo = {
    title: string;
    desc: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodos(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return {...todo, ...fieldsToUpdate};
  }
  
  const todo: Todo = {
    title: 'learn TS',
    desc: 'study',
    label: 'chois Study',
    priority: 'high'
  };

  const updatedTodo = updateTodos(todo, {priority: 'low'});
  console.log(updatedTodo)
}