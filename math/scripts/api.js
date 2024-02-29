const config = {
    //TODO: wystawić directusa na https
    directus_root: 'http://13.51.196.37:8055'
}

let fileIds = [];

const directus_connection = {
    getFile: function(fileId) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    resolve(JSON.parse(req.responseText).data);
                } else if(req.readyState >= 400 && req.readyState <= 403) {
                    reject(req.responseText.message)
                }
            };

            req.open("GET",
                `${config.directus_root}/items/files/${fileId}` +
                `?fields[]=name` +
                `&fields[]=content`
            ,true);
            req.send();
        })
    },
    getFilesList: function() {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    resolve(JSON.parse(req.responseText).data);
                } else if(req.readyState >= 400 && req.readyState <= 403) {
                    reject(req.responseText.message)
                }
            };

            req.open("GET",
                `${config.directus_root}/items/files?limit=-1` + 
                `&fields[]=id` +
                `&fields[]=name` +
                `&fields[]=created`,
            true);
            req.send();
        })
    },
    saveFile: function(fileName, fileText) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    selectedFile = JSON.parse(req.responseText).data.id;
                    selectedFileName = JSON.parse(req.responseText).data.name;
                    resolve(req.responseText);
                } else if(req.readyState >= 400 && req.readyState <= 403) {
                    reject(req.responseText.message)
                }
            };

            if(!selectedFile) {
                req.open("POST", `${config.directus_root}/items/files`, true);
                req.setRequestHeader("Content-Type", "application/json");
            } else {
                req.open("PATCH", `${config.directus_root}/items/files/${selectedFile}`, true);
                req.setRequestHeader("Content-Type", "application/json");
            }
            
            req.send(JSON.stringify({
                "name": fileName,
                "content": JSON.stringify(fileText)
            }));
        })
    },
    deleteFile: function(fileId) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    resolve(req.responseText);
                } else if(req.readyState >= 400 && req.readyState <= 403) {
                    reject(req.responseText.message)
                }
            };

            req.open("DELETE", `${config.directus_root}/items/files/${fileId}`, true);
            req.send();
        })
    }
}