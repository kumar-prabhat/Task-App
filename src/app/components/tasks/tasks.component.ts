import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { CrudService } from '../../_services/crud.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;
  state: string;
  description: string;
  scheduledDate: Date;
  limitNumber: number = 5;

  constructor(private crudForTask: CrudService) {}

  ngOnInit(): void {
    this.getData(this.limitNumber);
  }

  showMore() {
    this.limitNumber += 5;
    this.getData(this.limitNumber);
  }
  getData(number: number) {
    this.crudForTask.read_Tasks(number).subscribe((data) => {
      this.tasks = data.map((e) => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          isEdit: false,
          state: e.payload.doc.data()['state'],
          description: e.payload.doc.data()['description'],
          scheduledDate: e.payload.doc.data()['scheduledDate'],
        };
      });
    });
  }
}
