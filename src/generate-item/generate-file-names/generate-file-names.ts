import { join } from 'path';

import { readDir } from '../file-utils';

export async function generateFileNames(templatesRoot: string, itemType: string, itemName: string) {
  const itemTemplatesDir = join(templatesRoot, itemType);
  const templateFileNames: string[] = await readDir(itemTemplatesDir);

  const regexp = new RegExp(`(.*)${itemType}(.*)`, 'g');
  const fileNamesToGenerate = templateFileNames.map((i) => i.replace(regexp, `$1${itemName}$2`).replace(/\.mustache$/g, ''));

  return {
    fileNamesToGenerate,
    itemTemplatesDir,
    templateFileNames,
  };
}
