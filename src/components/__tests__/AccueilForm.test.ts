import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AccueilForm from '../AccueilForm.vue'

import { setupServer } from 'msw/node'
import { getShips, networkError } from '../../../tests/mocks/AppServiceMock'
import { afterEach } from 'node:test'
import { defineComponent } from 'vue'
import {ships} from '../../../tests/data/ships'

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

