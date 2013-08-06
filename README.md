Mobileorgie
===========

Présentation
-------------------------

L'application mobile de [Metalorgie.com](http://www.metalorgie.com). Open Source (GPL V3) et on l'éspère disponible, un fois  terminée sur Android, iOS, WP8, FFOS.
Toutes les aides sont les bienvenues!

Elle utilise :
- [Sencha Touch 2](http://www.sencha.com/products/touch)
- [Sencha Architect](http://www.sencha.com/products/architect)
(c'est donc du JS / CSS / HTML) Et pourquoi avoir utilisez Sencha Architect : pour aller plus vite! (et vu que ça fait un code propre c'est pas mal du tout). Ca permet de se familiariser avec le framework Sencha Touch assez aisément et force à faire du code plus ou moins propre.

Pour informations :
- La partie est dév est réalisée par [Bacteries](https://github.com/Bacteries) - [Twitter](http://twitter.com/Bacteries)
- Le design est réalisé par [Vinz](https://github.com/picks44) - [Twitter](https://twitter.com/VinzGhislain)

C'est une première pour chacun, donc y'a sûrement des choses pas terribles dans le code (sûr même!), mais si ça vous dérange une pull request est la bienvenue!

L'appli se base sur une mini API metalorgie pour accéder aux données. Si vous voulez développer une nouvelle partie et qu'il n'existe pas de méthode encore : pingez Bacteries pour qu'il vous ajoute ça.

Comment l'utiliser
-------------------------
- Installez [Sencha Architect](http://www.sencha.com/products/architect)
- Récupérer le projet via Git
- Faites pointer un vHost Apache sur le répertoire (ou mettez là dans votre répertoire www par défaut)
- Vous pouvez accéder à l'appli en allant sur votre vHost
- Pour l'éditer : utilisez Sencha Architect (qui va écrire dans les fichier situé dans /metadata), quand vous sauvegardez les fichier situé dans app sont mis à jour (les fichiers JS), donc ne modifiez pas directement ces fichiers.

Planning
===========

Première phase
-------------------------

* Faire en sorte que ça fonctionne (et oui!)
* Niveau fonctionnalités : avoir les news, sorties, concerts (géolocalisé)
* Sortir l'appli sur Android
* Selon le succès voir pour iOS (Vu le coût annuel d'une appli iOs ça dépendra vraiment du succès) et Windows Phone 8 ou Firefox OS

Suite
-------------------------

* Avoir les groupes / chroniques / détails des albums / tags / interviews & cie
* Pouvoir connecter son compte pour accéder à ses favoris / liste d'album / liste d'envie / ... (voir avoir du push quand une news concerne un groupe mis en favoris)

