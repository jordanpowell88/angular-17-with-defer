import { DeferBlockState } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('can mount', () => {
    cy.mount(AppComponent);
    cy.contains('p', 'outside defer');
    cy.contains('p', 'inside defer').should('not.exist');
  });

  it('renders inside the defer block', () => {
    cy.mount(AppComponent).defer().its(0).render(DeferBlockState.Complete);
    cy.contains('p', 'outside defer');
    cy.contains('p', 'inside defer');
  });

  it('renders inside the defer block after 5 seconds', () => {
    cy.mount(AppComponent).defer().its(1).render(DeferBlockState.Complete);
    cy.contains('p', 'outside defer');
    cy.contains('p', 'inside defer with condition');
  });
});