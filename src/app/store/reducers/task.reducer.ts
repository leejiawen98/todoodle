import { TaskAction, TaskActionTypes } from "../actions/task.actions";
import { Task } from "../models/task.model";

export interface TaskListState {
    tasks: Task[],
    loading: boolean // indicates loading while fetching data
}

const initialState: TaskListState = {
    tasks: [],
    loading: false
};

export function TaskReducer(state: TaskListState = initialState, action: TaskAction): TaskListState {
    switch(action.type){
        //Adds new task to state
        case TaskActionTypes.ADD_TASK:
            return {...state, tasks: [...state.tasks, action.payload]};

        //Get all tasks excluding "deleted" task and return state with the new list
        case TaskActionTypes.DELETE_TASK:
            return {tasks: state.tasks.filter(task => task.id != action.payload.id), loading: false};

        //Updates a task and returning a new state with the modified task
        case TaskActionTypes.EDIT_TASK:
            var index = state.tasks.findIndex(pred => pred.id == action.payload.id);
            const newState = [...state.tasks]
            newState[index] = action.payload;
            return {...state, tasks: newState};

        //Process the fetching
        case TaskActionTypes.FETCH_TASK:
            return {...state, loading: true};

        //Get all user's tasks
        case TaskActionTypes.FETCH_TASK_SUCCESS:
            return {tasks: action.payload, loading: false};

        default:
            return state;
    }
}