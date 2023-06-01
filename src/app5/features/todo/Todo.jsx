import { useState } from "react";
import React from "react";
import { useGetTodosQuery, useAddTodosMutation } from "../api/apiSlice";
const Todo = () => {
  const [newTodo, setNewTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewTodo("");
  };
  let content;
  if (isLoading) {
    content = <p>LOADING..</p>;
  } else if (isSuccess) {
    content = JSON.stringify(todos);
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
