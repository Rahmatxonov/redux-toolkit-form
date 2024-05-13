import React, { useState } from "react";
import {
  useAddTodosMutation,
  useDeleteTodosMutation,
  useGetAllTodosQuery,
  useUpdateTodosMutation,
} from "../store";
import "./Create.css";

const CreatePage = () => {
  const {
    data: todosData = [],
    isFetching,
    isError,
    error,
  } = useGetAllTodosQuery();
  const [addTodoMutation] = useAddTodosMutation();
  const [deleteTodoMutation] = useDeleteTodosMutation();
  const [updateTodos] = useUpdateTodosMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [letUpdate, setLetUpdate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoData = {
      firstName,
      lastName,
      email,
      birthdate,
      password,
    };

    if (letUpdate) {
      await updateTodos(todoData);
      setLetUpdate(false);
    } else {
      await addTodoMutation(todoData);
      setFirstName("");
      setLastName("");
      setEmail("");
      setBirthdate("");
      setPassword("");
    }
  };

  const handleDelete = async (id) => {
    await deleteTodoMutation(id);
  };

  const handleUpdate = (id) => {
    const updatedData = todosData.find((item) => item.id === id);
    setFirstName(updatedData.firstName);
    setLastName(updatedData.lastName);
    setEmail(updatedData.email);
    setBirthdate(updatedData.birthdate);
    setPassword(updatedData.password);

    setLetUpdate(true);
  };

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="px-7 h-[600px] grid justify-center items-center "
      >
        <div className="grid gap-6" id="form">
          <div className="w-full flex gap-3">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-md capitalize shadow-2xl p-3 ex w-full outline-none focus:border-solid focus:border-[1px] border-[#035ec5] placeholder:text-black"
              type="text"
              placeholder="First Name"
              id="First-Name"
              value={firstName}
              name="First-Name"
              required
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-md p-3 capitalize shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
              type="text"
              placeholder="Last Name"
              id="Last-Name"
              value={lastName}
              name="Last-Name"
            />
          </div>
          <div className="rounded-md grid gap-6 w-full">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md p-3 shadow-2xl  glass w-full placeholder:text-black outline-none focus:border-solid border-[#035ec5] focus:border-[1px]"
              type="email"
              placeholder="Email"
              id="Email"
              value={email}
              name="email"
            />
            <input
              onChange={(e) => setBirthdate(e.target.value)}
              className="rounded-md p-3 shadow-2xl   glass w-full text-black outline-none focus:border-solid focus:border-[1px]border-[#035ec5]"
              type="date"
              required
              value={birthdate}
            />
          </div>
          <div className="flex gap-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md p-3 glass shadow-2xl  w-full placeholder:text-black outline-none focus:border-solid focus:border-[1px] border-[#035ec5]"
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              name="password"
              required
            />
          </div>
          <button
            className="rounded-md outline-none glass shadow-2xl  w-full p-3  bg-[#ffffff42] hover:border-[#035ec5] hover:border-solid hover:border-[1px]  hover:text-[#035ec5] font-bold"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="container flex gap-5 flex-wrap justify-center">
        {todosData.map((item) => (
          <div className="bg-yellow-300 w-[300px] p-5 rounded-md" key={item.id}>
            <p>LastName: {item.lastName}</p>
            <p>FirstName: {item.firstName}</p>
            <p>Email: {item.email}</p>
            <p>Birthdate: {item.birthdate}</p>
            <p className="pb-10">Password: {item.password}</p>
            <span className="button-group space-x-3">
              <button
                onClick={() => handleUpdate(item.id)}
                className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg p-3"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white hover:bg-red-600 rounded-lg p-3"
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default CreatePage;
