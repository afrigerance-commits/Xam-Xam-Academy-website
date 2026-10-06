# Quiz automatiques et progression

Les 123 chapitres disposent d’un parcours corrigé automatiquement : 122 mini-tests de trois questions originales et le quiz existant de vingt questions sur les lentilles. Cela représente 386 questions. Les mini-tests vérifient une notion, une application et un piège ; ils ne constituent pas un examen exhaustif du chapitre. Les questions rédigées et leur auto-évaluation restent disponibles dans un volet séparé.

Les résultats automatiques sont calculés sans appel à une IA. Chaque question dispose d’une réponse explicite, d’un indice et d’une explication. Les calculs acceptent les décimales françaises, les signes et la notation scientifique ; chaque valeur a une tolérance d’arrondi définie. Une réponse vide ne rapporte aucun point. En entraînement, la première réponse validée reste celle du bilan. En examen, les réponses peuvent être modifiées avant la soumission et les corrigés ne sont affichés qu’à la fin.

## Suivi sur l’appareil

`/progression/` affiche les derniers quiz complets, les meilleurs résultats conservés, l’évolution, les compétences à reprendre et vingt sessions récentes. Les reprises d’erreurs ne remplacent jamais le résultat complet. Le calendrier conseille une nouvelle révision après un, trois ou sept jours selon le score. Il s’agit d’un repère, pas d’une certification pédagogique.

Les bilans utilisent `localStorage`, clé `xam-progression-v1`. Seuls le chapitre, la date, le mode, le score, la durée, les résultats par compétence et les identifiants des questions à revoir sont conservés. Aucun texte rédigé ni contact n’est enregistré dans ce suivi. Il n’existe pas de compte ni de synchronisation entre appareils. Une session en cours n’est pas restaurée après rechargement. Les anciens historiques locaux restent visibles sur le chapitre ; seuls les prochains bilans alimentent la page de progression.

Les données sont validées à la lecture, l’historique est borné et un navigateur refusant le stockage permet toujours d’effectuer un quiz. L’élève peut effacer ses résultats depuis la page de progression.

## Maintenir les questions

`src/lib/quizzes/bank.mjs` contient les trois questions par chapitre. La clé correspond à l’identifiant de la ressource. Les réponses rédigées du catalogue ne sont jamais évaluées par correspondance de mots. Pour enrichir un test, ajouter une question à sa banque et adapter le contrôle de couverture des tests. Le nombre affiché est calculé à partir des banques.

`QuizPlayer.astro` fournit l’interface commune aux 123 chapitres. Le navigateur reçoit uniquement la banque du chapitre ouvert. `automatic.mjs` calcule les réponses et les bilans ; `progress.mjs` valide et conserve la progression. Le quiz des lentilles conserve ses vingt questions et ses cinq compétences.

Validation : `node --test tests/*.test.mjs` puis `npm run build`. Les tests contrôlent notamment les réponses vides, les signes, les petits nombres, la compatibilité des lentilles, les données corrompues et la séparation entre reprise ciblée et quiz complet.
