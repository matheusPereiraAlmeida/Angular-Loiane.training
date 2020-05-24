import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { BsModalRef } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [AlertModalComponent, ConfirmModalComponent],
  exports: [AlertModalComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [AlertModalComponent, ConfirmModalComponent]
})
export class SharedModule { }
