TEST TECHNIQUE

Romain DANIZEL

Le code est dans le dossier API/todolist 

1. Les variables existent en Javascript mais n’existent ni en HTML ni en CSS. Vrai ou Faux ? 

Faux les variables n'existent pas en html ni en css, 

2. Quelle est la différence entre ces différentes méthodes de stockage : a. Cookie b. SessionStorage c. LocalStorage 

Un cookie stocke les données dans le compte de l'utilisateur (client) 
Un SessionStorage stocke les données dans la session de l'utilisateur jusqu'à ce qu'il quitte le site ou la navigation
Un LocalStorage stocke les données sur le navigateur elles n'ont pas de date d'expiration comparais aux deux autres 

3. Quelles sont les règles CSS qui doivent être ajoutées pour appliquer un ellipsis sur un texte (réduire dynamiquement la longueur d’un texte afin qu’il ne dépasse pas son container et sans qu’il n’aille à la ligne) ? 

white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

4. Vous êtes face à une liste de 1000 éléments (<li></li>) pour lesquels chacun de ces éléments déclenche au clic une alerte avec le texte du contenu. Comment et pourquoi optimisez-vous l’écoute d'événement dans ce cas ? 

On délègue l'écouteur d'évènement depuis son conteneur directement pour n'avoir qu'un seul écouteur généré au lieu de 1000

document.querySelector('ul').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    alert(event.target.textContent);
  }
});

ul étant le conteneur parent des li il prend donc l'eventlistener 

textContent étant le contenu de li quand on l'appelle 
par exemple : li.textContent = `${task.label}  (Terminée le : ${task.end_date})`; 



5. Quelles sont les différences entre les types de variable suivants : var, let et const ? 

var a une portée de fonction ainsi que globale et peut être redéclarer et reassigné

let a une portée de bloc peut être reassigné et ne peut être redéclarer 

const a une portée de bloc sa valeur doit être déclarer et ne peut pas être redéclarer ni réassigné  

6. Quels sont les différents avantages à l’utilisation des outils de développement “Performances” et “Mémoire” dans les navigateurs Firefox et Chromium ? 

Performance permets de voir le temps que la page se charge et peut donner des indices pour améliorer la qualité du rendu et du script     

Mémoire permets de surveiller l'utilisation de la mémoire pour améliorer la performance et la stabilité de l'application

7. Quelle a été votre tâche la plus ardue face à laquelle vous vous êtes confronté au cours de votre expérience professionnelle ? 

Sur une de mes missions je me suis occupé du debogage d'un jwt refresh ne fonctionnait pas comme il devait fonctionner, bien qu'il était existant, côté back-end il ne se mettait pas à jour, ce qui forçait à chaque changement de page ou de manière aléatoire de devoir se reconnecter à nouveau la première authentification étant considéré comme un changement un page, j'avais essayé de modifié son comportement en forçant un nouveau refresh à chaque changement de page avant qu'il en demande un autre ce qui avait fonctionné mais demandait à l'utilisateur de changer de page régulièrement pour rester connecté. 

8. Quelle est la dernière chose que vous avez apprise récemment ? 

google cloud platform est la dernière chose que j'ai appris récemment et c'est bien pratique 

9. Cette année, quelle techno aimeriez-vous apprendre et utiliser ?

J'aimerais continuer à travailler sur du JavaScript et plus particulièrement m'améliorer d'avantage sur le TypeScript 
