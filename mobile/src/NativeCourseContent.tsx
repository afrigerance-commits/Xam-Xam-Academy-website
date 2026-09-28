import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './theme';

type Token =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'equation'; text: string }
  | { type: 'bullet'; text: string }
  | { type: 'number'; number: string; text: string }
  | { type: 'custom'; kind: string; body: string };

const BLOCK_TITLES: Record<string, string> = {
  retenir: 'À retenir',
  correction: 'Correction',
  definition: 'Définition',
  methode: 'Méthode',
  attention: 'Attention',
  exemple: 'Exemple',
};

function isSpecial(line: string) {
  const trimmed = line.trim();
  return (
    trimmed === '$$' ||
    /^:::\w+/.test(trimmed) ||
    /^#{2,3}\s+/.test(trimmed) ||
    /^[-*]\s+/.test(trimmed) ||
    /^\d+\.\s+/.test(trimmed)
  );
}

function parseBlocks(markdown: string): Token[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const tokens: Token[] = [];
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i += 1;
      continue;
    }

    const customMatch = line.match(/^:::(\w+)$/);
    if (customMatch) {
      const kind = customMatch[1];
      i += 1;
      const body: string[] = [];
      while (i < lines.length && lines[i].trim() !== ':::') {
        body.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      tokens.push({ type: 'custom', kind, body: body.join('\n') });
      continue;
    }

    if (line === '$$') {
      i += 1;
      const body: string[] = [];
      while (i < lines.length && lines[i].trim() !== '$$') {
        body.push(lines[i].trim());
        i += 1;
      }
      if (i < lines.length) i += 1;
      tokens.push({ type: 'equation', text: body.join(' ') });
      continue;
    }

    const heading = line.match(/^(##|###)\s+(.+)$/);
    if (heading) {
      tokens.push({
        type: 'heading',
        level: heading[1] === '##' ? 2 : 3,
        text: heading[2],
      });
      i += 1;
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      tokens.push({ type: 'bullet', text: bullet[1] });
      i += 1;
      continue;
    }

    const number = line.match(/^(\d+)\.\s+(.+)$/);
    if (number) {
      tokens.push({ type: 'number', number: number[1], text: number[2] });
      i += 1;
      continue;
    }

    const paragraph = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !isSpecial(lines[i])) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    tokens.push({ type: 'paragraph', text: paragraph.join(' ') });
  }

  return tokens;
}

function prettyMath(value: string) {
  return value
    .replace(/\\boxed\{([^{}]+)\}/g, '$1')
    .replace(/\\text\{([^{}]+)\}/g, '$1')
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1) / ($2)')
    .replace(/\\times/g, '×')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\\cdot/g, '·')
    .replace(/\\,/g, ' ')
    .replace(/\\ /g, ' ')
    .replace(/\{,\}/g, ',')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function inlineNodes(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\$[^$]+\$)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={index} style={styles.bold}>
          {part.slice(2, -2)}
        </Text>
      );
    }

    if (part.startsWith('$') && part.endsWith('$')) {
      return (
        <Text key={index} style={styles.inlineMath}>
          {prettyMath(part.slice(1, -1))}
        </Text>
      );
    }

    return <Text key={index}>{part}</Text>;
  });
}

function CustomBlock({ kind, body }: { kind: string; body: string }) {
  const title = BLOCK_TITLES[kind] ?? kind;
  const style =
    kind === 'correction'
      ? styles.customCorrection
      : kind === 'attention'
        ? styles.customAttention
        : kind === 'methode'
          ? styles.customMethod
          : styles.customDefault;

  return (
    <View style={[styles.custom, style]}>
      <Text style={styles.customTitle}>{title}</Text>
      <View style={styles.customBody}>
        <NativeCourseContent markdown={body} nested />
      </View>
    </View>
  );
}

export function NativeCourseContent({
  markdown,
  nested = false,
}: {
  markdown: string;
  nested?: boolean;
}) {
  const tokens = parseBlocks(markdown);

  return (
    <View style={[styles.root, nested && styles.rootNested]}>
      {tokens.map((token, index) => {
        if (token.type === 'heading') {
          return (
            <Text key={index} style={token.level === 2 ? styles.h2 : styles.h3}>
              {inlineNodes(token.text)}
            </Text>
          );
        }

        if (token.type === 'equation') {
          return (
            <View key={index} style={styles.equation}>
              <Text selectable style={styles.equationText}>
                {prettyMath(token.text)}
              </Text>
            </View>
          );
        }

        if (token.type === 'bullet') {
          return (
            <View key={index} style={styles.listRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.body}>{inlineNodes(token.text)}</Text>
            </View>
          );
        }

        if (token.type === 'number') {
          return (
            <View key={index} style={styles.listRow}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{token.number}</Text>
              </View>
              <Text style={styles.body}>{inlineNodes(token.text)}</Text>
            </View>
          );
        }

        if (token.type === 'custom') {
          return <CustomBlock key={index} kind={token.kind} body={token.body} />;
        }

        return (
          <Text key={index} selectable style={styles.body}>
            {inlineNodes(token.text)}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: 13 },
  rootNested: { gap: 10 },
  h2: {
    color: COLORS.navy,
    fontSize: 22,
    lineHeight: 29,
    fontWeight: '900',
    marginTop: 10,
  },
  h3: {
    color: COLORS.navy,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '900',
    marginTop: 6,
  },
  body: {
    flex: 1,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 24,
  },
  bold: { fontWeight: '900', color: COLORS.navy },
  inlineMath: {
    fontWeight: '800',
    color: COLORS.navy,
    fontFamily: 'monospace',
  },
  equation: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#F5F7FB',
    borderWidth: 1,
    borderColor: COLORS.line,
    alignItems: 'center',
  },
  equationText: {
    color: COLORS.navy,
    fontSize: 17,
    lineHeight: 25,
    fontFamily: 'monospace',
    fontWeight: '700',
    textAlign: 'center',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
  },
  bullet: {
    color: COLORS.gold,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '900',
  },
  numberBadge: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: '#EEF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { color: COLORS.blue, fontWeight: '900', fontSize: 12 },
  custom: {
    borderRadius: 17,
    padding: 15,
    borderWidth: 1,
    gap: 10,
  },
  customDefault: {
    backgroundColor: '#FFF8E5',
    borderColor: '#F4DB92',
  },
  customCorrection: {
    backgroundColor: '#EEF9F3',
    borderColor: '#BFE8D1',
  },
  customAttention: {
    backgroundColor: '#FFF0EE',
    borderColor: '#F1C4BE',
  },
  customMethod: {
    backgroundColor: '#EEF4FF',
    borderColor: '#C9D8FF',
  },
  customTitle: {
    color: COLORS.navy,
    fontSize: 14,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  customBody: { gap: 8 },
});
