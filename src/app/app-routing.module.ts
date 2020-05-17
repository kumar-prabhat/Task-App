import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { StateComponent } from './components/state/state.component';
import { AddStateComponent } from './components/add-state/add-state.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'allstates', component: StateComponent },
  { path: 'addstate', component: AddStateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
