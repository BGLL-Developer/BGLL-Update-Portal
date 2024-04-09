import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotAddEditDialogComponent } from './jackpot-add-edit-dialog.component';

describe('JackpotAddEditDialogComponent', () => {
  let component: JackpotAddEditDialogComponent;
  let fixture: ComponentFixture<JackpotAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JackpotAddEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JackpotAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
