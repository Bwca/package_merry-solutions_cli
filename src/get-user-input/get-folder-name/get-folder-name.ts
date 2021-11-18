export function getFolderName(path: string, fileName: string, prefix?: string): string {
    if (!prefix) {
        return path;
    }

    const regex = new RegExp(`${fileName}$`);

    return path.replace(regex, `${prefix}${fileName}`);
}
