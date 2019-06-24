import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaproductoPage } from './listaproducto.page';

describe('ListaproductoPage', () => {
  let component: ListaproductoPage;
  let fixture: ComponentFixture<ListaproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaproductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
