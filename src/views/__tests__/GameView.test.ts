import { describe, expect, it } from "vitest"
import onClickAttack  from "../GameView.vue";
import attack  from "../GameView.vue";

describe('GameView', () => {

    it("Attack est appellé avec 70 si experience sur player est 4", async() => {

        onClickAttack;

        expect(attack(1, {
            id: 0, name:"playerName", experience: 4, credit: 0,
            ship: {
                id: '0',
                name: "shipName",
                vitality: 100
            }
        })).toBeCalledWith(70)
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


