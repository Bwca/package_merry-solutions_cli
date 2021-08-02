import { FileNameCase } from '../../shared/constants';

export function getFileName(itemName: string, fileNameCase: FileNameCase): string {
    switch (fileNameCase) {
        case 'kebab': {
            return [itemName[0].toLowerCase(), ...itemName.split('').slice(1)]
                .map((i) => (/[A-Z]/.test(i) ? `-${i.toLowerCase()}` : i))
                .join('')
                .replace(/-+/g, '-');
        }

        case 'Pascal': {
            return itemName.replace(/(-(\w)|(^\w))/g, (_, letterAfterDash, firstLetter) => {
                return (firstLetter || letterAfterDash).toUpperCase();
            });
        }
    }
}
