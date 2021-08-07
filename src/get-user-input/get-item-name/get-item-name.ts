import { FileNameCase } from '../../shared/constants';

export function getItemName(fileName: string, itemNameCase: FileNameCase): string {
    if (!/[-_]/.test(fileName)) {
        return fileName;
    }

    switch (itemNameCase) {
        case 'camelCase': {
            return fileName.replace(/(^\w)|([-_](\w))/g, (_, firstLetter, __, letterAfterDash) => {
                return firstLetter?.toLowerCase() || letterAfterDash?.toUpperCase();
            });
        }

        case 'PascalCase': {
            return fileName.replace(/([-_](\w)|(^\w))/g, (_, letterAfterDash, firstLetter) => {
                return (firstLetter || letterAfterDash).toUpperCase();
            });
        }
    }
}
