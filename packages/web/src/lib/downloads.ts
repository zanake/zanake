export default (url: string, name: string) : void => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = name;

    document.body.appendChild(anchor);

    // mock user `click` event
    anchor.click();

    // clean-up element from DOM
    document.body.removeChild(anchor);
}