import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalproductosPage } from './modalproductos.page';

describe('ModalproductosPage', () => {
  let component: ModalproductosPage;
  let fixture: ComponentFixture<ModalproductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalproductosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
