import {instance} from "@/common/instance";
import type {Todolist} from "@/features/todolists/api/todoListsApi.types";
import type {BaseResponse} from "@/common/types";

export const todoListApi = {
    getTodoLists() {
        return instance.get<Todolist[]>('/todo-lists')
    },
    createTodoList(title: string) {
       return instance.post<BaseResponse<{item: Todolist}>>('/todo-lists', {title})
    },
    deleteTodoList(id: string) {
        return  instance.delete<BaseResponse>(`/todo-lists/${id}`)
    },
    updateTodoListTitle({id, title}: {id: string, title: string}) {
        return instance.put<BaseResponse>(`/todo-lists/${id}`,{title})
    }
}