import type {Todolist} from '@/app/App'
import {CreateItemForm} from '@/common/components/createItemForm/CreateItemForm'
import {createTaskAC} from "@/features/todolists/model/tasks-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {TodoListTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodoListTitle/TodoListTitle";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks";

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {

  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({todolistId: todolist.id, title}))
  }

  return (
      <div>
        <TodoListTitle todolist={todolist}/>
        <CreateItemForm onCreateItem={createTask}/>
        <Tasks todolist={todolist}/>
        <FilterButtons todolist={todolist}/>
      </div>
  )
}
