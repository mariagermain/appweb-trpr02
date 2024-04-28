import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import GameMsg from "../GameMsg.vue";

describe('GameMsg', () => {

    it('Doit afficher un titre, un message et un texte de bouton', async () => {
        const wrapper = mount(GameMsg); 

        wrapper.findComponent(GameMsg).vm.showMessage({title:"title", text:"text", buttonText:"buttonText"});
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain("title");
        expect(wrapper.text()).toContain("text");
        expect(wrapper.text()).toContain("buttonText");
    })
})