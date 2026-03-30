import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { People } from './components/people/people';
import { Relationships } from './components/relationships/relationships';
import { Records } from './components/records/records';
import { ValidationReport } from './components/validation-report/validation-report';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'people', component: People },
  { path: 'relationships', component: Relationships },
  { path: 'records', component: Records },
  { path: 'validation-report', component: ValidationReport }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
