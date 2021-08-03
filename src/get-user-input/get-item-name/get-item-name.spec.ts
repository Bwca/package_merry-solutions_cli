import { getItemName } from './get-item-name';

describe('Tests for getFileName', () => {
    it('Given Pascal argument should return file name without any dashes in PascalCase', () => {
        // Arrange
        const itemName = 'my-cool-component';
        const expectedName = 'MyCoolComponent';

        // Act
        const fileName = getItemName(itemName, 'PascalCase');

        // Assert
        expect(fileName).toEqual(expectedName);
    });
});
