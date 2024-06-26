# Revue du code de Théo

## Semaine 1

### Utilisation de types

Très pertinent puisqu'on récupère les données directement à partir d'un service.

````ts
export type ScoreInfo = {
    id:number,
    name:string,
    score:number
}

export type Ship = {
    id:string,
    name:string
}
````

### ATTENTION avec les console.log dans le code
````ts
function loadingError(){
    showLoadingError.value = true;
    console.log("OUPS")
}
````
### Bonne utilisation des types, mais quelques oublis à faire attention!

::: warning
````ts
const APP_SERVICE = new AppService();
````
:::

::: tip
````ts
const APP_SERVICE : AppService = new AppService();
````
:::

## Semaine 2
### Tests
Cas de tests très pertinents. Je suis fan du Mock du AppService.
```` ts
export const getShips = [
    rest.get('http://localhost:3000/ships', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(ships))
    }),
]
````
#### Cas de tests
::: info
- Doit afficher un champ de texte pour le nom du joueur.
- Doit afficher la liste des vaisseaux disponible.
- Doit emit @loading-error si l'api ne répond pas.
:::

### AppService
Belle utilisation de la classe AppService pour avoir la liste des scores.
````ts
async getScores() : Promise<ScoreInfo[]>{
    const { data } : AxiosResponse<ScoreInfo[], ScoreInfo[]> = await axios.get(this.API_URL + SCORES_PATH);
    return data;
}
````

## Semaine 3
### Test
::: info
- Les cas de tests sont très significatif et complet!
- Des tests à en plus finir! (jamais trop)
:::

Encore quelques oublis de types! mais l'utilisation reste très bien en général dans tout le code
::: warning
````ts
    const ANY_PLAYER_NAME = "Bob";
    const ANY_SHIP_NAME = "SuperVaisseau";
````
:::

::: tip
````ts
    const ANY_PLAYER_NAME : string = "Bob";
    const ANY_SHIP_NAME : string = "SuperVaisseau";
````
:::


