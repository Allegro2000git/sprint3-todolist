import type {RootState} from "../app/store";
import type {Todolist} from "../App";

export const selectTodolists = (state: RootState): Todolist[] => state.todoLists