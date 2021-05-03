import { Action } from '@ngrx/store'
import { Task } from '../models/task.model'

export enum TaskActionTypes {
    ADD_TASK = '[TASK] Add Task',
    DELETE_TASK = '[TASK] Delete Task',
    EDIT_TASK = '[TASK] Edit Task',
    FETCH_TASK = '[TASK] Fetch Task',
    FETCH_TASK_SUCCESS = '[TASK] Fetch Task Success'
}

export class AddTaskAction implements Action {
    readonly type = TaskActionTypes.ADD_TASK;
    constructor(public payload: Task) {}
}

export class DeleteTaskAction implements Action {
    readonly type = TaskActionTypes.DELETE_TASK;
    constructor(public payload: Task) {}
}

export class EditTaskAction implements Action {
    readonly type = TaskActionTypes.EDIT_TASK;
    constructor(public payload: Task) {}
}

//Takes in user name to fetch the associated tasks
export class FetchTaskAction implements Action {
    readonly type = TaskActionTypes.FETCH_TASK;
    constructor(public payload: string) {} 
}

//Returns user's list of tasks
export class FetchTaskActionSuccess implements Action {
    readonly type = TaskActionTypes.FETCH_TASK_SUCCESS;
    constructor(public payload: Task[]) {}
}

export type TaskAction = AddTaskAction | DeleteTaskAction | EditTaskAction | FetchTaskAction | FetchTaskActionSuccess