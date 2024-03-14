import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoledoComponent } from './boledo.component';

describe('BoledoComponent', () => {
  let component: BoledoComponent;
  let fixture: ComponentFixture<BoledoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoledoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoledoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
