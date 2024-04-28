import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Action from '../Actions.vue'

describe ('Action', () => {

    it('Doit avoir trois bouttons disponnibles.', () => {
        // Arrange - Act
        const wrapper = mount(Action);

        // Assert
        expect(wrapper.findAll('button').length).toBe(3);
    })

    it('Doit emit attack lorsque le bouton est clické', () => {
        // Arrange 
        const wrapper = mount(Action);

        // Act
        wrapper.find('#attack').trigger('click')

        // Assert
        expect(wrapper.findComponent(Action).emitted('attack'));
    })
    it('Doit emit repair lorsque le bouton est clické', () => {
        // Arrange 
        const wrapper = mount(Action);

        // Act
        wrapper.find('#repair-end-mission').trigger('click')

        // Assert
        expect(wrapper.findComponent(Action).emitted('repair-end-mission'));
    })
    it('Doit emit end-mission lorsque le bouton est clické', () => {
        // Arrange 
        const wrapper = mount(Action);

        // Act
        wrapper.find('#end-mission').trigger('click')

        // Assert
        expect(wrapper.findComponent(Action).emitted('end-mission'));
    })
})