const config = {
    master_key: '$2a$10$DF8BMJ2BbiP.8ofi29d3RewcuiSIbXsPhB73DF325OSN.UR8r3aaO',
    collection_id: '659929101f5677401f184651',
    root: 'https://api.jsonbin.io/v3' 
}

let fileIds = [];

const connection = {
    getFilesList: function() {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    fileIds = JSON.parse(req.responseText).map(e => {return {record: e.record, createdAt: e.createdAt}});
                    resolve(fileIds);
                } else if(req.readyState >= 400 && req.readyState <= 403) {
                    reject(req.responseText.message)
                }
            };

            req.open("GET", `https://api.jsonbin.io/v3/c/${config.collection_id}/bins`, true);
            req.setRequestHeader("X-Master-Key", config.master_key);
            req.send();
        })
    },
    getFile: function(fileId) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    resolve(req.responseText);
                } else if(req.readyState >= 400 && req.readyState <= 403) {
                    reject(req.responseText.message)
                }
            };

            req.open("GET", `https://api.jsonbin.io/v3/b/${fileId}/latest`, true);
            req.setRequestHeader("X-Master-Key", config.master_key);
            req.send();
        })
    },
    saveFile: function(fileName, fileText) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();

            req.onreadystatechange = () => {
                if (req.readyState == XMLHttpRequest.DONE) {
                    resolve(req.responseText);
                } else if(req.readyState >= 400 && req.readyState <= 403) {
                    reject(req.responseText.message)
                }
            };
            
            // SAVE EXISTING OR CREATE FILE HERE
            if(!selectedFile) {
                req.open("POST", "https://api.jsonbin.io/v3/b", true);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("X-Master-Key", config.master_key);
                req.setRequestHeader("X-Collection-Id", config.collection_id);
                req.setRequestHeader("X-Bin-Name", fileName);
            } else {
                req.open("PUT", `https://api.jsonbin.io/v3/b/${selectedFile}`, true);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("X-Master-Key", config.master_key);
            }
            
            req.send(fileText);
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

            // DELETE FILE HERE
        })
    }
}