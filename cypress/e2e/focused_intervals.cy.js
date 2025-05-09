/* eslint-disable cypress/no-unnecessary-waiting */

import { getByTestId } from '../support/getByTestId'

describe('Focused intervals', () => {
  describe('when no temporal range exists', () => {
    beforeEach(() => {
      cy.visit('/empty')
      cy.wait(200)
    })

    it('clicking an interval at the bottom selects it as the focused interval', () => {
      // Click on a timeline interval bottom
      getByTestId('timelineInterval-31').trigger('click')

      getByTestId('focusedStart').should('have.text', 'Start: 2021-01-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2021-01-31T23:59:59.999Z')
    })

    it('clicking an interval in the middle does not select it as the focused interval', () => {
      // Click in the middle of the timeline list
      getByTestId('timelineList').trigger('click')

      getByTestId('focusedStart').should('have.text', 'Start: null')
      getByTestId('focusedEnd').should('have.text', 'End: null')
    })

    it('clicking a focused interval removes focus', () => {
      // Click on a timeline interval bottom
      getByTestId('timelineInterval-31').trigger('click')
      getByTestId('timelineInterval-31').trigger('click')

      getByTestId('timelineInterval-31').parent().should('not.have.class', 'edsc-timeline-interval--is-focused')
    })
  })

  describe('when a temporal range exists', () => {
    beforeEach(() => {
      cy.visit('/temporalRange')
      cy.wait(200)
    })

    it('clicking an interval at the bottom selects it as the focused interval', () => {
      // Click on a timeline interval bottom
      // force: true - force the click to happen through the temporal range
      getByTestId('timelineInterval-31').trigger('click', { force: true })

      getByTestId('focusedStart').should('have.text', 'Start: 2021-01-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2021-01-31T23:59:59.999Z')
    })

    it('clicking an interval outside the temporal range does not select it as the focused interval', () => {
      // Click on a timeline interval bottom that is outside the temporal range
      getByTestId('timelineInterval-30').trigger('click')

      getByTestId('focusedStart').should('have.text', 'Start: null')
      getByTestId('focusedEnd').should('have.text', 'End: null')
    })

    it('clicking an interval in the middle does not select it as the focused interval', () => {
      // Click in the middle of the timeline list
      getByTestId('timelineList').trigger('click')

      getByTestId('focusedStart').should('have.text', 'Start: null')
      getByTestId('focusedEnd').should('have.text', 'End: null')
    })

    it('selects the correct interval when pressing the left arrow button', () => {
      // Click on a timeline interval bottom
      // force: true - force the click to happen through the temporal range
      getByTestId('timelineInterval-31').trigger('click', { force: true })

      getByTestId('focusedStart').should('have.text', 'Start: 2021-01-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2021-01-31T23:59:59.999Z')

      getByTestId('timeline').type('{leftArrow}')

      getByTestId('focusedStart').should('have.text', 'Start: 2020-12-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2020-12-31T23:59:59.999Z')
    })

    it('selects the correct interval when pressing the right arrow button', () => {
      // Click on a timeline interval bottom
      // force: true - force the click to happen through the temporal range
      getByTestId('timelineInterval-32').trigger('click', { force: true })

      getByTestId('focusedStart').should('have.text', 'Start: 2020-12-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2020-12-31T23:59:59.999Z')

      getByTestId('timeline').type('{rightArrow}')

      getByTestId('focusedStart').should('have.text', 'Start: 2021-01-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2021-01-31T23:59:59.999Z')
    })

    it('selects the correct interval when pressing the focus previous button', () => {
      // Click on a timeline interval bottom
      // force: true - force the click to happen through the temporal range
      getByTestId('timelineInterval-31').trigger('click', { force: true })

      getByTestId('focusedStart').should('have.text', 'Start: 2021-01-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2021-01-31T23:59:59.999Z')

      getByTestId('focusPrevious').click()

      getByTestId('focusedStart').should('have.text', 'Start: 2020-12-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2020-12-31T23:59:59.999Z')
    })

    it('selects the correct interval when pressing the focus next button', () => {
      // Click on a timeline interval bottom
      // force: true - force the click to happen through the temporal range
      getByTestId('timelineInterval-32').trigger('click', { force: true })

      getByTestId('focusedStart').should('have.text', 'Start: 2020-12-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2020-12-31T23:59:59.999Z')

      getByTestId('focusNext').click()

      getByTestId('focusedStart').should('have.text', 'Start: 2021-01-01T00:00:00.000Z')
      getByTestId('focusedEnd').should('have.text', 'End: 2021-01-31T23:59:59.999Z')
    })
  })

  describe('with no temporal range selected', () => {
    it('loads new intervals when needed when clicking the next button', () => {
      cy.visit('/empty')
      cy.wait(200)
      // Click on a timeline interval bottom
      // force: true - force the click to happen through the temporal range
      getByTestId('timelineInterval-32').trigger('click', { force: true })

      cy.get('[data-testid*="timelineInterval"]').should('have.length', 122)

      getByTestId('focusNext').click()
      getByTestId('focusNext').click()
      getByTestId('focusNext').click()
      getByTestId('focusNext').click()

      cy.get('[data-testid*="timelineInterval"]').should('have.length', 182)
    })
  })
})
