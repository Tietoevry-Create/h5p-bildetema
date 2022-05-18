export type Word = {
  Title: string;
  Tema1: string;
} & Record<string, string>;

export type Language = {
  Name: string;
  Code: string;
  Rtl: boolean;
}

export type Theme = {
  Title: string;
  SubThemes?: Map<string,Theme>
} & Record<string, string>;
