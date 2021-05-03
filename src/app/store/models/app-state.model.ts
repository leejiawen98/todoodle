import { TaskListState, TaskReducer } from "../reducers/task.reducer";
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    tasks: TaskListState;
}

export const reducers: ActionReducerMap<AppState, any> = {
    tasks: TaskReducer
};