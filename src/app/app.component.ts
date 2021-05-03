import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { NgxImageCompressService } from 'ngx-image-compress';

import { Task } from './store/models/task.model';
import { AppState } from './store/models/app-state.model';
import { AddTaskAction, DeleteTaskAction, EditTaskAction, FetchTaskAction } from './store/actions/task.actions';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todoodle';

  taskState!: Observable<Array<Task>>;
  newTask: Task;
  selected: boolean;
  user: string;
  loading!: Observable<boolean>;

  constructor(private store: Store<AppState>, public dialog: MatDialog, private imageCompress: NgxImageCompressService) {
    this.newTask = { 
      id: '',
      text: '',
      checked: false,
      image: false,
      user: '',
      date: undefined
    }
    this.selected = false;
    this.user = '';
  }

  ngOnInit() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: {user: this.user} //pass user to dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result; //inputted user from dialog
      this.store.dispatch(new FetchTaskAction(this.user)); //call action
      this.taskState = this.store.select(store => store.tasks.tasks); //retrieves the list of tasks
      this.loading = this.store.select(store => store.tasks.loading); //retrieves the loading=false for spinner
    });
  }

  resetNewTask()
  {
    this.newTask = { 
      id: '',
      text: '',
      checked: false,
      image: false,
      user: this.user,
      date: undefined
    }
  }

  addTask(addTaskForm: NgForm)
  {
    if (addTaskForm.valid && this.newTask.text != "")
    {
      this.newTask.user = this.user;
      this.newTask.id = uuid(); //generates unique ID
      this.newTask.date = new Date; //current date/time
      this.store.dispatch(new AddTaskAction(this.newTask));
      this.resetNewTask();
    }
  }

  deleteTask(task: Task)
  {
    this.store.dispatch(new DeleteTaskAction(task));
  }

  // Change in task's text will trigger this function to update the task in state/firebase
  updateTask(event: any, task: Task)
  {
    this.newTask = { 
      id: task.id,
      text: event.target.value,
      checked: task.checked,
      image: task.image,
      user: task.user,
      date: task.date
    }
    this.store.dispatch(new EditTaskAction(this.newTask));
    this.taskState = this.store.select(store => store.tasks.tasks); //retrieves the new list
    this.resetNewTask();
  }

  // Checking a task will trigger this function to update the task in state/firebase
  checkTask(event:any, task: Task) {
    this.newTask = { 
      id: task.id,
      text: task.text,
      checked: event.checked,
      image: task.image,
      user: task.user,
      date: task.date
    }
    this.store.dispatch(new EditTaskAction(this.newTask));
    this.taskState = this.store.select(store => store.tasks.tasks);
    this.resetNewTask();
  }

  // Hides add input and displays file upload input
  toggleImage()
  {
    if (this.selected)
      this.selected = false;
    else
      this.selected = true;
    this.resetNewTask();
  }

  // Upload image as task
  async fileUpload(event: any)
  {
    const file:File = event.target.files[0]; // uploaded file
    const img = await this.readImage(file);
    this.newTask.text = await this.compressImage(img);
    this.newTask.image = true;
    this.newTask.id = uuid();
    this.newTask.date = new Date;
    this.store.dispatch(new AddTaskAction(this.newTask));
    this.resetNewTask();
    this.selected = false; // reset input view to add task text
  }

  // Convert image file to base64 string
  readImage(file: File): any
  {
    return new Promise((resolve, reject) => {
      var FR = new FileReader();    
      FR.readAsDataURL(file);
      FR.onload = function (event) {
        resolve(event.target?.result?.toString());
      }
    })
  }

  // Compress image file for smaller base64 string
  compressImage(image: string): any
  {
    return new Promise((resolve, reject) => {
      this.imageCompress.compressFile(image, -1, 50, 50).then(result => {
        resolve(result);
      })
    })
  }
}
