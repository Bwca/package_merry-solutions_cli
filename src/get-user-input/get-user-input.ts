import { join } from 'path';

import { UserInput } from '../shared/models';
import { checkInputValidity } from './check-input-validity';

export function getUserInput(): UserInput {
  const command = process.argv[2];
  const unit = process.argv[3];
  const item = process.argv[4];

  if (!checkInputValidity({ command, itemType: unit, item })) {
    throw 'You might want to read the manual, your command made no sense.';
  }

  const componentFolder = `src/${item}`;
  const currentWorkingDirectory = process.cwd();
  const { itemName } = item.match(/\/?(?<itemName>[^\/]+)$/)?.groups as { itemName: string };

  return {
    itemFolder: join(currentWorkingDirectory, componentFolder),
    itemName,
    itemType: unit,
    templatesRootFolder: `${__dirname}/../../templates/`,
  };
}
