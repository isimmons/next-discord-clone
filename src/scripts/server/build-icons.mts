import path from 'node:path';
import fsExtra from 'fs-extra';
import { glob } from 'glob';
import { argv } from 'node:process';
import { parse } from 'node-html-parser';

const cwd = process.cwd();
const inputDir = path.join(cwd, 'src', 'assets', 'svg-icons');
const inputDirRelative = path.relative(cwd, inputDir);

const outputDir = path.join(cwd, 'public', 'icons');
const typesOutputDir = path.join(cwd, 'src', 'types');
await fsExtra.ensureDir(typesOutputDir);
await fsExtra.ensureDir(outputDir);

const files = glob
  .sync('**/*.svg', {
    cwd: inputDir,
  })
  .sort((a, b) => a.localeCompare(b));

const shouldVerboselog = argv.slice(2).includes('--log=verbose');

const logVerbose = shouldVerboselog ? console.log : () => {};

const getIconName = (file: string) => {
  return file.replace(/\.svg/, '');
};

const writeIfChanged = async (filePath: string, newContent: string) => {
  const currentContent = await fsExtra
    .readFile(filePath, 'utf-8')
    .catch(() => '');
  if (currentContent === newContent) {
    return false;
  }

  await fsExtra.writeFile(filePath, newContent, 'utf-8');
  return true;
};

const generateSvgSprite = async ({
  files,
  inputDir,
  outputDir,
}: {
  files: Array<string>;
  inputDir: string;
  outputDir: string;
}) => {
  const symbol = await Promise.all(
    files.map(async (file) => {
      const input = await fsExtra.readFile(path.join(inputDir, file), 'utf-8');
      const root = parse(input);
      const svg = root.querySelector('svg');
      if (!svg) throw new Error('No SVG element found');

      svg.tagName = 'symbol';
      svg.setAttribute('id', getIconName(file));

      // cleanup unnecessary attributes
      svg.removeAttribute('xmlns');
      svg.removeAttribute('xmlns:xlink');
      svg.removeAttribute('version');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.removeAttribute('fill');

      const svgPaths = svg.querySelectorAll('path');
      for (const path of svgPaths) {
        path.removeAttribute('fill');
      }

      return svg.toString().trim();
    }),
  );

  const output = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<!-- this file generated by npm build-icons -->',
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" >',
    '<defs>',
    ...symbol,
    '</defs>',
    '</svg>',
    '',
    '', //trailing new line plus space in between
  ].join('\n');

  return writeIfChanged(outputDir, output);
};

const generateIconFiles = async () => {
  const spriteFilePath = path.join(outputDir, 'sprite.svg');
  const typeOutputFilepath = path.join(typesOutputDir, 'svg-icons.ts');

  const currentSprite = await fsExtra
    .readFile(spriteFilePath, 'utf-8')
    .catch(() => '');

  const currentType = await fsExtra
    .readFile(typeOutputFilepath, 'utf-8')
    .catch(() => '');

  const iconNames = files.map((file) => getIconName(file));

  const spritesUpToDate = iconNames.every((name) =>
    currentSprite.includes(`id=${name}`),
  );

  const typesUpToDate = iconNames.every((name) =>
    currentType.includes(`${name}`),
  );

  if (spritesUpToDate && typesUpToDate) {
    logVerbose('Icons are up to date');
    return;
  }

  logVerbose(`Generating sprites for ${inputDirRelative} `);

  const spriteChanged = await generateSvgSprite({
    files,
    inputDir,
    outputDir: spriteFilePath,
  });

  for (const file of files) {
    logVerbose('✅', file);
  }

  logVerbose(`Saved to ${path.relative(cwd, spriteFilePath)}`);

  const stringifiedIconNames = iconNames.map((name) => JSON.stringify(name));

  const typeOutputContent = `// This file is generated by npm build-icons
  
  export type IconName =
  | ${stringifiedIconNames.join('\n\t| ')}
  `;

  const typesChanged = await writeIfChanged(
    typeOutputFilepath,
    typeOutputContent,
  );

  logVerbose(`Manifest saved to ${path.relative(cwd, typeOutputFilepath)}`);

  const readmeChanged = await writeIfChanged(
    path.join(outputDir, 'README.md'),
    `# Icons
    This directory contains SVG icons that are used by the app.
    Everything in this directory is generated by 'npm build:icons'.`,
  );

  if (spriteChanged || typesChanged || readmeChanged) {
    console.log(`Generated ${files.length} icons`);
  }
};

if (files.length < 1) {
  console.log(`No files found in ${inputDirRelative}`);
} else {
  await generateIconFiles();
}
