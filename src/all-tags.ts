import {isRunTimeType} from 'run-time-assertions';
import {HtmlSpecTagName, allHtmlSpecTagNames, isHtmlSpecTagName} from './html';
import {SvgSpecTagName, allSvgSpecTagNames, isSvgSpecTagName} from './svg';

/** All possible spec tag names in a single array. */
export const allSpecTagNames: ReadonlyArray<SpecTagName> = [
    ...allHtmlSpecTagNames,
    ...allSvgSpecTagNames,
];

/** A string literal type that matches all valid spec tag names. */
export type SpecTagName = HtmlSpecTagName | SvgSpecTagName;

/** Type guards the input as any valid spec tag name. */
export function isSpecTagName(input: unknown): input is SpecTagName {
    return isHtmlSpecTagName(input) || isSvgSpecTagName(input);
}

/** Passes the input through if it's a valid spec tag name, throws an error if not. */
export function ensureSpecTagName(input: unknown): SpecTagName {
    if (isSpecTagName(input)) {
        return input;
    } else if (!isRunTimeType(input, 'string')) {
        throw new Error(
            `'${JSON.stringify(input)}' is not a string, it cannot be a valid SpecTagName.`,
        );
    } else {
        throw new Error(`'${input}' is not a valid SpecTagName.`);
    }
}
