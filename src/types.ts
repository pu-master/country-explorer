export interface Continent {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Country {
  name: string;
  code: string;
  capital: string;
  continent: Continent;
  emojiU: string;
  languages: Language[];
  currencies: string[];
}

export interface WeatherInfo {
  temperature: number;
  conditions: {
    id: number;
    description: string;
    icon: string;
  }[];
  timezone: number;
}
