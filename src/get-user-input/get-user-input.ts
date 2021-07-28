/* eslint-disable prefer-const */
import { join } from 'path';

import minimist, { ParsedArgs } from 'minimist';

import { UserInput } from '../shared/models';
import { getItemNameFromPath } from './get-item-name-from-path';

export function getUserInput(): UserInput {
    const args = minimist(process.argv.slice(2)) as Args;

    let {
        _: [path],
        itemType,
        itemFolder,
        itemName,
        templatesRoot,
        ...dictionaryOfReplacements
    } = args;

    const currentWorkingDirectory = process.cwd();
    itemFolder ??= join(currentWorkingDirectory, `src/${path}`) ;
    itemName ??= getItemNameFromPath(path);
    templatesRoot ??=  join(__dirname, '../templates/');

    return {
        itemFolder,
        itemName,
        itemType,
        templatesRoot,
        dictionaryOfReplacements: {...dictionaryOfReplacements, [itemType]: itemName}
    };
}

interface Args extends ParsedArgs {
  itemType: string;
  itemFolder?: string;
  itemName?: string;
  templatesRoot?: string;
}
