import { join } from 'path';

import { messageService } from '../../message-service';

import { readDir } from '../file-utils';

export async function generateFileNames({ fileName, itemType, templatesRoot }: GenerateFileNamesPayload): Promise<GenerateFileNamesReturn> {
    const itemTemplatesDir = join(templatesRoot, itemType);
    let templateFileNames: string[] = [];
    let fileNamesToGenerate: string[] = [];
    let subfoldersToGenerate: string[] = [];

    const regexp = new RegExp(`${itemType}`, 'g');
    const swapPlaceHolderForFileName = (i: string) => i.replace(regexp, `${fileName}`);

    await traverseDir(itemTemplatesDir);

    async function traverseDir(dir: string, fileSubdir = './'): Promise<void> {
        const items = await readDir(dir);
        const { dirs, files } = items.reduce(
            (a, f) => {
                if (/mustache$/.test(f)) {
                    a.files.push(f);
                } else {
                    a.dirs.push(f);
                }
                return a;
            },
            { dirs: [], files: [] } as { dirs: string[]; files: string[] }
        );

        templateFileNames = templateFileNames.concat(files);

        const filesForGeneration = files
            .map((f) => join(fileSubdir, f))
            .map((f) => f.replace(/\\/g, '/'))
            .map(swapPlaceHolderForFileName)
            .map((f) => f.replace(/\.mustache$/g, ''));

        fileNamesToGenerate = fileNamesToGenerate.concat(filesForGeneration);
        subfoldersToGenerate = subfoldersToGenerate.concat(dirs.map(swapPlaceHolderForFileName));

        await Promise.all(dirs.map((d) => traverseDir(join(dir, d), join(fileSubdir, d))));
    }

    messageService.out({
        text: `File names to generate:\n\n${fileNamesToGenerate.join('\n')}`,
        type: 'info',
    });

    if (subfoldersToGenerate.length) {
        messageService.out({
            text: `Subfolders to generate:\n\n${subfoldersToGenerate.join('\n')}`,
            type: 'info',
        });
    }

    return {
        fileNamesToGenerate,
        itemTemplatesDir,
        templateFileNames,
        subfoldersToGenerate,
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
    subfoldersToGenerate: string[];
}
