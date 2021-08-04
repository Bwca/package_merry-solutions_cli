import { join } from 'path';

import { render } from 'mustache';

import { mkDir, readFile, writeFile } from './file-utils';

export async function writeFiles({
    itemParentFolder,
    templateFileNames,
    itemTemplatesDir,
    dictionaryOfReplacements,
    fileNamesToGenerate,
}: WriteFilesPayload): Promise<void> {
    await mkDir(itemParentFolder, {
        recursive: true,
    });

    await Promise.all(
        templateFileNames.map(async (template, i) => {
            const fileContents = await readFile(join(itemTemplatesDir, template));
            const parsed = render(fileContents.toString(), dictionaryOfReplacements);
            const parsedFilePath = join(itemParentFolder, fileNamesToGenerate[i]);
            await writeFile(parsedFilePath, parsed);
        })
    );
}

interface WriteFilesPayload {
    dictionaryOfReplacements: Record<string, string>;
    fileNamesToGenerate: string[];
    itemParentFolder: string;
    itemTemplatesDir: string;
    templateFileNames: string[];
}
