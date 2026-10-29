import type { CourseNode } from '../../shared/course';
import type { Resource } from './types';

function validNode(value: unknown, depth = 0): value is CourseNode {
  if (!value || typeof value !== 'object' || depth > 40) return false;
  const node = value as CourseNode;
  return typeof node.type === 'string' &&
    ['value', 'url', 'svg', 'name', 'label', 'alt'].every(key =>
      !(key in node) || typeof node[key as keyof CourseNode] === 'string') &&
    (node.children === undefined || (Array.isArray(node.children) && node.children.every(child => validNode(child, depth + 1))));
}
export function isResourceList(value: unknown): value is Resource[] {
  return Array.isArray(value) && value.every(item =>
    item && typeof item === 'object' &&
    ['slug', 'title', 'level', 'subject', 'type', 'url'].every(key => typeof item[key] === 'string') &&
    (item.content === undefined || (item.content?.version === 1 && Array.isArray(item.content.nodes) && item.content.nodes.every((node: unknown) => validNode(node))))
  );
}
function absoluteUrl(value: string | null | undefined, siteUrl: string) {
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith('/') ? '' : '/'}${value}`;
}
/** Ancienne API : conserver la version complète disponible, sans réintroduire un cours supprimé. */
export function mergeResources(incoming: Resource[], previous: Resource[], siteUrl: string, source?: Resource['contentSource']): Resource[] {
  return incoming.map(item => {
    const saved = previous.find(old => old.slug === item.slug);
    if (!item.content && saved?.content) return saved;
    return {
      ...item,
      chapter: item.chapter ?? '',
      description: item.description ?? '',
      url: absoluteUrl(item.url, siteUrl) ?? siteUrl,
      pdfUrl: absoluteUrl(item.pdfUrl, siteUrl),
      contentSource: source ?? item.contentSource,
    };
  });
}
