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

    // TODO : Suite des tests quand les bouttons serons fonctionnels.

})