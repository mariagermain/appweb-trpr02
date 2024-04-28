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
::: warning
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
:::

::: tip
````ts
attack (70, opponent.value)
````
:::
comme tous les joueurs sont maitre (récit 6), pas besoin de se casser la tête. ce sera toujours une attaque à 70%.

### N'oublie pas *await* devant les actions du wrapper, sinon ça ne fonctionne pas.
````ts
await wrapper.findComponent(AccueilForm).find('select').setValue(ANY_SHIP)
````

### Sinon les tests qu tu a écrit fonctionnent bien, excellent travail.

:::: info
### Pour le test 'Doit emit submit-form si le formulaire est bien rempli.', le teste ne fonctionnait pas car le nom de vaisseau que tu donne ne fait pas partie des options.

::: warning
````ts
const ANY_SHIP = "ship";
````
:::
::: tip
````ts
const ANY_SHIP = ships[0]; // ships est la liste de vaisseau que retourne le mock de l'api. donc ships[0] est forcément une option valide.
````
:::
::::