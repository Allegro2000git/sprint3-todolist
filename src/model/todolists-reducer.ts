import type {FilterValues, Todolist} from '../App'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{todolistId: string}>('todolists/deleteTodolist')
export const changeTodolistTitleAC = createAction<{todolistId: string, title: string}>('todolists/changeTodolistTitle')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
  return {payload:{id: nanoid(), title}}
})
export const changeTodolistFilterAC = createAction<{todolistId: string, filter: FilterValues}>('todolists/changeTodolistFilter')


export const todolistsReducer = createReducer(initialState, builder => {
  builder
      .addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state.splice(index, 1)
        }
    })
      .addCase(changeTodolistTitleAC, (state, action) => {
        const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
        if (todolist) {
          todolist.title = action.payload.title
        }
    })
      .addCase(changeTodolistFilterAC, (state, action) => {
        const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }
    })
      .addCase(createTodolistAC, (state, action) => {
        const newTodolist: Todolist = {...action.payload, filter: "all"}
        state.push(newTodolist)
      })
})
