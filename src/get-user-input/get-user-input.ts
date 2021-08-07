/* eslint-disable prefer-const */
import { join } from 'path';

import minimist, { ParsedArgs } from 'minimist';

import { FileNameCase } from '../shared/constants';
import { UserInput } from '../shared/models';
import { getItemFileNameFromPath } from './get-item-file-name-from-path';
import { getItemName } from './get-item-name';

export function getUserInput(): UserInput {
    const args = minimist(process.argv.slice(2)) as Args;

    let {
        _: [path],
        itemType,
        nameCase = 'PascalCase',
        templatesRoot = join(__dirname, '../templates/'),
        ...dictionaryOfReplacements
    } = args;

    const itemFolder = join(process.cwd(), `src/${path}`);
    const itemFileName = getItemFileNameFromPath(path);
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
}
