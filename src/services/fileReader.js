
export function readFile(fileObj) {
    return new Promise(function(resolve, reject) {
        if (!fileObj) reject('No input file.');

        var reader = new FileReader();
        reader.onload = function(event) {
            resolve({name: fileObj.name, content: event.target.result});
        };
        reader.readAsBinaryString(fileObj);
    });
}

/*
 * returns Promise with fileContent (string) and fileObject (Object)
 */
export function getDbFileContent(dbFileObj) {
    return new Promise(function(resolve, reject) {
        let fileObj = dbFileObj.file;

        if (!fileObj) reject('No input file.');
        
        resolve(fileObj.content);
    });
}