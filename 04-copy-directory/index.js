const fsmodule = require("fs");
const pathmodule = require("path");

async function copyDir() {
  await fsmodule.promises.mkdir(pathmodule.resolve(__dirname, "files-copy"), {
    recursive: true,
  });

  let fileCopy = await fsmodule.promises.readdir(
    pathmodule.resolve(__dirname, "files-copy")
  );
  for (const file of fileCopy) {
    await fsmodule.promises.unlink(
      pathmodule.resolve(__dirname, "files-copy", file)
    );
  }

  let fileOrig = await fsmodule.promises.readdir(
    pathmodule.resolve(__dirname, "files")
  );
  for (const file of fileOrig) {
    await fsmodule.promises.copyFile(
      pathmodule.resolve(__dirname, "files", file),
      pathmodule.resolve(__dirname, "files-copy", file)
    );
  }
}
copyDir();
