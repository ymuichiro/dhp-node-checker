const fs = require("fs");
const path = require("path");

// buildフォルダ配下のフォルダ有無を確認しなければ生成する
if (!fs.existsSync(path.resolve("build"))) {
  fs.mkdirSync(path.resolve("build"));
}

// build内のファイルを削除する
fs.readdir(path.resolve("build"), "utf-8", (err, files) => {
  files.filter(file => fs.statSync(path.resolve("public", file)).isFile()).forEach(v => {
    console.log("delete", "->", v);
    fs.unlinkSync(path.resolve("public", v));
  })
})



// Publicファイル内のコンテンツをbuildに移動する
console.log("copy the public files to build dir");
fs.readdir(path.resolve("public"), "utf-8", (err, files) => {
  files.filter(file => fs.statSync(path.resolve("public", file)).isFile() && !/.*\.html$/.test(file)).forEach(v => {
    console.log("COPY", "->", v);
    fs.copyFileSync(path.resolve("public", v), path.resolve("build", v));
  })
})
