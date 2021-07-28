export function getItemNameFromPath(path: string): string {
    return (path.match(/\/?(?<itemName>[^/]+)$/)?.groups as { itemName: string }).itemName;
}
