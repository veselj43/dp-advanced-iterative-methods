
export function downloadFile(stringFileName, stringFileContent) {
    var a = document.createElement('A');
    a.href = "data:application/octet-stream;charset=utf-8;base64," + stringFileContent;
    a.download = stringFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
