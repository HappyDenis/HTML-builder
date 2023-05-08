const fsmodule = require("fs");
const pathmodule = require("path");
const readStream = fsmodule.createReadStream(
  pathmodule.join(__dirname, "text.txt"),
  "utf-8"
);
readStream.pipe(process.stdout);
/*readStream.on("data", (res) => {
  console.log(res);
});*/
