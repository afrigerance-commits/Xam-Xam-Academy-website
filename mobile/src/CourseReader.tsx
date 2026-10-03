import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { SvgXml } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import type { CourseContent, CourseNode } from '../../shared/course';
import { COLORS } from './theme';

const LABELS: Record<string, string> = {
  retenir: 'À retenir', definition: 'Définition', attention: 'Attention',
  methode: 'Méthode', exemple: 'Exemple', correction: 'Voir la correction',
};
function resolveUrl(value: string, baseUrl: string) {
  try {
    const url = new URL(value, baseUrl);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
async function openLink(value: string, baseUrl: string) {
  const url = resolveUrl(value, baseUrl);
  if (!url) return;
  try { await WebBrowser.openBrowserAsync(url); }
  catch { Alert.alert('Lien indisponible', 'Vérifie ta connexion Internet.'); }
}
function plainText(node: CourseNode): string {
  return node.value ?? node.children?.map(plainText).join('') ?? '';
}
function Formula({ node }: { node: CourseNode }) {
  if (!node.svg) return <Text selectable style={styles.text}>{node.value}</Text>;
  const width = Math.max(20, node.width ?? 100);
  const height = Math.max(22, node.height ?? 26);
  return <View accessible accessibilityLabel={`Formule : ${node.value}`}>
    <SvgXml xml={node.svg} width={width} height={height} />
  </View>;
}
function CourseImage({ node, baseUrl }: { node: CourseNode; baseUrl: string }) {
  const [failed, setFailed] = useState(false);
  const url = resolveUrl(node.url ?? '', baseUrl);
  if (!url || failed) return <Text style={styles.note}>Illustration indisponible : {node.alt || 'image'}. Connecte-toi pour la charger.</Text>;
  return <View style={styles.figure}>
    <Image source={{ uri: url }} style={styles.image} contentFit="contain" cachePolicy="disk"
      accessibilityLabel={node.alt || 'Illustration du cours'} onError={() => setFailed(true)} />
    {node.alt ? <Text style={styles.note}>{node.alt}</Text> : null}
  </View>;
}
function PedagogicalBlock({ node, baseUrl }: { node: CourseNode; baseUrl: string }) {
  const [opened, setOpened] = useState(false);
  const correction = node.name === 'correction';
  const title = node.label || LABELS[node.name ?? ''] || node.name;
  return <View style={[styles.box, node.name === 'attention' && styles.warning, correction && styles.correction]}>
    {correction ? <Pressable onPress={() => setOpened(value => !value)} accessibilityRole="button"
      accessibilityState={{ expanded: opened }} style={styles.toggle}>
      <Text style={styles.boxTitle}>{opened ? 'Masquer la correction' : title}</Text>
      <Text style={styles.boxTitle}>{opened ? '−' : '+'}</Text>
    </Pressable> : <Text style={styles.boxTitle}>{title}</Text>}
    {(!correction || opened) && <Blocks nodes={node.children ?? []} baseUrl={baseUrl} />}
  </View>;
}
/** Textes imbriqués : le gras, les liens et les listes restent des composants natifs. */
function InlineText({ node, baseUrl }: { node: CourseNode; baseUrl: string }) {
  if (node.type === 'break') return <Text>{'\n'}</Text>;
  return <Text style={[
    node.type === 'strong' && styles.bold,
    node.type === 'emphasis' && styles.italic,
    node.type === 'delete' && styles.deleted,
    node.type === 'inlineCode' && styles.code,
    node.type === 'link' && styles.link,
  ]} onPress={node.type === 'link' ? () => void openLink(node.url ?? '', baseUrl) : undefined}>
    {node.children ? node.children.map((child, index) => <InlineText key={index} node={child} baseUrl={baseUrl} />) : node.value}
  </Text>;
}
function Paragraph({ node, baseUrl }: { node: CourseNode; baseUrl: string }) {
  const children = node.children ?? [];
  // Les formules et illustrations sont intercalées sans dépendance WebView/CDN.
  const groups: CourseNode[][] = [[]];
  for (const child of children) {
    if (['inlineMath', 'image'].includes(child.type)) groups.push([child], []);
    else groups[groups.length - 1].push(child);
  }
  if (groups.length === 1) return <Text selectable style={styles.text}>
    {children.map((child, index) => <InlineText key={index} node={child} baseUrl={baseUrl} />)}
  </Text>;
  return <View style={styles.inline}>
    {groups.filter(group => group.length).map((group, index) => {
      const first = group[0];
      if (first.type === 'inlineMath') return <Formula key={index} node={first} />;
      if (first.type === 'image') return <CourseImage key={index} node={first} baseUrl={baseUrl} />;
      return <Text key={index} selectable style={styles.text}>
        {group.map((child, childIndex) => <InlineText key={childIndex} node={child} baseUrl={baseUrl} />)}
      </Text>;
    })}
  </View>;
}
function Block({ node, baseUrl }: { node: CourseNode; baseUrl: string }) {
  switch (node.type) {
    case 'paragraph': return <Paragraph node={node} baseUrl={baseUrl} />;
    case 'heading': return <Text accessibilityRole="header" selectable style={[styles.heading, (node.depth ?? 2) > 2 && styles.smallHeading]}>
      {(node.children ?? []).map((child, index) => <InlineText key={index} node={child} baseUrl={baseUrl} />)}
    </Text>;
    case 'math': return <ScrollView horizontal contentContainerStyle={styles.formula}><Formula node={node} /></ScrollView>;
    case 'image': return <CourseImage node={node} baseUrl={baseUrl} />;
    case 'containerDirective': return <PedagogicalBlock node={node} baseUrl={baseUrl} />;
    case 'list': return <View style={styles.blocks}>{node.children?.map((child, index) => <View key={index} style={styles.listItem}>
      <Text style={styles.bullet}>{node.ordered ? `${(node.start ?? 1) + index}.` : child.checked === null || child.checked === undefined ? '•' : child.checked ? '☑' : '☐'}</Text>
      <View style={styles.listBody}><Blocks nodes={child.children ?? []} baseUrl={baseUrl} /></View>
    </View>)}</View>;
    case 'blockquote': return <View style={styles.quote}><Blocks nodes={node.children ?? []} baseUrl={baseUrl} /></View>;
    case 'code': return <ScrollView horizontal><Text selectable style={styles.codeBlock}>{node.value}</Text></ScrollView>;
    case 'thematicBreak': return <View style={styles.rule} />;
    case 'table': return <ScrollView horizontal><View>{node.children?.map((row, index) => <View key={index} style={styles.row}>
      {row.children?.map((cell, cellIndex) => <View key={cellIndex} style={styles.cell}>
        <Paragraph node={cell} baseUrl={baseUrl} />
      </View>)}
    </View>)}</View></ScrollView>;
    default: return node.children ? <Blocks nodes={node.children} baseUrl={baseUrl} /> : <Text selectable style={styles.text}>{plainText(node)}</Text>;
  }
}
function Blocks({ nodes, baseUrl }: { nodes: CourseNode[]; baseUrl: string }) {
  return <View style={styles.blocks}>{nodes.map((node, index) => <Block key={index} node={node} baseUrl={baseUrl} />)}</View>;
}
export function CourseReader({ content, baseUrl }: { content: CourseContent; baseUrl: string }) {
  return <Blocks nodes={content.nodes} baseUrl={baseUrl} />;
}
const styles = StyleSheet.create({
  blocks: { gap: 14 }, text: { color: COLORS.text, fontSize: 16, lineHeight: 25, flexShrink: 1 },
  heading: { color: COLORS.navy, fontSize: 23, lineHeight: 30, fontWeight: '800', marginTop: 10 },
  smallHeading: { fontSize: 19, lineHeight: 26 }, bold: { fontWeight: '800' }, italic: { fontStyle: 'italic' },
  deleted: { textDecorationLine: 'line-through' }, link: { color: COLORS.blue, textDecorationLine: 'underline' },
  inline: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', rowGap: 4 },
  formula: { padding: 12, minWidth: '100%', alignItems: 'center', justifyContent: 'center' },
  box: { backgroundColor: '#EEF4FF', padding: 16, borderRadius: 14, gap: 12, borderLeftWidth: 4, borderLeftColor: COLORS.blue },
  warning: { backgroundColor: '#FFF5D6', borderLeftColor: '#DB9C00' },
  correction: { backgroundColor: '#EDFAF1', borderLeftColor: '#218653' },
  boxTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy },
  toggle: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, minHeight: 32, alignItems: 'center' },
  listItem: { flexDirection: 'row', gap: 9 }, listBody: { flex: 1 }, bullet: { color: COLORS.blue, fontSize: 16, lineHeight: 25 },
  quote: { borderLeftWidth: 3, borderLeftColor: COLORS.line, paddingLeft: 14 },
  rule: { height: 1, backgroundColor: COLORS.line, marginVertical: 8 },
  code: { fontFamily: 'monospace', backgroundColor: '#EEF3F8' },
  codeBlock: { fontFamily: 'monospace', padding: 12, backgroundColor: '#EEF3F8', color: COLORS.text },
  row: { flexDirection: 'row' }, cell: { width: 170, padding: 10, borderWidth: 1, borderColor: COLORS.line },
  figure: { width: '100%', gap: 6 }, image: { width: '100%', height: 220 },
  note: { color: COLORS.muted, fontSize: 13, lineHeight: 19 },
});
