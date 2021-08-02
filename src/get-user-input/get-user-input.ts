/* eslint-disable prefer-const */
import { join } from 'path';

import minimist, { ParsedArgs } from 'minimist';

import { FileNameCase } from '../shared/constants';
import { UserInput } from '../shared/models';
import { getItemFileNameFromPath } from './get-item-file-name-from-path';
import { getFileName } from './get-item-name';

export function getUserInput(): UserInput {
    const args = minimist(process.argv.slice(2)) as Args;

    let {
        _: [path],
        itemType,
        itemFolder,
        itemFileName,
        templatesRoot,
        nameCase,
        ...dictionaryOfReplacements
    } = args;

    const currentWorkingDirectory = process.cwd();
    nameCase ??= 'Pascal';
    itemFolder ??= join(currentWorkingDirectory, `src/${path}`) ;
    itemFileName ??= getItemFileNameFromPath(path);
    templatesRoot ??=  join(__dirname, '../templates/');
    const itemName = getFileName(itemFileName, nameCase);

    return {
        itemParentFolder: itemFolder,
        itemFileName,
        itemType,
        templatesRoot,
        dictionaryOfReplacements: {...dictionaryOfReplacements, [itemType]: itemName}
    };
}

interface Args extends ParsedArgs {
  itemType: string;
  itemFolder?: string;
  itemFileName?: string;
  templatesRoot?: string;
  nameCase?: FileNameCase
}
