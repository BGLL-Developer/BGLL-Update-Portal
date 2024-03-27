import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAgentDialogComponent } from './add-edit-agent-dialog.component';

describe('AddEditAgentDialogComponent', () => {
  let component: AddEditAgentDialogComponent;
  let fixture: ComponentFixture<AddEditAgentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditAgentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditAgentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
