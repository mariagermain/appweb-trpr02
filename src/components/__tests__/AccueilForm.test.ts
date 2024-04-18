import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccueilForm from '../AccueilForm.vue'

describe('AccueilForm', () => {

    it('Doit afficher un champ de texte pour le nom du joueur.', () => {
        // Arrange - Act
        const wrapper = mount(AccueilForm)

        // Assert
        expect(wrapper.find('input[type="text"]')).toBeTruthy()
    })

    it('Doit afficher la liste des vaisseaux disponible.', () => {
        // Arrange

        // Act
        const wrapper = mount(AccueilForm)
        // Assert
    })

})