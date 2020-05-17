import { Component, OnInit, Input } from '@angular/core';
import { State } from '../../models/State';
import { CrudService } from '../../_services/crud.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-state-item',
  templateUrl: './state-item.component.html',
  styleUrls: ['./state-item.component.css'],
})
export class StateItemComponent implements OnInit {
  @Input() state: State;
  constructor(
    private crudForState: CrudService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  RemoveState(stateId) {
    this.crudForState.delete_State(stateId);
    this.alertify.success('State deleted successfully');
  }

  EditState(state) {
    state.isEdit = true;
    state.name = state.name;
    state.description = state.description;
  }

  UpdateState(stateRow) {
    let state = {};
    state['name'] = stateRow.name;
    state['description'] = stateRow.description;

    this.crudForState.update_State(stateRow.id, state);
    stateRow.isEdit = false;
    this.alertify.success('State updated successfully');
  }
}
