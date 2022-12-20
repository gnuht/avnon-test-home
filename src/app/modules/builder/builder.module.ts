import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ModalComponent } from './modal/modal.component';
import {RouterModule, Routes} from "@angular/router";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
  }
]

@NgModule({
  declarations: [
    FormComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzFormModule,
    FormsModule,
    NzButtonModule
  ]
})
export class BuilderModule { }
