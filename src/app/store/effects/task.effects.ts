import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { EMPTY, Observable } from "rxjs";
import { FirebaseService } from "src/app/firebase.service";
import { TaskActionTypes } from "../actions/task.actions";
import { map, mergeMap, catchError } from 'rxjs/operators';


@Injectable()
export class TaskEffects {

    // FETCH_TASK, retrieves tasks (of a user) from firebase and maps the tasks to the state 
    // action in mergeMap is user string
    loadTasks$ = createEffect (()=> this.actions$.pipe(
        ofType(TaskActionTypes.FETCH_TASK),
        mergeMap((action) => this.db.retrieveAllTasks(action)
          .pipe(
            map(tasks => ({ type: '[TASK] Fetch Task Success', payload: tasks })),
            catchError(() => EMPTY)
          ))
    ));

    // ADD_TASK, adds to firebase and maps new list to state
    // action in mergeMap is the new Task
    addTask$ = createEffect (()=> this.actions$.pipe(
        ofType(TaskActionTypes.ADD_TASK),
        mergeMap((action) => this.db.addTask(action)
        .pipe(
            map(tasks => ({ type: '[TASK] Fetch Task Success', payload: tasks })),
            catchError(() => EMPTY)
          ))
    ));

    // DELETE_TASK, delete task from firebase and maps new list to state
    // action in mergeMap is the deleted task
    deleteTask$ = createEffect (()=> this.actions$.pipe(
        ofType(TaskActionTypes.DELETE_TASK),
        mergeMap((action) => this.db.deleteTask(action)
        .pipe(
            map(tasks => ({ type: '[TASK] Fetch Task Success', payload: tasks })),
            catchError(() => EMPTY)
          ))
    ));

    // EDIT_TASK, update task in firebase and maps new list to state
    // action in mergeMap is the edited task
    editTask$ = createEffect (()=> this.actions$.pipe(
        ofType(TaskActionTypes.EDIT_TASK),
        mergeMap((action) => this.db.editTask(action)
        .pipe(
            map(tasks => ({ type: '[TASK] Fetch Task Success', payload: tasks })),
            catchError(() => EMPTY)
          ))
    ));

    constructor (
        private actions$: Actions, 
        private db: FirebaseService
    ) {}
}