# @zanake/mdx

### A utility to collect and parse the `meta object export` from [`.mdx`](https://mdxjs.com/) files in a given directory for [React](https://reactjs.org/) projects.

## Meta object export

This is what the parser will be expecting, to validate against `Typescript types / interfaces`. In the future we can support custom fields, that fit individual cases.

```javascript
export const meta = {
    title: '',
    published: true,
    date: 'YYYY-MM-dd',
    author: '',
    thumbnail: {
        src: '',
        source: {
            name: 'Free / paid image service',
            url: 'https://....',
        },
        artist: {
            name: 'John Doe',
            profile: 'https://....',
        },
    },
    labels: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', ...],
    excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula tristique nisl, vitae auctor mauris auctor in. Quisque a tincidunt nisl, eget auctor massa. Nullam lacus dui, mollis egestas mi eu, varius vehicula sapien',
};
```

## Development

This library was generated with [Nx](https://nx.dev), as part of a monorepo. Here are some commands to target this specific project in the repository.

| Action          | Command            |
| --------------- | ------------------ |
| Run unit tests  | **`nx test mdx`**  |
| Compile & build | **`nx build mdx`** |
