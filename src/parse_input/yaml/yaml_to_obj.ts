import { readFileSync } from 'fs';
import { parse, stringify } from 'yaml'

export function yamlFileToObj<T = unknown>(filePath: string): T {
    const fileContents = readFileSync(filePath, 'utf8');
    return parse(fileContents) as T;
}