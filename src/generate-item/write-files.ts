import { join } from 'path';

import { render } from 'mustache';

import { messageService } from '../message-service';
import { mkDir, readFile, writeFile } from './file-utils';

export async function writeFiles({
    itemFolder,
    templateFileNames,
    itemTemplatesDir,
    dictionaryOfReplacements,
    fileNamesToGenerate,
    subfoldersToGenerate,
}: WriteFilesPayload): Promise<void> {
    const folderPaths = [itemFolder].concat(subfoldersToGenerate.map((f) => join(itemFolder, f)));
    await Promise.all(folderPaths.map((f) => mkDir(f, { recursive: true })));

    messageService.out({
        text: `\nGenerated folders: \n${folderPaths.join('\n')}`,
        type: 'success',
    });

    const filePathsToGenerate = fileNamesToGenerate.map((f) => join(itemFolder, f));
    await Promise.all(
        templateFileNames.map(async (template, i) => {
            const fileContents = await readFile(join(itemTemplatesDir, template));
            const parsed = render(fileContents.toString(), dictionaryOfReplacements);
            await writeFile(filePathsToGenerate[i], parsed);
        })
    );

    messageService.out({
        text: `\nGenerated files: \n${filePathsToGenerate.join('\n')}`,
        type: 'success',
    });
}

interface WriteFilesPayload {
    dictionaryOfReplacements: Record<string, string>;
    fileNamesToGenerate: string[];
    itemFolder: string;
    itemTemplatesDir: string;
    templateFileNames: string[];
    subfoldersToGenerate: string[];
}
