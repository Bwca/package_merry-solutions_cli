import { getUserInput } from './get-user-input';
import { generateItem } from './generate-item';

void (async function main() {
  const input = getUserInput();
  generateItem(input);
})();
