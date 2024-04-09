import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryAddEditDialogComponent } from './lottery-add-edit-dialog.component';

describe('LotteryAddEditDialogComponent', () => {
  let component: LotteryAddEditDialogComponent;
  let fixture: ComponentFixture<LotteryAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LotteryAddEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LotteryAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
