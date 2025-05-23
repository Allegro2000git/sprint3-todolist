import { EditableSpan } from "@/common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleAC, deleteTodolistAC, type Todolist } from "@/features/todolists/model/todolists-reducer"
import { useAppDispatch } from "@/common/hooks"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: Todolist
}

export const TodoListTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({ todolistId: id }))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({ todolistId: id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
