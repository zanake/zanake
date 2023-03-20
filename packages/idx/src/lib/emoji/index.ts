export interface IStats {
    groups: any;
    total: number;
    component: number;
    skin_tone_variations: number;
    dual_skin_tone_support: number;
    total_without_skin_tone_variations?: number;
}

export interface ICatalogue {
    [key: string]: {
        name: string;
        slug: string;
        group: string;
        emoji_version: string;
        unicode_version: string;
        skin_tone_support: boolean;
        skin_tone_support_unicode_version?: string;
    };
}

export interface IGroupings {
    name: string;
    slug: string;
    emojis: {
        name: string;
        slug: string;
        emoji: string;
        emoji_version: string;
        unicode_version: string;
        skin_tone_support: boolean;
        skin_tone_support_unicode_version?: string;
    }[];
}

export interface IComponents {
    [key: string]: string;
}