export interface ISocialLink {
    name: string;
    link: string;
    faIcon: string;
}

export class SocialLink implements ISocialLink {
    name: string;
    link: string;
    faIcon: string;
}

export type SocialLinks = ISocialLink[];
