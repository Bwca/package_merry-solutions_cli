import * as fileUtils from '../file-utils';
import { generateFileNames } from './generate-file-names';

describe('Tests for generateFileNames', () => {
  const ARGS: [string, string, string] = ['./templates', 'component', 'Awesome'];

  jest
    .spyOn(fileUtils, 'readDir')
    .mockResolvedValue([
      'component.model.ts.mustache',
      'component.module.scss.mustache',
      'component.spec.tsx.mustache',
      'component.tsx.mustache',
      'index.ts.mustache',
    ] as any);
  it('Should produce an array of file names to generate', async () => {
    // Arrange
    const expectedFileNames = ['Awesome.model.ts', 'Awesome.module.scss', 'Awesome.spec.tsx', 'Awesome.tsx', 'index.ts'];

    // Act
    const { fileNamesToGenerate } = await generateFileNames(...ARGS);

    // Assert
    expect(fileNamesToGenerate).toEqual(expectedFileNames);
  });
  it('Should produce an array of template file names', async () => {
    // Arrange
    const expectedFileNames = [
      'component.model.ts.mustache',
      'component.module.scss.mustache',
      'component.spec.tsx.mustache',
      'component.tsx.mustache',
      'index.ts.mustache',
    ];

    // Act
    const { templateFileNames } = await generateFileNames(...ARGS);

    // Assert
    expect(templateFileNames).toEqual(expectedFileNames);
  });
  it('Should produce itemTemplatesDir', async () => {
    // Arrange
    const expectedItemTemplatesDir = 'templates\\component';

    // Act
    const { itemTemplatesDir } = await generateFileNames(...ARGS);

    // Assert
    expect(itemTemplatesDir).toEqual(expectedItemTemplatesDir);
  });
});
