#! node
!function(){const e=require("path"),{program:o}=require("commander"),{spawn:r,spawnSync:c}=require("child_process");if(o.option("--create","创建模板").option("--build <type>","build"),o.parse(process.argv),o.create){const o=require("fs-extra"),r=process.cwd(),s=require(e.resolve(r,"package.json")),n=require("./template/package.json"),i=require("./template/projectToSubPackageConfig");s.scripts={...n.scripts,...s.scripts||{}},s.dependencies={...n.dependencies,...s.dependencies||{}},o.copySync(e.resolve(__dirname,"template/projectToSubPackageConfig.js"),e.resolve(r,"projectToSubPackageConfig.js")),console.log("projectToSubPackageConfig植入成功"),o.writeJsonSync(e.resolve(r,"package.json"),s,{spaces:2}),console.log("package.json更新成功"),o.mkdirsSync(e.resolve(r,i.mainWeixinMpPath)),console.log("projectToSubPackageConfig.mainWeixinMpPath创建成功");c("win32"===process.platform?"npm.cmd":"npm",["install","concurrently","cross-env","-S"],{cwd:process.cwd(),stdio:"inherit"});return}let s={development:"startToPackServe",production:"mpWxSubMode"};if(s[o.build]){require("readline"),r(process.execPath,[require.resolve("gulp/bin/gulp.js"),s[o.build],"--scope",process.cwd()],{cwd:__dirname,stdio:"inherit"})}else console.log("缺少参数\n--create\n--build [development/production]")}();