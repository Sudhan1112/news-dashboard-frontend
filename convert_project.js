import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = __dirname;

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'build' && file !== '.agent') {
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

console.log("Scanning files in " + rootDir);
const files = getAllFiles(rootDir);

files.forEach(filePath => {
    if ((filePath.endsWith('.ts') || filePath.endsWith('.tsx')) && !filePath.endsWith('.d.ts')) {
        const fileName = path.basename(filePath);
        if (fileName === 'convert_project.js') return;

        console.log(`Converting ${filePath}...`);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Check if file is mainly types/interfaces and might become empty
        // transpileModule will handle this, outputting empty file if no runtime code.

        const result = ts.transpileModule(fileContent, {
            compilerOptions: {
                target: ts.ScriptTarget.ESNext,
                module: ts.ModuleKind.ESNext,
                jsx: ts.JsxEmit.Preserve,
                removeComments: false
            }
        });

        let newContent = result.outputText;

        const newPath = filePath.replace(/\.tsx?$/, (match) => match === '.tsx' ? '.jsx' : '.js');

        fs.writeFileSync(newPath, newContent);
        fs.unlinkSync(filePath);
        console.log(`Created ${newPath}`);
    } else if (filePath.endsWith('.d.ts')) {
        console.log(`Deleting declaration file ${filePath}`);
        fs.unlinkSync(filePath);
    }
});
