import { getItemNameFromPath } from './get-item-name-from-path';

describe('tests for getItemNameFromPath', () => {
  it('Should correctly extract item name from path', () => {
    // Arrange
    const path = 'shared/components/MyAwesomeComponent';

    // Act
    const name = getItemNameFromPath(path);

    // Assert
    expect(name).toEqual('MyAwesomeComponent');
  });
});
