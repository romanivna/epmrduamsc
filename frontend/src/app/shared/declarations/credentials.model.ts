export interface OpeningHours {
  day: string;
  hours: string;
}

export interface Credentials {
  address: string;
  email: string;
  phone: string;
  phones?: string[];
  faxes?: string[];
  openingHours?: OpeningHours[];
}
