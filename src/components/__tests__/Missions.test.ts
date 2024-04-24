import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Missions from '../Missions.vue'

describe("Missions", () => {
    it("Doit afficher l'objectif du joueur", () => {
        // Arrange - Act
        const EXPECTED_MISSION = "Objectif: survivre à 5 missions en obtenant le plus de crédits.";
        const wrapper = mount(Missions);

        // Assert
        expect(wrapper.text()).toContain(EXPECTED_MISSION);
    })
})