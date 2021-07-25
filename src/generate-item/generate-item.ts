import { UserInput } from '../shared/models';
import { writeFiles } from './write-files';
import { generateFileNames } from './generate-file-names';

export async function generateItem({ dictionaryOfReplacements, itemFolder, itemName, itemType, templatesRoot }: UserInput): Promise<void> {
  const { fileNamesToGenerate, itemTemplatesDir, templateFileNames } = await generateFileNames(templatesRoot, itemType, itemName);

  writeFiles({
    dictionaryOfReplacements,
    fileNamesToGenerate,
    itemFolder,
    itemTemplatesDir,
    templateFileNames,
  });
}
