import { FileNameCase } from '../../shared/constants';

export function getItemName(itemName: string, fileNameCase: FileNameCase): string {
    switch (fileNameCase) {
        case 'camelCase': {
            return itemName.replace(/(^\w)|([-_](\w))/g, (_, firstLetter, __, letterAfterDash) => {
                return firstLetter?.toLowerCase() || letterAfterDash?.toUpperCase();
            });
        }

        case 'PascalCase': {
            return itemName.replace(/([-_](\w)|(^\w))/g, (_, letterAfterDash, firstLetter) => {
                return (firstLetter || letterAfterDash).toUpperCase();
            });
        }
    }
}
