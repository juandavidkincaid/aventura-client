import {b64enc} from '.';

// Download file utils

const downloadBase64 = async (base64Content: string, mime: string, filename: string) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${mime};base64,${base64Content}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export {
    downloadBase64
}