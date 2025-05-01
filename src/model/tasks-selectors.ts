import type {RootState} from "../app/store";
import type {TasksState} from "../App";


export const selectTasks = (state: RootState): TasksState => state.tasks