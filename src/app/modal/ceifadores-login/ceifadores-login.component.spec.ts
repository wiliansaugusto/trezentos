import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeifadoresLoginComponent } from './ceifadores-login.component';

describe('CeifadoresLoginComponent', () => {
  let component: CeifadoresLoginComponent;
  let fixture: ComponentFixture<CeifadoresLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CeifadoresLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeifadoresLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
