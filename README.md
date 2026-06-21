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

## Deploiement Vercel

Sur Vercel, les fichiers `server/data/state.json` et `server/uploads/` ne peuvent pas servir de stockage permanent. Pour que tous les visiteurs voient les memes cases cochees et les memes photos, il faut connecter un stockage Vercel Blob au projet.

Dans le dashboard Vercel :

1. Ouvre ton projet.
2. Va dans `Storage`.
3. Cree ou connecte un store `Vercel Blob`.
4. Assure-toi que la variable `BLOB_READ_WRITE_TOKEN` est ajoutee au projet.
5. Redeploie le site.

Ensuite :

- les cases cochees sont stockees dans `permisayman/state.json` sur Vercel Blob ;
- les images sont stockees dans `permisayman/uploads/` sur Vercel Blob ;
- n'importe quel navigateur verra le meme etat partage.
- les pages ouvertes se resynchronisent automatiquement toutes les quelques secondes, sauf pendant la saisie dans un champ.
