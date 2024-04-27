import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import GameView from '../GameView.vue'
import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import Actions from '../../components/Actions.vue'
import { defineComponent } from "vue";
import { setupServer } from "msw/node";
import { getCharacter, getCharacters, getEasyCharacters, getInvincibleCharacters } from "../../../tests/mocks/AppServiceMock";

const ANY_PLAYER_NAME : string = "Bob";
const ANY_SHIP_NAME : string = "SuperVaisseau";

const testComponent = defineComponent({
    components: { GameView, props:{playerName:ANY_PLAYER_NAME, shipName:ANY_SHIP_NAME, randIndex:1}},
    template : '<Suspense><GameView playerName="player" shipName="ship"/></Suspense>'
})

const apiServer = setupServer(...getCharacters);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})

describe('GameView', () => {
    it("Le nom du joueur doit être afficher", () => {

    })

    it ("Le nom du vaisseau doit être afficher", () => {

    })

    it ("Au début du jeu, le joueur doit avoir 100% de vie", ()=>{

    })

    it ("Au début du jeu, l'enemie doit avoir 100% de vie", () => {

    })

    it ("Les commandes pour jouer sont disponnible dans le jeu", () =>{

    })

    it ("Quand le joueur termine la mission, la mission suivante commence et le joueur ne gagne pas de crédit.", () => {

    })

    it ("Quand le joueur gagne une mission, il gagne les crédit de l'adversaire", () =>{

        apiServer.use(getEasyCharacters[0]); // Pour obtenir des enemies facile à tuer. (1 pt de vie)
    })

    it ("Quand le joueur gagne une mission, un message apparait pour lui indiquer le nombre de crédit gagné", () => {
        apiServer.use(getEasyCharacters[0]); // Pour obtenir des enemies facile à tuer. (1 pt de vie)
    })

    it ("Quand le joueur meurt, un message apparait pour lui indiquer qu'il a perdu", () => {
        apiServer.use(getInvincibleCharacters[0]); // Pour obtenir un enemie avec beaucoup de points de vie (999999999)
    })

    it ("Quand le joueur réparre son vaisseau, le vaisseau est réparrer", () => {
        apiServer.use(getEasyCharacters[0]); // Pour obtenir des enemies facile à tuer. (1 pt de vie, 1000 credits)
    })

    // Si tu trouve d'autre tests, n'hésite pas .

})


