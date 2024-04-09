# Revue du code de Théo

## Utilisation de types

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

## ATTENTION avec les console.log dans le code
````ts
function loadingError(){
    showLoadingError.value = true;
    console.log("OUPS")
}
````
## Bonne utilisation des types, mais quelques oublis à faire attention!

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


