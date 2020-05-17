import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CrudService } from '../../_services/crud.service';
import { State } from '../../models/State';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  states: State[];
  taskForm: FormGroup;
  minDate: Date;
  constructor(
    private crud: CrudService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {
    this.minDate = new Date(Date.now.toString());
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [''],
      state: [''],
      description: [''],
      scheduledDate: [null],
    });
    this.crud.read_State().subscribe((data) => {
      this.states = data.map((e) => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          isEdit: false,
          description: e.payload.doc.data()['description'],
        };
      });
    });
  }

  onSubmit() {
    const task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      state: this.taskForm.value.state,
      scheduledDate: this.taskForm.value.scheduledDate,
    };

    this.crud
      .create_NewTask(task)
      .then((resp) => {
        this.taskForm.setValue({
          title: '',
          description: '',
          state: '',
          scheduledDate: null,
        });
        this.alertify.success('Task added successfully');
      })
      .catch((error) => {
        this.alertify.error('Task adding failed');
        console.log(error);
      });
  }
}
