const fsmodule = require("fs");
const pathmodule = require("path");
const { stdin, stdout, exit } = require("process");
const output = fsmodule.createWriteStream(
  pathmodule.join(__dirname, "text.txt")
);
stdout.write("Введите произвольный текст:\n");
stdin.on("data", (res) => {
  if (res.toString().trim() !== "exit") {
    output.write(res);
  } else {
    exitProgramm();
  }
});
function exitProgramm() {
  stdout.write("\nИзменения сохранены в файл!\n");
  exit();
}
process.on("SIGINT", exitProgramm);
