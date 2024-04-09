import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoledoAddEditDialogComponent } from './boledo-add-edit-dialog.component';

describe('BoledoAddEditDialogComponent', () => {
  let component: BoledoAddEditDialogComponent;
  let fixture: ComponentFixture<BoledoAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoledoAddEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoledoAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
