export function getTemplateFolderName(itemType: string): string {
  switch (true) {
    case /^c(omponent)?$/.test(itemType):
      return 'component';

    default: {
      throw new Error('unknown item type!');
    }
  }
}
