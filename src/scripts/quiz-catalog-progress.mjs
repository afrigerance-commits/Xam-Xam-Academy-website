import { loadProgress, chapterProgress, STORAGE_KEY } from '../lib/quizzes/progress.mjs';
function render() {
  const { data } = loadProgress();
  for (const node of document.querySelectorAll('[data-chapter-progress]')) {
    const progress = chapterProgress(data, node.dataset.chapterProgress);
    node.textContent = progress.latest ? `Dernier quiz : ${progress.latest.correct}/${progress.latest.total}${progress.due<=Date.now()?' · À réviser':''}` : '';
  }
}
window.addEventListener('storage',e=>{if(e.key===STORAGE_KEY||e.key===null)render();});
render();
