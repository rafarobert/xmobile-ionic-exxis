import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SincronizarPage } from './sincronizar.page';

describe('SincronizarPage', () => {
  let component: SincronizarPage;
  let fixture: ComponentFixture<SincronizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SincronizarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SincronizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
