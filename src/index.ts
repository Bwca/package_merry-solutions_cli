#!/usr/bin/env node

import { generateItem } from './generate-item';
import { getUserInput } from './get-user-input';

void (async function main() {
    const input = getUserInput();
    await generateItem(input);
})();
