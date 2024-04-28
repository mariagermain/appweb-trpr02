import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import Missions from '../Missions.vue'
import { defineComponent } from 'vue'

describe("Missions", () => {
    it("Doit afficher l'objectif du joueur", () => {
        // Arrange - Act
        const EXPECTED_MISSION = "Objectif: survivre à 5 missions en obtenant le plus de crédits.";
        const wrapper = mount(Missions);

        // Assert
        expect(wrapper.text()).toContain(EXPECTED_MISSION);
    })

    it ("Doit afficher la mission actuelle (1 / 5)", async () =>{
        // Arrange - Act
        const testComponent = defineComponent({
            components: { Missions, props:{currentMission:1}},
            template : '<Missions currentMission="1" />' // Les props sont passés ici
        })
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.text()).toContain("1 / 5");
    })
})