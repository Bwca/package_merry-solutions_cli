import { getUserInput } from './get-user-input';

describe('Tests for getUserInput', () => {
    beforeEach(() => {
        process.argv = ['', '', 'some-path/components/MyAwesomeComponent', '--itemType=component', '--templatesRoot=./templates'];
    });
    it('Should correctly parse arguments', () => {
        // Arrange
        const expected = {
            dictionaryOfReplacements: {
                component: 'MyAwesomeComponent',
            },
            itemName: 'MyAwesomeComponent',
            itemType: 'component',
            templatesRoot: './templates',
        };

        // Act
        const { itemFolder, ...args } = getUserInput();

        // Assert
        expect(args).toEqual(expected);
    });
});
