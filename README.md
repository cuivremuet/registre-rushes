# registre-rushes

Importe un manifeste de rushes et produit un inventaire trié avec les durées cumulées.

## Usage

Node.js 22+ ; aucune dépendance externe. Depuis ce dossier :

```powershell
node main.mjs example.json exemple-sortie.json
node --test test.mjs
```

Entrée : `clips`, liste de `{name, durationSeconds}`. Les noms sont uniques et sans séparateur de chemin ; les durées sont positives et finies. Une liste vide est acceptée. Sortie : inventaire trié, nombre de rushes et durée totale. Import de métadonnées seulement : aucun rush n'est lu, copié, renommé ou décodé.

La sortie est écrite seulement après validation complète et remplace le fichier de sortie choisi. Utiliser un chemin distinct de l'entrée. JSON UTF-8 sans BOM. Le dossier de destination doit exister. Erreur de lecture/JSON/validation/écriture : message sur stderr, code 1. Aucun accès réseau.

## Exemple

Voir `example.json` et `exemple-sortie.json`. Les exemples n'utilisent que des métadonnées ou des textes fictifs.

Licence MIT. Version 0.1.0.

