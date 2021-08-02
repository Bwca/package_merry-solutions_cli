import { getFileName } from './get-item-name';

describe('Tests for getFileName', () => {
    it('Given Pascal argument should return file name without any dashes in PascalCase', () => {
        // Arrange
        const itemName = 'my-cool-component';
        const expectedName = 'MyCoolComponent';

        // Act
        const fileName = getFileName(itemName, 'Pascal');

        // Assert
        expect(fileName).toEqual(expectedName);
    });
    it('Given kebab argument should return file name any capital letters, in kebab case', () => {
        // Arrange
        const itemName = 'MyCoolComponent';
        const expectedName = 'my-cool-component';

        // Act
        const fileName = getFileName(itemName, 'kebab');

        // Assert
        expect(fileName).toEqual(expectedName);
    });
    it('Given kebab argument should return file name any capital letters, in kebab case', () => {
        // Arrange
        const itemName = 'useMyCoolHook';
        const expectedName = 'use-my-cool-hook';

        // Act
        const fileName = getFileName(itemName, 'kebab');

        // Assert
        expect(fileName).toEqual(expectedName);
    });
    it('Given kebab argument should return file name any capital letters, in kebab case without double kebabs', () => {
        // Arrange
        const itemName = 'my-cool-component';
        const expectedName = 'my-cool-component';

        // Act
        const fileName = getFileName(itemName, 'kebab');

        // Assert
        expect(fileName).toEqual(expectedName);
    });
});
