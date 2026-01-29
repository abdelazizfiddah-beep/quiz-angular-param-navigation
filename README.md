# Initier le projet Quiz Trivia

## Pré-requis 

- WSL
- Git installé sur WSL
- Node installé sur WSL
- Angular CLI installé

## Récupérer le dépôt 

```
git clone https://github.com/SWEEPACAKE/quiz-angular.git
```

Puis, on va se rendre dans le dossier cloné avec 

```
cd quiz-angular/
```

Et là on va supprimer le répertoire .git avec 

```
rm -rf .git
```

Cette action permet de couper le lien entre mon dépôt et votre projet. Vous ne pourrez donc plus pousser vos modifications sur mon dépôt, il faudra alors exécuter la commande 

```
git init
```

Et ensuite vous pourrez pousser autant de modifications que vous voudrez, mais cette fois, sur votre dépôt à vous. Vous devrez me rendre avant la fin de la journée un lien vers votre dépôt mis à jour avec votre travail du jour. 

## Démarrer le projet 

Ici pas de Dockerfile ou de docker-compose, il faudra, dans le répertoire du projet, effectuer 

```
npm install
```

Puis 

```
ng serve --open
```

Vous devriez avoir votre projet qui s'ouvre sur le navigateur, avec le composant Home que je vous ai laissé dans le projet. 

Vous avez les composant Quiz et Result à développer, référez-vous en au document Word contenant les consignes. 

Have fun :)