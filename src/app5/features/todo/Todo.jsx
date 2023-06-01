import { useState } from "react";
import React from "react";
import {
  useGetTodosQuery,
  useAddTodosMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";
const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodosMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };
  let content;
  if (isLoading) {
    content = <p>LOADING..</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          ></input>
          <label htmlFor={todo.id}>{todo.title}</label>
          <button onClick={() => deleteTodo({ id: todo.id })}>DELETE</button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }
  const newItem = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newtodo">ENTER A NEW TODO</label>
      <input
        type="text"
        id="newtodo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="ENTER NEW TODO"
      ></input>
      <button className="submit">SUBMIT</button>
    </form>
  );
  return (
    <>
      {newItem}
      {content}
    </>
  );
};

export default Todo;
