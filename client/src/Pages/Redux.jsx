import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Todos = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const handelClick = id => dispatch({
    type:'DELETE_TODO',
    payload: id,
  }); 
  if (!todos || !todos.length) {  
    return <div>no todos</div>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <li onClick={()=>handelClick(todo.id)}>{todo.label}</li>
      ))}
    </ul>
  );
};
const InputTodos = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const handelNewTodo = event => {
    setNewTodo(event.target.value);
  };
  const handelClick = () =>
    dispatch({
      type: "ADD_TODO",
      payload: {
        label: newTodo,
        id: Math.ceil(Math.random() * 100),
      },
    });

  return (
    <>
      <input type="text" value={newTodo} onChange={handelNewTodo} />
      <button onClick={handelClick}>new</button>
    </>
  );
};

function Redux() {
  return (
    <div>
      todos
      <Todos />
      <InputTodos />
    </div>
  );
}

export default Redux;
