import { join } from 'path';

import { render } from 'mustache';

import { readDir, mkDir, readFile, writeFile } from './file-utils';
import { UserInput } from '../shared/models';

export async function generateItem({ dictionaryOfReplacements, itemFolder, itemName, itemType, templatesRoot }: UserInput): Promise<void> {
  const itemTemplatesDir = join(templatesRoot, itemType);
  const templateFileNames = await readDir(itemTemplatesDir);

  const regexp = new RegExp(`^${itemType}(.+)$`, 'g');
  const fileNamesToGenerate = templateFileNames.map((i) => i.replace(regexp, `${itemName}$1`).replace(/\.mustache$/g, ''));

  mkDir(itemFolder, {
    recursive: true,
  });

  templateFileNames.forEach(async (template, i) => {
    const fileContents = await readFile(join(itemTemplatesDir, template));
    const parsed = render(fileContents.toString(), dictionaryOfReplacements);
    const parsedFilePath = join(itemFolder, fileNamesToGenerate[i]);
    writeFile(parsedFilePath, parsed);
  });
}
