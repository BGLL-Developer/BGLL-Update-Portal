import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AEDialogComponent } from './aedialog.component';

describe('AEDialogComponent', () => {
  let component: AEDialogComponent;
  let fixture: ComponentFixture<AEDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AEDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AEDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
