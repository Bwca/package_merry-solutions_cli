import { join } from 'path';

import { render } from 'mustache';

import { readDir, mkDir, readFile, writeFile } from './file-utils';
import { getTemplateFolderName } from './get-template-folder-name';
import { UserInput } from '../shared/models';

export async function generateItem({ templatesRootFolder, itemType, itemName, itemFolder }: UserInput): Promise<void> {
  const typeName = getTemplateFolderName(itemType);
  const itemTemplatesDir = join(templatesRootFolder, typeName);
  const templateFilNames = await readDir(itemTemplatesDir);

  const regexp = new RegExp(`^${typeName}(.+)$`, 'g');
  const fileNamesToGenerate = templateFilNames.map((i) => i.replace(regexp, `${itemName}$1`).replace(/\.mustache$/g, ''));

  mkDir(itemFolder, {
    recursive: true,
  });

  templateFilNames.forEach(async (template, i) => {
    const fileContents = await readFile(join(itemTemplatesDir, template));
    const parsed = render(fileContents.toString(), {
      [typeName]: itemName,
    });
    const parsedFilePath = join(itemFolder, fileNamesToGenerate[i]);
    writeFile(parsedFilePath, parsed);
  });
}
