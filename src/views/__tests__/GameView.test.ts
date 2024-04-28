import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest"
import GameView from '../GameView.vue'
import { flushPromises, mount, shallowMount } from "@vue/test-utils";
import Actions from '../../components/Actions.vue'
import Missions from '../../components/Missions.vue'
import GameMsg from '../../components/GameMsg.vue'
import { defineComponent } from "vue";
import { setupServer } from "msw/node";
import { getCharacter, getCharacters, getEasyCharacters, getInvincibleCharacters } from "../../../tests/mocks/AppServiceMock";
import PlayerInfos from "@/components/PlayerInfos.vue";

const ANY_PLAYER_NAME : string = "Bob";
const ANY_SHIP_NAME : string = "SuperVaisseau";

const testComponent = defineComponent({
    components: { GameView, props:{playerName:ANY_PLAYER_NAME, shipName:ANY_SHIP_NAME, randIndex:1}},
    template : '<Suspense><GameView playerName="player" shipName="ship"/></Suspense>' // Les props sont passés ici
})

const apiServer = setupServer(...getCharacters);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})

describe('GameView', () => {

    it("Le component Actions doit être affiché", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(Actions).exists()).toBeTruthy();
        expect(wrapper.findComponent(Actions).isVisible()).toBeTruthy();
    })

    
    it("Le component Mission doit être affiché", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
        
        // Assert
        expect(wrapper.findComponent(Missions).exists()).toBeTruthy();
        expect(wrapper.findComponent(Missions).isVisible()).toBeTruthy();
    })

    
    it("Les components PlayerInfos doivent être affichés", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                
        // Assert
        expect(wrapper.findComponent(PlayerInfos).exists()).toBeTruthy();
        expect(wrapper.findAllComponents(PlayerInfos).length).toEqual(2);
    })

    it("Le component PlayerInfos avec les infos du player doit être affiché", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findAllComponents(PlayerInfos)[0].isVisible()).toBeTruthy();
    })

    it("Le nom du joueur doit être afficher dans le component PlayerInfos", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findAllComponents(PlayerInfos)[0].text()).toContain("player");
    })

    it ("Le nom du vaisseau doit être afficher dans le component PlayerInfos", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findAllComponents(PlayerInfos)[0].text()).toContain("ship");
    })

    it ("Au début du jeu, le joueur doit avoir 100% de vie", async ()=>{
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findAllComponents(PlayerInfos)[0].text()).toContain("100%");
    })

    it("Le component PlayerInfos avec les infos de l'ennemi doit être affiché", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findAllComponents(PlayerInfos)[1].isVisible()).toBeTruthy();
    })
    it ("Au début du jeu, l'ennemi doit avoir 100% de vie", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findAllComponents(PlayerInfos)[1].text()).toContain("100%");
    })

    it ("Les commandes pour jouer du composant Actions sont disponible dans le jeu", async () =>{
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findComponent(Actions).findAll('button').length).toBe(3);
    })

    it ("Lors de la première mission, le component Missions affiche 1 / 5", async () =>{
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
                        
        // Assert
        expect(wrapper.findComponent(Missions).text()).toContain("1 / 5");
    })

    it ("Quand le joueur termine la mission, le composant GameMsg affiche le message.", async () => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
        const endMission = wrapper.findComponent(Actions).find('#end-mission')
        
        endMission.trigger('click')
        await flushPromises();
        // Assert
        expect(wrapper.findComponent(GameMsg).text()).toContain("MISSION TERMINÉ");
        expect(wrapper.findComponent(GameMsg).text()).toContain("Vous avez terminé la mission, mais vous ne recevez pas de CG.");
    })

    it ("Quand le joueur gagne une mission, un message apparait pour lui indiquer le nombre de crédit gagné (ceux de l'adversaire)", async () => {
        // Arrange - Act
        apiServer.use(getEasyCharacters[0]); // Pour obtenir des enemies facile à tuer (1 pt de vie) et avec 1000 CG. 
        const wrapper = mount(testComponent);
        await flushPromises();
        const buttonAttack = wrapper.findComponent(Actions).find('#attack')
        
        while(wrapper.findComponent(GameMsg).text() == ''){ // on attaque jusqu'a recevoir un message de fin (où l'ennemi est mort)
            buttonAttack.trigger('click') 
        }
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(GameMsg).text()).toContain("VICTOIRE !");
        expect(wrapper.findComponent(GameMsg).text()).toContain("Vous avez gagné 1000 CG !");
    })

    it ("Quand le joueur meurt, un message apparait pour lui indiquer qu'il a perdu", async () => {
        apiServer.use(getInvincibleCharacters[0]); // Pour obtenir un ennemi avec beaucoup de points de vie (999999999)
        const wrapper = mount(testComponent);
        await flushPromises();
        const buttonAttack = wrapper.findComponent(Actions).find('#attack')
        
        while(wrapper.findComponent(GameMsg).text() == ''){ // on attaque jusqu'a recevoir un message de fin (où le player est mort)
            buttonAttack.trigger('click') 
        }
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(GameMsg).text()).toContain("PERDU !");
        expect(wrapper.findComponent(GameMsg).text()).toContain("Vous êtes mort.");
    })

    it ("Quand le joueur répare son vaisseau, le vaisseau est réparé", async () => {
        apiServer.use(getEasyCharacters[0]); // Pour obtenir des ennemis facile à tuer (1 pt de vie) et avec 1000 CG. 
        const wrapper = mount(testComponent);
        await flushPromises();
        const buttonAttack = wrapper.findComponent(Actions).find('#repair-end-mission')
        
        while(wrapper.findComponent(GameMsg).text() == ''){ // on attaque jusqu'a recevoir un message de fin (où le player est mort)
            buttonAttack.trigger('click') 
        }
        await flushPromises();

        // Assert
        expect(wrapper.findComponent(GameMsg).text()).toContain("PERDU !");
        expect(wrapper.findComponent(GameMsg).text()).toContain("Vous êtes mort.");
    })

})


