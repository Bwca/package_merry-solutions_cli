export function getItemFileNameFromPath(path: string): string {
    return (path.match(/\/?(?<itemName>[^/]+)$/)?.groups as { itemName: string }).itemName;
}
