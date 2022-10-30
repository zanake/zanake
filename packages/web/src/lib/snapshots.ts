import html2canvas from 'html2canvas';

type imageFormats = 'image/png' | 'image/jpeg';

export default async (reference: string, format: imageFormats = 'image/png', quality: number) : Promise<string|undefined> => {
    let image;
    const subject = document.getElementById(reference);
    
    try {
        if (subject !== null) {
            const canvas = await html2canvas(subject);
    
            image = canvas.toDataURL(format, quality);
        }

        throw new ReferenceError(`Element with the id ${reference} was not found`);
    } catch (error) {
        console.log(error);
    }

    return image;
}
