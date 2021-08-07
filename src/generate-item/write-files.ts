import { join } from 'path';

import { render } from 'mustache';

import { mkDir, readFile, writeFile } from './file-utils';

export async function writeFiles({
    itemFolder,
    templateFileNames,
    itemTemplatesDir,
    dictionaryOfReplacements,
    fileNamesToGenerate,
}: WriteFilesPayload): Promise<void> {
    await mkDir(itemFolder, {
        recursive: true,
    });

    await Promise.all(
        templateFileNames.map(async (template, i) => {
            const fileContents = await readFile(join(itemTemplatesDir, template));
            const parsed = render(fileContents.toString(), dictionaryOfReplacements);
            const parsedFilePath = join(itemFolder, fileNamesToGenerate[i]);
            await writeFile(parsedFilePath, parsed);
        })
    );
}

interface WriteFilesPayload {
    dictionaryOfReplacements: Record<string, string>;
    fileNamesToGenerate: string[];
    itemFolder: string;
    itemTemplatesDir: string;
    templateFileNames: string[];
}
