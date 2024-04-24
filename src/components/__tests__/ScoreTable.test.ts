import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ScoreTable from '../ScoreTable.vue'

import { setupServer } from 'msw/node'
import { getScores, networkError } from '../../../tests/mocks/AppServiceMock'
import { afterEach } from 'node:test'
import { defineComponent } from 'vue'
import { ranking } from '../../../tests/data/ranking'

// Pour encadrer notre composent dans un <Suspense>
const testComponent = defineComponent({
    components: { ScoreTable },
    template : '<Suspense><ScoreTable/></Suspense>'
})

const apiServer = setupServer(...getScores);

beforeAll(() => apiServer.listen({onUnhandledRequest: 'error'}));
afterAll(() => apiServer.close());
afterEach(() => {
    apiServer.resetHandlers();
})




describe("ScoreTable", () => {
    it ("Doit afficher la liste des joueurs avec leurs scores respectif trier dans le bon ordre (le 1er en haut)", async() => {
        // Arrange - Act
        const wrapper = mount(testComponent);
        await flushPromises();
        // Assert
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr').length).toBe(ranking.length + 1) // +1 car il y a la ligne pour les titres.
        
        // Le premier doit être en haut.
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[1].text()).toContain('1');
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[1].text()).toContain(ranking[1].name);
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[1].text()).toContain(ranking[1].score);

        // Le second
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[2].text()).toContain('2');
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[2].text()).toContain(ranking[2].name);
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[2].text()).toContain(ranking[2].score);
        
        // Le troisième
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[3].text()).toContain('3');
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[3].text()).toContain(ranking[0].name);
        expect(wrapper.findComponent(ScoreTable).find('table').findAll('tr')[3].text()).toContain(ranking[0].score);
    });

    it("Doit emit @loading-error si l'api ne répond pas.", async() => {
        // Arrange
        apiServer.use(networkError[0]);
        // Act
        const wrapper = mount(testComponent);
        await flushPromises();
        // Assert
        expect(wrapper.findComponent(ScoreTable).emitted('loading-error')).toBeTruthy();
    });
});