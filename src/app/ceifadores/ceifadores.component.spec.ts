import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeifadoresComponent } from './ceifadores.component';

describe('CeifadoresComponent', () => {
  let component: CeifadoresComponent;
  let fixture: ComponentFixture<CeifadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CeifadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeifadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
