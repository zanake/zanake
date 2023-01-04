import html2canvas from 'html2canvas';

interface Snapshot {
    quality: 0 | 1;
    element: HTMLElement;
    format: 'image/png' | 'image/jpeg';
}

export default async ({element, format, quality}: Snapshot): Promise<string | undefined> => {
    try {
        const canvas = await html2canvas(element);

        return canvas.toDataURL(format, quality);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
