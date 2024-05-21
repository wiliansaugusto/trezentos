import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistarComponent } from './modal-registar.component';

describe('ModalRegistarComponent', () => {
  let component: ModalRegistarComponent;
  let fixture: ComponentFixture<ModalRegistarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRegistarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegistarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
