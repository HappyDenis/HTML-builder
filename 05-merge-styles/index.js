const fsmodule = require("fs");
const pathmodule = require("path");

async function mergeCSS() {
  let filesInFolder = await fsmodule.promises.readdir(
    pathmodule.resolve(__dirname, "styles"),
    {
      withFileTypes: true,
    }
  );
  let writeStr = fsmodule.createWriteStream(
    pathmodule.resolve(__dirname, "./project-dist/bundle.css")
  );
  for (const file of filesInFolder) {
    if (file.isFile() && pathmodule.extname(`${file.name}`) == ".css") {
      let readStr = fsmodule.createReadStream(
        pathmodule.resolve(__dirname, `./styles/${file.name}`)
      );
      readStr.pipe(writeStr, { end: false });
    }
  }
}
mergeCSS();
