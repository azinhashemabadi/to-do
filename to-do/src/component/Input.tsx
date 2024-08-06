import React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { GoPlus } from "react-icons/go";
import "./Style.css";
import { addTodo } from "../state/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/Store";

import Show from "./Show";
import Card from "./Card";
import { text } from "node:stream/consumers";
interface Props {
  todo: string;
}
function Input({ todo }: Props) {
  const [toDo, setToDo] = useState("");
  const list = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setToDo(e.target.value);
  };
  const handelClick = () => {
    if (toDo.trim() !== "") {
      dispatch(addTodo(toDo));
      setToDo("");
    } else {
      alert("Input is empty");
    }
  };
  return (
    <div className="Input-css">
      <h1 className="todo">Todo App</h1>
      <br/>
      <br/>
      <div className="input-button">
        <input
          className="todo-input"
          type="text"
          value={toDo}
          onChange={(e) => inputHandler(e)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="add-input"
          onClick={handelClick}
        >
          <GoPlus className="plus" />
        </motion.button>
        {/* {newCard===true && (
        <Card text={list}/>
      )} */}
      </div>
      <br/>
      <Show text={list}/>
      <br/>
      {/* {list.map((item, index) => (
        <Card key={index} text={item.text} id={item.id} />
      ))} */}
    </div>
  );
}

export default Input;
