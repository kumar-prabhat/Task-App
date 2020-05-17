import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/Task';
import { CrudService } from '../../_services/crud.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { State } from '../../models/State';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  states: State[];
  constructor(
    private crudForTask: CrudService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.crudForTask.read_State().subscribe((data) => {
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

  RemoveTask(taskId) {
    this.crudForTask.delete_Task(taskId);
    this.alertify.success('Task deleted successfully');
  }

  EditTask(task) {
    task.isEdit = true;
    task.title = task.title;
    task.state = task.state;
    task.description = task.description;
    task.scheduledDate = task.scheduledDate;
  }

  UpdateTask(taskRow) {
    let task = {};
    task['title'] = taskRow.title;
    task['state'] = taskRow.state;
    task['description'] = taskRow.description;
    task['scheduledDate'] = taskRow.scheduledDate;

    this.crudForTask.update_Task(taskRow.id, task);
    taskRow.isEdit = false;
    this.alertify.success('Task updated successfully');
  }
}
