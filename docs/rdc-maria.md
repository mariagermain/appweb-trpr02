---
outline: deep
---

# Revue du code de Maria.

## Semaine 1 :
### Manque de tests : 
penser à ajouter les tests pour les composants.

### Vérification du nom du joueur (*AccueilForm.vue*)
Peut-être ajouter une fonction pour vérifier que le nom du joueur est valide avant de changer de page.
````html
 <button type="button" @click="ROUTER.push({ name : 'game'})" class="btn btn-primary w-100">Débuter la partie</button>
````

### *AppService.ts*
Très bonne idée, ça rend le code beaucoup plus lisible.

## Semaine 2
### Manque de tests :
je pense qu'il est urgent de commencer nos tests, je vais m'en occuper.

### L'interface du jeu est très propre, beau travail.
### Code très propre, rien à signaler.
### Randindex dans les props ?

````ts
const props = defineProps<{
    playerName:string,
    shipName:string,
    randIndex:number
}>()
````
Si on passe l'index de l'enemie dans l'url, le joueur peut tricher et choisir son enemie en modifiant l'url.
Je pense que la meilleur solution est de choisir l'url dans GameView.

## Semaine 3
````ts
    switch(player.value.experience){
        case 1: {
            attack(20, opponent.value)
            break;
        }
        case 2: {
            attack(35, opponent.value)
            break;
        }
        case 3: {
            attack(50, opponent.value)
            break;
        }
        case 4: {
            attack(70, opponent.value)
            break;
        }
````
comme tous les joueurs sont maitre (récit 6), pas besoin de se casser la tête. ce sera toujours une attaque à 70%.