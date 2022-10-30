export default (content: string) : Promise<void> => {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(content);
    } else {
        // text area method
        const textArea = document.createElement("textarea");

        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        textArea.value = content;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise(() :void => {
            // here the magic happens
            document.execCommand('copy') ? Promise.resolve() : Promise.reject();
            textArea.remove();
        });
    }
}