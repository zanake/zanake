interface Download {
    filename: string;
    base64Data: string;
}

const download = ({ filename, base64Data }: Download): void => {
    const extension = base64Data.split(';')[0].split('/')[1];

    if (filename !== undefined && filename.trim().length !== 0) {
        filename =
            filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).trim().length === 0
                ? `${filename}.${extension}`
                : filename;
    }

    filename = `${Date.now()}.${extension}`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = base64Data;

    document.body.appendChild(link);

    // mock user `click` event
    link.click();

    // clean-up element from DOM
    document.body.removeChild(link);
};

export default download;