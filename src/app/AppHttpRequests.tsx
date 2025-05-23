import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import type { Todolist } from "@/features/todolists/api/todoListsApi.types"
import { todoListApi } from "@/features/todolists/api/todoListsApi"
import { tasksApi } from "@/features/todolists/api/tasksApi"
import { type DomainTask, TaskStatus, type UpdateTaskModel } from "@/features/todolists/api/tasksApi.types"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  useEffect(() => {
    todoListApi.getTodoLists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)
      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) => {
          setTasks((prevTasksState) => ({ ...prevTasksState, [todolist.id]: res.data.items }))
        })
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todoListApi.createTodoList(title).then((res) => {
      const newTodoList = res.data.data.item
      setTodolists([newTodoList, ...todolists])
    })
  }

  const deleteTodolist = (id: string) => {
    todoListApi.deleteTodoList(id).then(() => setTodolists(todolists.filter((todolist) => todolist.id !== id)))
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todoListApi
      .updateTodoListTitle({ id, title })
      .then(() => setTodolists(todolists.map((todolist) => (todolist.id === id ? { ...todolist, title } : todolist))))
  }

  /*----*/
  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      const newTask = res.data.data.item
      setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      startDate: task.startDate,
      deadline: task.deadline,
      priority: task.priority,
      status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
    }

    tasksApi.changeTaskStatus({ todolistId, taskId: task.id, model }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((el) => (el.id === task.id ? res.data.data.item : el)),
      })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId) })
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const todolistId = task.todoListId
    const model: UpdateTaskModel = {
      title,
      description: task.description,
      startDate: task.startDate,
      deadline: task.deadline,
      priority: task.priority,
      status: task.status,
    }

    tasksApi.changeTaskTitle({ todolistId, taskId: task.id, model }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? res.data.data.item : t)),
      })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map(({ id, title }) => (
        <div key={id} style={container}>
          <div>
            <EditableSpan value={title} onChange={(title) => changeTodolistTitle(id, title)} />
            <button onClick={() => deleteTodolist(id)}>x</button>
          </div>
          <CreateItemForm onCreateItem={(title) => createTask(id, title)} />
          {tasks[id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
