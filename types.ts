export type InputWord = {
} & Record<string, string>;

export type Word = {
  title: string;
  tema1: string;
  bane: string
  bildeA: string
  bildeB: string
  bildeC: string
  elementtype: string
  undertema1: string
  translations: Map<string, string>;
}

export type Language = {
  name: string;
  code: string;
  rtl: boolean;
}

export type Topic = Word &{
  subTopics?: Map<string,Topic>
}
