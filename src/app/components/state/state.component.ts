import { Component, OnInit } from '@angular/core';
import { State } from '../../models/State';
import { CrudService } from '../../_services/crud.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent implements OnInit {
  states: State[];
  name: string;
  description: string;

  constructor(private crudForState: CrudService) {}

  ngOnInit(): void {
    this.crudForState.read_State().subscribe((data) => {
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
}
