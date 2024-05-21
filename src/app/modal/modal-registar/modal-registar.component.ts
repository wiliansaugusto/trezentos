import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-registar',
  templateUrl: './modal-registar.component.html',
  styleUrl: './modal-registar.component.css'
})
export class ModalRegistarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
