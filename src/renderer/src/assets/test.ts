import { readdirSync, statSync, writeFileSync } from "fs";
import path from "path";


// 你的目标目录路径
const targetDirectory = 'src/renderer/src/assets/Expression';

// 获取目录下的所有文件和子目录
const items = readdirSync(targetDirectory);

// 过滤出文件
const fileList = items.filter(item => statSync(path.join(targetDirectory, item)).isFile());

const outputPath = 'fileList.json';
writeFileSync(outputPath, JSON.stringify(fileList, null, 2));
