import { getUserInput } from './get-user-input';

describe('Tests for getUserInput', () => {
    beforeEach(() => {
        process.argv = ['', '', 'some-path/components/MyAwesomeComponent', '--itemType=component', '--templatesRoot=./templates'];
    });
    it('Should correctly parse dictionaryOfReplacements', () => {
        // Arrange
        const expectedDictionaryOfReplacements = {
            fileName: 'MyAwesomeComponent',
        };

        // Act
        const { dictionaryOfReplacements } = getUserInput();

        // Assert
        expect(dictionaryOfReplacements).toEqual(expectedDictionaryOfReplacements);
    });
    it('Should correctly parse itemType', () => {
        // Arrange
        const expectedItemType = 'component';

        // Act
        const { itemType } = getUserInput();

        // Assert
        expect(itemType).toEqual(expectedItemType);
    });
    it('Should correctly parse itemName', () => {
        // Arrange
        const expectedItemName = 'MyAwesomeComponent';

        // Act
        const { itemFileName: itemName } = getUserInput();

        // Assert
        expect(itemName).toEqual(expectedItemName);
    });
    it('Should correctly parse templatesRoot', () => {
        // Arrange
        const expectedTemplatesRoot = './templates';

        // Act
        const { templatesRoot } = getUserInput();

        // Assert
        expect(templatesRoot).toEqual(expectedTemplatesRoot);
    });
});
