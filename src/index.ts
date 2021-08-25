#!/usr/bin/env node

import { dieOnError } from './die-on-error';
import { generateItem } from './generate-item';
import { getUserInput } from './get-user-input';

void (async function main() {
    try {
        const input = getUserInput();
        await generateItem(input);
    } catch (e) {
        dieOnError(e);
    }
})();
