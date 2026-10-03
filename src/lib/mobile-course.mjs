import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { mathjax } from 'mathjax-full/js/mathjax.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { SVG } from 'mathjax-full/js/output/svg.js';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html.js';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';

const parser = unified().use(remarkParse).use(remarkMath).use(remarkDirective).use(remarkGfm);
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const document = mathjax.document('', {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: 'none' }),
});

/** SVG autonome : aucun CDN, police distante ou calcul sur le téléphone. */
function formula(value, display) {
  const container = document.convert(value, { display });
  const svg = adaptor.firstChild(container);
  const viewBox = adaptor.getAttribute(svg, 'viewBox').split(/\s+/).map(Number);
  return {
    svg: adaptor.outerHTML(svg).replaceAll('currentColor', '#172B4D'),
    width: viewBox[2] / 1000 * 18,
    height: viewBox[3] / 1000 * 18,
  };
}

export function buildCourse(markdown = '') {
  const tree = parser.parse(markdown);
  const definitions = new Map();
  function findDefinitions(node) {
    if (node.type === 'definition') definitions.set(node.identifier, node);
    node.children?.forEach(findDefinitions);
  }
  findDefinitions(tree);
  function convert(node) {
    const result = { type: node.type };
    for (const key of ['value', 'depth', 'ordered', 'start', 'checked', 'url', 'alt', 'title', 'name']) {
      if (node[key] !== undefined) result[key] = node[key];
    }
    if (node.type === 'linkReference' || node.type === 'imageReference') {
      const definition = definitions.get(node.identifier);
      result.type = node.type === 'linkReference' ? 'link' : 'image';
      result.url = definition?.url;
    }
    if (node.type === 'math' || node.type === 'inlineMath') {
      Object.assign(result, formula(node.value, node.type === 'math'));
    }
    if (node.children) {
      result.children = node.children.filter(child => child.type !== 'definition').map(convert);
    }
    if (node.type === 'containerDirective' && node.children[0]?.data?.directiveLabel) {
      result.label = node.children[0].children.map(child => child.value ?? '').join('');
      result.children.shift();
    }
    return result;
  }
  return { version: 1, nodes: tree.children.filter(node => node.type !== 'definition').map(convert) };
}
