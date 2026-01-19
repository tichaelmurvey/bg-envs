import { readFileSync } from 'fs';
import { parse, stringify } from 'yaml'

export function yamlFileToObj<T = unknown>(filePath: string): T {
    const fileContents = readFileSync(filePath, 'utf8');
    console.log(fileContents)
    console.log(parse(fileContents))
    return parse(fileContents) as T;
}