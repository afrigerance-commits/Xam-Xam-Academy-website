"""Enrich all published courses and build their oral/written self-assessment banks.
Idempotent: generated blocks are delimited, hand-authored course text is preserved.
"""
from pathlib import Path
import json, re, runpy
ROOT=Path(__file__).resolve().parents[2]
EXTRAS=runpy.run_path(str(Path(__file__).with_name('chapter-practice.py')))['EXTRAS']
START='<!-- xam-revision:start -->'; END='<!-- xam-revision:end -->'

def metadata(text):
    front=text.split('---',2)[1]
    return {k:json.loads(v) for k,v in re.findall(r'^(\w+): (".*")$',front,re.M)}

def section_text(body,patterns):
    sections=re.split(r'^## (.+)\n',body,flags=re.M)
    for title,text in zip(sections[1::2],sections[2::2]):
        if any(re.search(p,title,re.I) for p in patterns):
            text=text.split(':::attention')[0]
            return re.sub(r':::\w+\n|^:::\s*$', '',text,flags=re.M).strip()
    return ''

def make_question(qid,skill,prompt,answer,hint):
    return dict(id=qid,skill=skill,prompt=prompt,answer=answer,hint=hint)

banks=[]; changed=[]
for path in sorted((ROOT/'src/content/ressources').glob('*.md')):
    text=path.read_text(); meta=metadata(text)
    if meta.get('type')!='Cours':continue
    course_id=path.stem
    if course_id=='3e-lentilles-minces':
        banks.append(dict(id=course_id,title=meta['titre'],level=meta['niveau'],subject=meta['matiere'],series=meta.get('serie',''),href='/quiz/lentilles-3e/',count=20,kind='automatic'))
        continue
    assert course_id in EXTRAS, f'Original transfer question missing: {course_id}'
    text=re.sub(re.escape(START)+r'.*?'+re.escape(END)+r'\n?', '',text,flags=re.S)
    body=text.split('---',2)[2]
    lesson=section_text(body,[r'^Comprendre',r'^L’idée',r'^Dérivée',r'^Dissoudre',r'^Les notions'])
    if course_id=='3e-solutions-aqueuses':
        lesson='\n\n'.join(section_text(body,[pattern]) for pattern in [r'^Dissoudre',r'^Concentration',r'^Diluer'])
    if course_id=='terminale-derivation':
        lesson+='\n\n'+section_text(body,[r'^Règles'])
    assert lesson,course_id
    method=section_text(body,[r'^Méthode',r'^Traduire'])
    if not method:
        found=re.search(r':::methode\n(.*?)\n:::',body,re.S)
        assert found,course_id
        method=found.group(1).strip()
    attention=re.search(r':::attention\n(.*?)\n:::',body,re.S)
    error=attention.group(1).strip() if attention else section_text(body,[r'^Vérifier son résultat'])
    assert error,course_id
    exercises=re.findall(r'^## Exercice[^\n]*\n(.*?)\n:::correction\n(.*?)\n:::',body,re.S|re.M)
    assert len(exercises)>=2,course_id
    extra_prompt,extra_answer=EXTRAS[course_id]
    count=len(exercises)+1
    questions=[
        make_question('notions','comprehension',f'Expliquez les notions essentielles de « {meta["titre"]} » avec vos propres mots.',lesson,'Définissez les objets ou les grandeurs avant de donner une relation. Précisez les conditions de validité.'),
        make_question('demarche','methode','Quelle démarche adopter pour résoudre un problème de ce chapitre ? Écrivez les étapes dans l’ordre.',method,'Commencez par ce qui doit être identifié avant tout calcul ou toute conclusion.'),
        make_question('vigilance','vigilance','Expliquez une erreur fréquente de ce chapitre et comment l’éviter.',error,'Cherchez une condition, une convention, une unité ou une opération qui peut invalider la réponse.')]
    for i,(prompt,answer) in enumerate(exercises,1):
        questions.append(make_question(f'application-{i}','application',prompt.strip(),answer.strip(),method))
    questions.append(make_question('transfert','transfert',extra_prompt,extra_answer,'Identifiez d’abord le modèle ou la propriété utile. Justifiez votre conclusion et contrôlez sa cohérence.'))
    block=f'''{START}
## Mon objectif de révision
À la fin de ce chapitre, vous devez pouvoir **expliquer les notions**, **choisir une démarche justifiée** et **résoudre les applications sans consulter les corrigés**. Un résultat seul ne suffit pas : indiquez la propriété utilisée et ses conditions d’application.

## Révision active — comprendre avant de calculer
Fermez vos notes pendant quelques minutes. Répondez aux trois questions suivantes sur une feuille, puis ouvrez les corrections. Une explication reproduite sans être comprise est un point à retravailler.

### 1. Quelles sont les notions essentielles ?
Expliquez les idées du chapitre avec vos mots et distinguez les grandeurs ou les objets étudiés.

:::correction
{lesson}
:::

### 2. Quelle démarche utiliser ?
Écrivez les étapes de résolution dans un ordre logique. Pour chaque étape, expliquez pourquoi elle est nécessaire.

:::correction
{method}
:::

### 3. Quel piège faut-il éviter ?
Donnez une erreur fréquente et la précaution qui empêche de la commettre.

:::correction
{error}
:::

## Exercice {count} — Transfert et justification
{extra_prompt}

:::correction
{extra_answer}
:::

## Mon parcours de consolidation
- **Aujourd’hui :** refaites les applications sans les corrections. Notez la première étape qui vous a bloqué.
- **Demain :** expliquez la notion et la méthode sans relire la fiche, puis vérifiez votre explication.
- **Dans quelques jours :** reprenez les questions non acquises avec les données, les conditions et une justification complète.

[Commencer ma révision interactive — {len(questions)} questions](/quiz/{course_id}/)

Les réponses rédigées sont comparées au corrigé par l’élève : le bilan est une **auto-évaluation**, pas une note attribuée automatiquement. En cas de doute sur une justification, faites-la vérifier par votre professeur.
{END}
'''
    description=f'Notions, méthode, {count} applications corrigées et {len(questions)} questions de révision interactive : {meta["titre"]}.'
    text=re.sub(r'^description: .*$', 'description: '+json.dumps(description,ensure_ascii=False),text,flags=re.M)
    updated=text.rstrip()+'\n\n'+block
    if updated!=path.read_text():path.write_text(updated);changed.append(str(path.relative_to(ROOT)))
    banks.append(dict(id=course_id,title=meta['titre'],level=meta['niveau'],subject=meta['matiere'],series=meta.get('serie',''),href=f'/quiz/{course_id}/',count=len(questions),kind='written',questions=questions))
assert len(banks)==123,len(banks)
assert len(EXTRAS)==122,len(EXTRAS)
(ROOT/'src/lib/quizzes/catalog.json').write_text(json.dumps(banks,ensure_ascii=False,indent=2)+'\n')
(ROOT/'scripts/content/revision-manifest.json').write_text(json.dumps([f'src/content/ressources/{b["id"]}.md' for b in banks if b['kind']=='written']+['src/lib/quizzes/catalog.json'],ensure_ascii=False,indent=2)+'\n')
print(f'{len(banks)} courses indexed; {len(changed)} course files enriched; {sum(x["count"] for x in banks)} questions available.')
