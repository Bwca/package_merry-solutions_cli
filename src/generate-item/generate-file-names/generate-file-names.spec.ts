import * as fileUtils from '../file-utils';
import { generateFileNames, GenerateFileNamesPayload } from './generate-file-names';

describe('Tests for generateFileNames for component', () => {
    const ARGS: GenerateFileNamesPayload = {
        fileName: 'Awesome',
        itemType: 'component',
        templatesRoot: './templates',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(fileUtils, 'readDir').mockResolvedValueOnce([
            'component.model.ts.mustache',
            'component.module.scss.mustache',
            'component.spec.tsx.mustache',
            'component.tsx.mustache',
            'index.ts.mustache',
        ] as any);
    });

    it('Should produce an array of file names to generate', async () => {
        // Arrange
        const expectedFileNames = ['Awesome.model.ts', 'Awesome.module.scss', 'Awesome.spec.tsx', 'Awesome.tsx', 'index.ts'];

        // Act
        const { fileNamesToGenerate } = await generateFileNames(ARGS);

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
        const { templateFileNames } = await generateFileNames(ARGS);

        // Assert
        expect(templateFileNames).toEqual(expectedFileNames);
    });
    it('Should produce itemTemplatesDir', async () => {
        // Arrange
        const expectedItemTemplatesDir = 'templates\\component';

        // Act
        const { itemTemplatesDir } = await generateFileNames(ARGS);

        // Assert
        expect(itemTemplatesDir).toEqual(expectedItemTemplatesDir);
    });
});

describe('Tests for generateFileNames for hook', () => {
    const ARGS: GenerateFileNamesPayload = {
        fileName: 'Awesome',
        itemType: 'hook',
        templatesRoot: './templates',
    };
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(fileUtils, 'readDir').mockResolvedValue(['index.ts.mustache', 'usehook.spec.ts.mustache', 'usehook.ts.mustache'] as any);
    });

    it('Should produce an array of hook file names to generate', async () => {
        // Arrange
        const expectedFileNames = ['index.ts', 'useAwesome.spec.ts', 'useAwesome.ts'];

        // Act
        const { fileNamesToGenerate } = await generateFileNames(ARGS);

        // Assert
        expect(fileNamesToGenerate).toEqual(expectedFileNames);
    });
    it('Should produce an array of hook template file names', async () => {
        // Arrange
        const expectedFileNames = ['index.ts.mustache', 'usehook.spec.ts.mustache', 'usehook.ts.mustache'];

        // Act
        const { templateFileNames } = await generateFileNames(ARGS);

        // Assert
        expect(templateFileNames).toEqual(expectedFileNames);
    });
});
