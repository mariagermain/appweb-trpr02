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
