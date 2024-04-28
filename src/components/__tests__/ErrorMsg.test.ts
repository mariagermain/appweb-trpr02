import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ErrorMsg from '../ErrorMsg.vue'

describe("ErrorMsg", () => {

    it("Doit afficher le message d'erreur", () => {
        // Arrange - Act
        const ANY_MESSAGE:string = "MESSAGE";
        const wrapper = mount(ErrorMsg, {props:{message:ANY_MESSAGE, show:true}});

        // Assert
        expect(wrapper.text()).contain(ANY_MESSAGE);
    })

    it("Ne doit pas être visible si show est à false", () => {
        // Arrange - Act
        const ANY_MESSAGE = "MESSAGE";
        const wrapper = mount(ErrorMsg, {props:{message:ANY_MESSAGE, show:false}});

        // Assert
        expect(wrapper.find('div').exists()).toBeFalsy();

    })
})