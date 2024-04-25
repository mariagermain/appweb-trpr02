import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AccueilForm from '../AccueilForm.vue'

import { setupServer } from 'msw/node'
import { getShips, networkError } from '../../../tests/mocks/AppServiceMock'
import { afterEach } from 'node:test'
import { defineComponent } from 'vue'
import {ships} from '../../../tests/data/ships'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

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

<<<<<<< Updated upstream
=======
})

const router = createRouter({
    history: createWebHistory(),
    routes : routes
})
describe('Routes', () => {

    it('Doit pouvoir naviguer sur la page des publications.', async () => {
      router.push('/') // S'assurer de commencer avec une route connue
      await router.isReady() // Attendre que le routeur soit prêt
  
      const wrapper = mount(AccueilForm, {
          global: {
            plugins: [router]
          }
      })
  
      const routerSpy = vi.spyOn(router, 'push')
  
      // Trouver le lien par son texte et simuler un clic
      const linkPostsEl = wrapper.find('#publications') // Adapter le sélecteur selon ton besoin
      await linkPostsEl.trigger('click')
  
      expect(routerSpy).toHaveBeenCalledWith('/')
    })
  
    it('Doit pouvoir naviguer sur la page à propos.', async () => {
      router.push('/') // Reset la route au début de chaque test
      await router.isReady()
  
      const wrapper = mount(AccueilForm, {
          global: {
            plugins: [router]
          }
      })
  
      const routerSpy = vi.spyOn(router, 'push')
  
      const linkAboutEl = wrapper.find('#apropos') // Adapter le sélecteur selon ton besoin
      await linkAboutEl.trigger('click')
  
      expect(routerSpy).toHaveBeenCalledWith({ name: 'About' })
    })
  })
>>>>>>> Stashed changes
