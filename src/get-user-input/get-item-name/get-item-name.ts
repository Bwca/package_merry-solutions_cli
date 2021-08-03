import { FileNameCase } from '../../shared/constants';

export function getItemName(itemName: string, fileNameCase: FileNameCase): string {
    switch (fileNameCase) {
        case 'camelCase': {
            return itemName.replace(/(-(\w)|(^\w))/g, (_, letterAfterDash, firstLetter) => {
                return ((firstLetter?.toLowerCase()) || letterAfterDash?.toUpperCase());
            });
        }

        case 'PascalCase': {
            return itemName.replace(/(-(\w)|(^\w))/g, (_, letterAfterDash, firstLetter) => {
                return (firstLetter || letterAfterDash).toUpperCase();
            });
        }
    }
}
