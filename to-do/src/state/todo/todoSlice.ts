import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { todo } from "node:test";

interface todoSlice {
    //todos: string[];
    todos: { id: number; text: string; completed: boolean }[];
}
const initialState: todoSlice = {
    todos: [],
}
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(({ id: Date.now(), text: action.payload, completed: false }));
            // console.log(todo);
            return state;

        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((item) => item.id !== action.payload);
            return state;
        },
        editTodo: (state, action) => {

        },
        completedTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.map((item) =>
                item.id === action.payload ? { ...item, completed: true } : item
            );
        },

    }
})
export const { addTodo, removeTodo, editTodo,completedTodo } = todoSlice.actions;
export default todoSlice.reducer;