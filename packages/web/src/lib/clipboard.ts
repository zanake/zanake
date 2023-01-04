const clipboard = (content: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const supported =
            typeof window.navigator !== 'undefined' &&
            typeof window.navigator.clipboard !== 'undefined' &&
            navigator.permissions !== undefined;

        if (supported) {
            const type = 'text/plain';
            const blob = new window.Blob([content], { type });
            const data = [new window.ClipboardItem({ [type]: blob })];

            navigator.clipboard.write(data).then(
                () => {
                    /* success */
                    console.debug(`navigator.clipboard updated successfully!`, content);
                    resolve();
                },
                () => {
                    /* failure */
                    console.debug(`navigator.clipboard update failed!`, content);

                    // recover with legacy APIs
                    const textarea = document.createElement('textarea');
                    textarea.value = content;
                    textarea.style.border = 'none';
                    textarea.style.outline = 'none';
                    textarea.style.boxShadow = 'none';
                    textarea.style.position = 'fixed';
                    textarea.style.background = 'transparent';
                    document.body.appendChild(textarea);

                    textarea.focus();
                    textarea.select();
                    textarea.setSelectionRange(0, 99999);

                    try {
                        document.execCommand('copy');
                        resolve();
                    } catch (error) {
                        console.debug(`Legacy 'copy' API failed`, error);
                        reject(new Error('None of clipboard updating methods are supported by this browser!'));
                    } finally {
                        document.body.removeChild(textarea);
                    }
                }
            );
        }
    });
};

export default clipboard;
