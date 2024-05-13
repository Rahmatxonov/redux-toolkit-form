import React, { useState } from "react";
import { useDeleteTodosMutation, useGetAllTodosQuery } from "../store";

const DeletePage = () => {
  const {
    data: todos = [],
    isFetching,
    isError,
    error,
  } = useGetAllTodosQuery();
  const [deleteTodos] = useDeleteTodosMutation();
  const [todoIdToDelete, setTodoIdToDelete] = useState("");

  const handleDelete = async (id) => {
    try {
      await deleteTodos(id);
      setTodoIdToDelete("");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>DeletePage</h1>
      <ul>
        {todos.map((todo) => (
          <li className="bg-green-200 m-5 p-5" key={todo.id}>
            {todo.firstName} {todo.lastName}{" "}
            <button
              className="bg-red-600"
              onClick={() => handleDelete(todo.id)}
            >
              Delete Todo
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePage;
