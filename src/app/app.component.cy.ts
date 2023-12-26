import { DeferBlockState } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('can mount', () => {
    cy.mount(AppComponent);
    cy.contains('p', 'outside defer');
    cy.contains('p', 'inside defer').should('not.exist');
    cy.contains('p', 'inside defer with condition').should('not.exist');
  });

  it('renders inside the defer block', () => {
    cy.mount(AppComponent).defer().its(0).render(DeferBlockState.Complete);
    cy.contains('p', 'outside defer');
    cy.contains('p', 'inside defer');
  });

  it('renders inside the defer block with a condition', () => {
    cy.mount(AppComponent).defer().its(1).render(DeferBlockState.Complete);
    cy.contains('p', 'outside defer');
    cy.contains('p', 'inside defer with condition');
  });

  it('renders all defer blocks using renderAll()', () => {
    cy.mount(AppComponent).defer().renderAll(DeferBlockState.Complete);
    cy.contains('p', 'outside defer');
    cy.contains('p', 'inside defer');
    cy.contains('p', 'inside defer with condition');
  });
});
