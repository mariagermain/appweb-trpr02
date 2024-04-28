import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AccueilForm from '../AccueilForm.vue'

import { setupServer } from 'msw/node'
import { getShips, networkError } from '../../../tests/mocks/AppServiceMock'
import { afterEach } from 'node:test'
import { defineComponent } from 'vue'
import {ships} from '../../../tests/data/ships'

// Pour encadrer notre composant dans un <Suspense>
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

    it('Doit emit submit-form si le formulaire est bien rempli.', async () => {
        // Arrange
        const ANY_USERNAME = "username";
        const ANY_SHIP = ships[0];
        const wrapper = mount(testComponent)
        await flushPromises();
        await wrapper.find('input[type="text"]').setValue(ANY_USERNAME) //on met une valeur dans le input du username
        await wrapper.findComponent(AccueilForm).find('select').setValue(ANY_SHIP) // on force une valeur de ship au select
        const button = wrapper.findComponent(AccueilForm).find('button[type="button"]');

        // Act
        await button.trigger('click') 

        // Assert
        expect(wrapper.findComponent(AccueilForm).emitted('submit-form')).toBeTruthy();
    })

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
      const ANY_SHIP = ships[0];
      const wrapper = mount(testComponent)
      await flushPromises();
      wrapper.find('select').setValue(ANY_SHIP) // on force une valeur de ship au select
      const button = wrapper.findComponent(AccueilForm).find('button[type="button"]');
      // Act
      await button.trigger('click')

      // Assert
      expect(wrapper.text()).toContain('Le nom du joueur est obligatoire.');
    })

    it('Doit afficher une erreur si aucun ship est selectionné lors du click sur le bouton.', async() => {
      // Arrange
      const ANY_USERNAME = "username";
      const wrapper = mount(testComponent)
      await flushPromises();
      wrapper.find('input[type="text"]').setValue(ANY_USERNAME) //on met une valeur dans le input du username
      const button = wrapper.findComponent(AccueilForm).find('button[type="button"]');

      // Act
      await button.trigger('click')

      // Assert
      expect(wrapper.text()).toContain('Veuillez choisir un vaisseau.');
    })

    it('Doit afficher les erreurs si aucun username est entré et aucun ship est selectionné lors du click sur le bouton.', async() => {
        // Arrange
        const wrapper = mount(testComponent)
        await flushPromises();
        const button = wrapper.findComponent(AccueilForm).find('button[type="button"]');
  
        // Act
        await button.trigger('click')
  
        // Assert
        expect(wrapper.text()).toContain('Le nom du joueur est obligatoire.');
        expect(wrapper.text()).toContain('Veuillez choisir un vaisseau.');
    })

    it("Doit emit @loading-error si l'api ne répond pas.", async() => {
        // Arrange
        apiServer.use(networkError[0])

        // Act
        const wrapper = mount(testComponent);
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(AccueilForm).emitted('loading-error')).toBeTruthy();
    })
})

