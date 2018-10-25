export interface ICredentials {
  address: string;
  email: string;
  phone: string;
  phones?: string[];
  faxes?: string[];
  openingHours?: { day: string, hours: string }[];
}

export class Credentials implements ICredentials {
  address: string;
  email: string;
  phone: string;
  phones?: string[];
  faxes?: string[];
  openingHours?: { day: string, hours: string }[];
}
