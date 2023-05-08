const pathmodule = require("path");
const file = pathmodule.join(__dirname, "./secret-folder");
const fsmodule = require("fs").promises;

async function getFilesInfo() {
  let filearr = [];
  filearr = await fsmodule.readdir(file, { withFileTypes: true });
  for (let i = 0; i < filearr.length; i++) {
    if (filearr[i].isFile() === true) {
      let stats = await fsmodule.stat(
        "03-files-in-folder/secret-folder/" + filearr[i].name
      );
      console.log(
        `${pathmodule.basename(
          filearr[i].name,
          pathmodule.extname(filearr[i].name)
        )} - ${pathmodule.extname(filearr[i].name).slice(1)} - ${
          stats.size
        } bytes`
      );
    }
  }
}
getFilesInfo();
