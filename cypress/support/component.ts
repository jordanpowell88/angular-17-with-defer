// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { DeferBlockFixture, DeferBlockState } from '@angular/core/testing';
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { MountResponse, mount } from 'cypress/angular';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      defer(): Cypress.Chainable<DeferBlockFixture[]>;
      render(state: DeferBlockState): Cypress.Chainable<void>;
    }
  }
}

type MountParams = Parameters<typeof mount>;

Cypress.Commands.add('mount', mount);
Cypress.Commands.add(
  'defer',
  { prevSubject: true },
  (subject: MountResponse<MountParams>) => {
    const { fixture } = subject;
    return cy.wrap(fixture.getDeferBlocks());
  }
);

Cypress.Commands.add(
  'render',
  { prevSubject: true },
  (subject: DeferBlockFixture, state: DeferBlockState) => {
    cy.wrap(subject.render(state));
  }
);
