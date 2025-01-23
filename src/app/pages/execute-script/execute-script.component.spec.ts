/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExecuteScriptComponent } from './execute-script.component';

describe('ExecuteScriptComponent', () => {
  let component: ExecuteScriptComponent;
  let fixture: ComponentFixture<ExecuteScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecuteScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
