import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AccueilForm from '../AccueilForm.vue'

import { setupServer } from 'msw/node'
import { getShips, networkError } from '../../../tests/mocks/AppServiceMock'
import { afterEach } from 'node:test'
import { defineComponent } from 'vue'
import {ships} from '../../../tests/data/ships'
import { createRouter, createWebHistory, useRouter } from 'vue-router'
import routes from '@/router/routes'
import router from '@/router'

// Pour encadrer notre composent dans un <Suspense>
const testComponent = defineComponent({
    components: { AccueilForm },
    template : '<Suspense><AccueilForm/></Suspense>'
})

const apiServer = setupServer(...getShips);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})


describe('AccueilForm', () => {

    it('Doit afficher un champ de texte pour le nom du joueur.', () => {
        // Arrange - Act
        const wrapper = mount(AccueilForm);
        // Assert
        expect(wrapper.find('input[type="text"]')).toBeTruthy();
    })

    it('Doit afficher la liste des vaisseaux disponible.', async() => {
        // Arrange - Act
        const wrapper = mount(testComponent)
        await flushPromises();

        // Assert
        expect(wrapper.findAll('option').length).toBe(ships.length);
        expect(wrapper.text()).toContain(ships[0].name);
        expect(wrapper.text()).toContain(ships[1].name);
        expect(wrapper.text()).toContain(ships[2].name);
    })

    it('Doit afficher une erreur si le champ name est vide lors du click sur le bouton.', async() => {
      // Arrange
      const wrapper = mount(testComponent)
      await flushPromises();
      const button = wrapper.findComponent(AccueilForm).find('button[type="button"]');

      // Act
      await button.trigger('click')

      // Assert
      expect(wrapper.text()).toContain('Le nom du joueur est obligatoire.');
    })

    it('Doit afficher une erreur si aucun ship est selectionné lors du click sur le bouton.', async() => {
      // Arrange
      const wrapper = mount(testComponent)
      await flushPromises();
      const button = wrapper.findComponent(AccueilForm).find('button[type="button"]');

      // Act
      await button.trigger('click')

      // Assert
      expect(wrapper.text()).toContain('Veuillez choisir un vaisseau.');
    })

    it("Doit emit @loading-error si l'api ne répond pas.",async() => {
        // Arrange
        apiServer.use(networkError[0])

        // Act
        const wrapper = mount(testComponent);
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(AccueilForm).emitted('loading-error')).toBeTruthy();
    })
})

