interface Base {
    item: string;
}

export interface Label {
    name: string;
    slug: string;
    href: string;
}

export interface Artist {
    name: string;
    profile: string;
}

export interface Source {
    url: string;
    name: string;
}

export interface Thumbnail {
    src: string;
    href: string;
    source: Source;
    artist: Artist;
}

export interface Meta {
    date: string;
    title: string;
    author: string;
    excerpt: string;
    published: string;
    thumbnail: Thumbnail;
    labels: Array<Label>;
}

export interface FileMeta extends Base {
    meta: Meta;
    type: 'file';
    slug: string;
    href: string;
}

export interface DirMeta extends Base {
    type: 'directory';
    children: Array<FileMeta>;
}
