import { describe, it, expect, beforeAll, afterAll, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AccueilView from '../AccueilView.vue'
import AccueilForm from '@/components/AccueilForm.vue';
import { setupServer } from 'msw/node';
import { getCharacters, getShips,  } from '../../../tests/mocks/AppServiceMock';
import { ships } from '../../../tests/data/ships';
import { createRouter, createWebHistory } from 'vue-router';
import routes from '@/router/routes';
import type { Ship } from '@/scripts/Types';

// Configuration du router identique à ton exemple original
const router = createRouter({
    history: createWebHistory(),
    routes : routes
  })


// Ici on est obligé de simuler l'api car sinon le formulaire ne charge pas.
const apiServer = setupServer(...getShips);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})

describe('AccueilView', () => {
    
    it("Doit contenir le formulaire pour commencer une partie.", async() => {
        // Arrange
        apiServer.use(getShips[0]);
        // Act
        const wrapper = mount(AccueilView);
        await flushPromises()
        // Assert
        expect(wrapper.findComponent(AccueilForm).exists()).toBeTruthy();
    });
});