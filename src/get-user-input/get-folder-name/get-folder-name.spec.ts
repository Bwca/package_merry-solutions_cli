import { getFolderName } from './get-folder-name';

describe('Tests for getFolderName', () => {
    it('Should return something', () => {
        // Arrange
        const path = 'hooks/my-new-hook';
        const fileName = 'my-new-hook';

        // Act
        const result = getFolderName(path, fileName);

        // Assert
        expect(result).toEqual(path);
    });

    it('Should contain new folder name if prefix is provided', () => {
        // Arrange
        const path = 'hooks/my-new-hook';
        const fileName = 'my-new-hook';
        const expectedFolderName = 'hooks/use-my-new-hook';

        // Act
        const result = getFolderName(path, fileName, 'use-');

        // Assert
        expect(result).toEqual(expectedFolderName);
    });
});
