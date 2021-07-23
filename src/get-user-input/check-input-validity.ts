import { InputValidator } from './type-validator';

export function checkInputValidity({ command, itemType, item }: Input) {
  return InputValidator.checkCommand.test(command) && InputValidator.checkType.test(itemType) && !!item;
}

interface Input {
  command: string;
  itemType: string;
  item: string;
}


