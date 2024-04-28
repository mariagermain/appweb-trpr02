import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ConfirmMsgBox from "../ConfirmMsgBox.vue";
import { defineComponent, ref } from "vue";

describe('ConfirmMsgBox', () => {

    it('Doit afficher un message et un titre', async () => {
        const wrapper = mount(ConfirmMsgBox); 

        wrapper.findComponent(ConfirmMsgBox).vm.showMessage("title", "message");
        await wrapper.vm.$nextTick();

        expect(wrapper.text()).toContain("title");
        expect(wrapper.text()).toContain("message");
    })
    
})