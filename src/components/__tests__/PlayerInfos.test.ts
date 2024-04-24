import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PlayerInfos from '../PlayerInfos.vue'

describe("PlayerInfos", () => {

    const ANY_PLAYER_NAME = "Bob";
    const ANY_SHIP_NAME = "SuperVaisseau";

    it("Doit afficher le nom du joueur.", () => {
        // Arrange - Act
        const wrapper = mount(PlayerInfos, {props:{playerName:ANY_PLAYER_NAME, shipName:ANY_SHIP_NAME}});
        
        // Assert
        expect(wrapper.text()).toContain(ANY_PLAYER_NAME);
    });

    it("Doit afficher le nom du vaisseau", () => {
        // Arrange - Act
        const wrapper = mount(PlayerInfos, {props:{playerName:ANY_PLAYER_NAME, shipName:ANY_SHIP_NAME}});

        // Assert
        expect(wrapper.text()).toContain(ANY_SHIP_NAME);
    });
});