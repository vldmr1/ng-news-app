import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPageComponent } from './edit-page.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: EditPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class EditPageRoutingModule { }
