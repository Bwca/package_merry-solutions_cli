import { UserInput } from '../shared/models';
import { generateFileNames } from './generate-file-names';
import { writeFiles } from './write-files';

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
