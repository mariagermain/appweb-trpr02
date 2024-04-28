import routes from "@/router/routes";
import { describe, expect, it, vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import NavBar from "../NavBar.vue";
import { mount } from "@vue/test-utils";


describe('NavBar', () => {
    
    const router = createRouter({
        history: createWebHistory(),
        routes : routes
    })


    it('Doit naviguer sur la page Accueil', async() => {
        router.push('/') // Reset la route au début de chaque test
        await router.isReady()
        const routerSpy = vi.spyOn(router, 'push')
        const wrapper = mount(NavBar, {
            global: {
              plugins: [router]
            }
        })

        const linkToHome = wrapper.find('#homePage') // Adapter le sélecteur selon ton besoin
        await linkToHome.trigger('click')

        expect(routerSpy).toHaveBeenCalledWith('/')
    })

    it('Doit naviguer sur la page des scores', async() => {
        router.push('/') // Reset la route au début de chaque test
        await router.isReady()
        const routerSpy = vi.spyOn(router, 'push')
        const wrapper = mount(NavBar, {
            global: {
              plugins: [router]
            }
        })

        const linkToScore = wrapper.find('#scorePage') // Adapter le sélecteur selon ton besoin
        await linkToScore.trigger('click')

        expect(routerSpy).toHaveBeenCalledWith('/score')
    })
})