# PERMISayman

Application locale React/Vite pour reviser le permis B marocain.

## Lancer le site

Double-clique sur `lancer-site.bat`, puis ouvre :

```text
http://127.0.0.1:5173
```

Tu peux aussi lancer manuellement :

```bash
npm.cmd install
npm.cmd start
```

Ne lance pas le site en double-cliquant sur `index.html` : avec React/Vite, il faut passer par le serveur local Node.js.

## Stockage des images

Les photos des erreurs sont stockees localement dans IndexedDB, une zone de stockage du navigateur adaptee aux fichiers. Les textes, scores, taches et liens restent dans localStorage.

Utilise `Exporter ma sauvegarde` pour creer un fichier JSON qui contient aussi les images en base64.
