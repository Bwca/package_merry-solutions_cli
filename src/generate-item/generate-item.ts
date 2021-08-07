import { UserInput } from '../shared/models';
import { generateFileNames } from './generate-file-names';
import { writeFiles } from './write-files';

export async function generateItem({
    dictionaryOfReplacements,
    itemFolder,
    itemType,
    templatesRoot,
    itemFileName,
}: UserInput): Promise<void> {
    const { fileNamesToGenerate, itemTemplatesDir, templateFileNames } = await generateFileNames({
        templatesRoot,
        itemType,
        fileName: itemFileName,
    });

    writeFiles({
        dictionaryOfReplacements,
        fileNamesToGenerate,
        itemFolder,
        itemTemplatesDir,
        templateFileNames,
    });
}
