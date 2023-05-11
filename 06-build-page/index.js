const fsmodule = require("fs");
const pathmodule = require("path");

async function buildProject() {
  await fsmodule.promises.mkdir(
    pathmodule.resolve(__dirname, "project-dist/assets"),
    {
      recursive: true,
    }
  );

  let cssFiles = await fsmodule.promises.readdir(
    pathmodule.resolve(__dirname, "styles"),
    {
      withFileTypes: true,
    }
  );
  let writeCssFile = fsmodule.createWriteStream(
    pathmodule.resolve(__dirname, "project-dist/style.css")
  );
  for (const file of cssFiles) {
    if (file.isFile() && pathmodule.extname(`${file.name}`) == ".css") {
      fsmodule
        .createReadStream(pathmodule.resolve(__dirname, `styles/${file.name}`))
        .pipe(writeCssFile, { end: false });
    }
  }

  const copyAssetsFolder = async (folder = "") => {
    let files = await fsmodule.promises.readdir(
      pathmodule.resolve(__dirname, `assets/${folder}`),
      {
        withFileTypes: true,
      }
    );
    for (const nextFile of files) {
      if (nextFile.isFile()) {
        await fsmodule.promises.copyFile(
          pathmodule.resolve(__dirname, `assets/${folder}`, nextFile.name),
          pathmodule.resolve(
            __dirname,
            `project-dist/assets/${folder}`,
            nextFile.name
          )
        );
      } else {
        await fsmodule.promises.mkdir(
          pathmodule.resolve(__dirname, `project-dist/assets/${nextFile.name}`),
          {
            recursive: true,
          }
        );
        await copyAssetsFolder(nextFile.name);
      }
    }
  };
  await copyAssetsFolder();

  let indexHtmlFiles = await fsmodule.promises.readdir(
    pathmodule.resolve(__dirname, "components"),
    {
      withFileTypes: true,
    }
  );
  let templateHtmlFile = await fsmodule.promises.readFile(
    pathmodule.resolve(__dirname, "template.html")
  );
  for (const file of indexHtmlFiles) {
    const extName = pathmodule.extname(`${file.name}`);
    const baseName = pathmodule.basename(`${file.name}`, `${extName}`);
    if (templateHtmlFile.includes(`{{${baseName}}}`)) {
      let compFile = await fsmodule.promises.readFile(
        pathmodule.resolve(__dirname, `components/${file.name}`)
      );
      templateHtmlFile = templateHtmlFile
        .toString()
        .replace(`{{${baseName}}}`, `${compFile}`);
    }
  }
  // write in index.html
  fsmodule
    .createWriteStream(pathmodule.resolve(__dirname, "project-dist/index.html"))
    .write(templateHtmlFile);
}

buildProject();
