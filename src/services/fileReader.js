/*
 * returns Promise with fileContent (string) and fileObject (Object)
 */
export function getDbFileContent(dbFileObj) {
    return new Promise(function(resolve, reject) {
        let fileObj = dbFileObj.file;

        if (!fileObj) reject('No input file.');

        if (dbFileObj.type === 'file') {
            var reader = new FileReader();

            reader.onload = function(event) {
                resolve(event.target.result);
            };
            reader.readAsBinaryString(fileObj);
        }

        if (dbFileObj.type === 'string') {
            resolve(fileObj.content);
        }
    });
}