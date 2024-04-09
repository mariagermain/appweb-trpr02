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


## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
