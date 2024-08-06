import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { removeTodo } from "../state/todo/todoSlice";
import { editTodo } from "../state/todo/todoSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../state/Store";
import { completedTodo } from "../state/todo/todoSlice";
interface Props {
  text: string;
  id: number;
}
function Card({ text, id }: Props) {
  const list = useSelector((state: RootState) => state.todo.todos);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(text);
  const dispatch = useDispatch();
  const handleRemoveClick = () => {
    console.log(id);
    dispatch(removeTodo(id)); // Pass the id to removeTodo
  };
  const handelEdit = () => {
    setIsEdit(true);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(editTodo({ id, text: editText }));
      setIsEdit(false); // Hide the input box after saving
    }
  };
  const handelCheck = () => {
    dispatch(completedTodo(id));
    // console.log(isCompleted);
  }
  return (
    <div className="cards">
      <div className="box">
        {editText}
        <div className="btns">
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            style={{ background: "none" }}
            onClick={handelCheck}
          >
            {" "}
            <FaCheck
              className="check"
              style={{ background: "none", color: "green", fontSize: "1.2rem" }}
            />{" "}
          </motion.button>
          <motion.button
            style={{ color: "red", background: "none", fontSize: "1.2rem" }}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            value={id}
            onClick={handleRemoveClick}
          >
            {" "}
            <IoClose />{" "}
          </motion.button>
          <motion.button
            style={{ color: "black", background: "none", fontSize: "1.2rem" }}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={handelEdit}
          >
            {" "}
            <CiEdit />{" "}
          </motion.button>
        </div>
        <div>
          {isEdit ? (
            <input
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
              className="edit-input"
              onKeyDown={handleKeyPress}
            />
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
}
export default Card;
