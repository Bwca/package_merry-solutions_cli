/* eslint-disable prefer-const */
import { join } from 'path';

import minimist, { ParsedArgs } from 'minimist';

import { FileNameCase } from '../shared/constants';
import { UserInput } from '../shared/models';
import { getFolderName } from './get-folder-name';
import { getItemFileNameFromPath } from './get-item-file-name-from-path';
import { getItemName } from './get-item-name';

export function getUserInput(): UserInput {
    const args = minimist(process.argv.slice(2)) as Args;
    let {
        _: [path],
        itemType,
        folderPrefix,
        nameCase = 'PascalCase',
        templatesRoot = join(__dirname, '../templates/'),
        ...dictionaryOfReplacements
    } = args;

    const itemFileName = getItemFileNameFromPath(path);
    const itemFolder = join(process.cwd(), 'src', getFolderName(path, itemFileName, folderPrefix));
    const itemName = getItemName(itemFileName, nameCase);

    return {
        itemFolder,
        itemFileName,
        itemType,
        templatesRoot,
        dictionaryOfReplacements: { ...dictionaryOfReplacements, [itemType]: itemName, fileName: itemFileName },
    };
}

interface Args extends ParsedArgs {
    itemType: string;
    templatesRoot?: string;
    nameCase?: FileNameCase;
    folderPrefix?: string;
}
