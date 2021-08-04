import { join } from 'path';

import { readDir } from '../file-utils';

export async function generateFileNames({ fileName, itemType, templatesRoot }: GenerateFileNamesPayload): Promise<GenerateFileNamesReturn> {
    const itemTemplatesDir = join(templatesRoot, itemType);
    const templateFileNames: string[] = await readDir(itemTemplatesDir);

    const regexp = new RegExp(`(.*)${itemType}(.*)`, 'g');
    const fileNamesToGenerate = templateFileNames.map((i) => i.replace(regexp, `$1${fileName}$2`).replace(/\.mustache$/g, ''));

    return {
        fileNamesToGenerate,
        itemTemplatesDir,
        templateFileNames,
    };
}

export interface GenerateFileNamesPayload {
    fileName: string;
    itemType: string;
    templatesRoot: string;
}

interface GenerateFileNamesReturn {
    fileNamesToGenerate: string[];
    itemTemplatesDir: string;
    templateFileNames: string[];
}
