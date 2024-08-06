import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Style.css";
import Card from "./Card";

interface Todo {
  id: number;
  completed: boolean;
  text: string;
}

interface ShowProps {
  text: Todo[];
}

function Show({ text }: ShowProps) {
  const [isShow, setIsShow] = useState("active");

  // Filter the todos based on the current filter
  const filteredTodos = text.filter((item) => {
    if (isShow === "active") {
      return !item.completed;
    }
    if (isShow === "completed") {
      return item.completed;
    }
    return true; // 'all' case
  });

  return (
    <div>
      <div className="show">
        <motion.button
          className="show_btn"
          id="active"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsShow("active")}
        >
          Active
        </motion.button>
        <motion.button
          className="show_btn"
          id="completed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsShow("completed")}
        >
          Completed
        </motion.button>
        <motion.button
          className="show_btn"
          id="all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsShow("all")}
        >
          All
        </motion.button>
      </div>
      <br />
      <div className="all-cards">
        <AnimatePresence>
          {filteredTodos.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}  
              exit={{ opacity: 0, x: -100 }}  
              transition={{ duration: 0.3 }}
            >
              <Card text={item.text} id={item.id} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Show;
