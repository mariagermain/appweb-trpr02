import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"
import GameView from '../GameView.vue'
import { flushPromises, mount } from "@vue/test-utils";
import Actions from '../../components/Actions.vue'
import { defineComponent } from "vue";
import { setupServer } from "msw/node";
import { getCharacter } from "../../../tests/mocks/AppServiceMock";

const ANY_PLAYER_NAME : string = "Bob";
const ANY_SHIP_NAME : string = "SuperVaisseau";

const testComponent = defineComponent({
    components: { GameView, props:{playerName:ANY_PLAYER_NAME, shipName:ANY_SHIP_NAME, randIndex:1}},
    template : '<Suspense><GameView/></Suspense>'
})

const apiServer = setupServer(...getCharacter);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})

describe('GameView', () => {

    it("Attack est appellé avec 70 si experience sur player est 4", async() => {
        const wrapper = mount(testComponent);
        await flushPromises()
        const button = wrapper.findComponent(Actions).find('#attack');

        // Act
        await button.trigger('click')

        expect('attack').toBeCalledWith(70)
    })

    it("Attack est appellé avec 50 si experience sur player est 3", async() => {

        onClickAttack;

        expect(attack(1, {
            id: 0, name:"playerName", experience: 3, credit: 0,
            ship: {
                id: '0',
                name: "shipName",
                vitality: 100
            }
        })).toBeCalledWith(50)
    })
    it("Attack est appellé avec 35 si experience sur player est 2", async() => {

        onClickAttack;

        expect(attack(1, {
            id: 0, name:"playerName", experience: 2, credit: 0,
            ship: {
                id: '0',
                name: "shipName",
                vitality: 100
            }
        })).toBeCalledWith(35)
    })
    it("Attack est appellé avec 20 si experience sur player est 1", async() => {

        onClickAttack;

        expect(attack(1, {
            id: 0, name:"playerName", experience: 1, credit: 0,
            ship: {
                id: '0',
                name: "shipName",
                vitality: 100
            }
        })).toBeCalledWith(20)
    })
})


