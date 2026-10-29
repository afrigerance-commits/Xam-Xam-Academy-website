/** Format de lecture partagé par l'API et les composants React Native. */
export type CourseNode = {
  type: string;
  value?: string;
  depth?: number;
  ordered?: boolean;
  start?: number | null;
  checked?: boolean | null;
  url?: string;
  alt?: string;
  title?: string | null;
  name?: string;
  label?: string;
  svg?: string;
  width?: number;
  height?: number;
  children?: CourseNode[];
};
export type CourseContent = { version: 1; nodes: CourseNode[] };
