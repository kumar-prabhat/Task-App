import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../_services/crud.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css'],
})
export class AddStateComponent implements OnInit {
  stateForm: FormGroup;
  constructor(
    private crusForState: CrudService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.stateForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    const state = {
      name: this.stateForm.value.name,
      description: this.stateForm.value.description,
    };

    this.crusForState
      .create_NewState(state)
      .then(() => {
        this.stateForm.setValue({
          name: '',
          description: '',
        });
        this.alertify.success('State added successfully');
      })
      .catch((error) => {
        this.alertify.error('State adding failed');

        console.log(error);
      });
  }
}
