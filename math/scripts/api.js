const config = {
    master_key: '$2a$10$DF8BMJ2BbiP.8ofi29d3RewcuiSIbXsPhB73DF325OSN.UR8r3aaO',
    collection_id: '659929101f5677401f184651',
    directus_root: 'http://16.171.148.215:8055' 
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