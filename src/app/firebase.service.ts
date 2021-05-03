import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AddTaskAction, DeleteTaskAction, EditTaskAction, FetchTaskAction } from './store/actions/task.actions';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  tasks: Observable<any[]>;

  constructor(private db: AngularFirestore) { 
    this.tasks = this.db.collection('tasks').valueChanges({id: "id"});
  }

  // Retrieves all tasks (from a user) from firebase
  retrieveAllTasks(data: FetchTaskAction)
  {
    this.tasks = this.db.collection('tasks', ref => ref.where("user", '==', data.payload)).valueChanges();
    return this.tasks;
  }

  // Adds a new task and return the list of tasks
  addTask(data: AddTaskAction)
  {
    this.db.collection('tasks').add(data.payload);
    this.tasks = this.db.collection('tasks', ref => ref.where("user", '==', data.payload.user)).valueChanges();
    return this.tasks;
  }

  // Delete a task by finding the firebase document where document.id == task.id and returns the list of tasks
  deleteTask(data: DeleteTaskAction)
  {
    const query = this.db.collection('tasks', ref => ref.where("id", "==", data.payload.id));
    query.get().subscribe( query => {
      query.forEach(task => {
        task.ref.delete();
      })
    })
    this.tasks = this.db.collection('tasks', ref => ref.where("user", '==', data.payload.user)).valueChanges();
    return this.tasks;
  }

  // Updates a task by finding the firebase document where document.id == task.id and returns the list of tasks
  editTask (data: EditTaskAction)
  {
    const query = this.db.collection('tasks', ref => ref.where("id", "==", data.payload.id));
    query.get().subscribe( query => {
      query.forEach(task => {
        task.ref.set({
          checked: data.payload.checked,
          text: data.payload.text,
          id: data.payload.id,
          image: data.payload.image,
          user: data.payload.user,
          date: data.payload.date
        })
      })
    })
    this.tasks = this.db.collection('tasks', ref => ref.where("user", '==', data.payload.user)).valueChanges();
    return this.tasks;
  }
}
