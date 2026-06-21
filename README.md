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

Ne lance pas le site en double-cliquant sur `index.html` : avec React/Vite et le stockage partage, il faut passer par le serveur Node.js.

## Stockage partage

Quand le site est lance avec `lancer-site.bat` ou `npm.cmd start`, les cases cochees, scores, liens videos et erreurs sont stockes dans :

```text
server/data/state.json
```

Les photos des erreurs sont stockees comme vrais fichiers dans :

```text
server/uploads/
```

Donc un autre navigateur, ou un autre PC connecte au meme serveur, verra les memes cases cochees et les memes photos.

## Stockage des images

Sans serveur, les photos des erreurs restent en fallback dans IndexedDB du navigateur. Avec le serveur, elles sont stockees dans `server/uploads/`.

Utilise `Exporter ma sauvegarde` pour creer un fichier JSON qui contient aussi les images en base64.
