import {isTruthy, typedArrayIncludes, wrapInTry} from '@augment-vir/common';
import {AssertionError, assertRunTimeType, isRunTimeType} from 'run-time-assertions';
import {Constructor} from 'type-fest';
import {HtmlSpecTagName, allHtmlSpecTagNames, htmlSpecConstructorsByTagName} from './html';
import {MathmlSpecTagName, allMathmlSpecTagNames, mathmlSpecConstructorsByTagName} from './mathml';
import {SvgSpecTagName, allSvgSpecTagNames, svgSpecConstructorsByTagName} from './svg';

/** All possible spec tag names in a single array. */
export const allSpecTagNames: ReadonlyArray<SpecTagName> = Array.from(
    new Set(
        [
            ...allHtmlSpecTagNames,
            ...allSvgSpecTagNames,
            ...allMathmlSpecTagNames,
        ].sort(),
    ),
);

/** Any valid spec tag name. */
export type SpecTagName = HtmlSpecTagName | SvgSpecTagName | MathmlSpecTagName;

/**
 * Get the constructor for the given tag name. Since there are some duplicate tag names, the
 * priority is:
 *
 * 1. HTML tags
 * 2. SVG tags
 * 3. MathML tags
 *
 * Meaning, if a tag name is duplicated between HTML and SVG tags, the HTML constructor will be
 * returned. If the lower priority tag constructor is desired these types of situations, use its
 * constructor list directly. For example,use `svgSpecConstructorsByTagName` directly.
 */
export function getSpecTagNameConstructor(tagName: SpecTagName): Constructor<Element> {
    const constructor =
        htmlSpecConstructorsByTagName[tagName as HtmlSpecTagName] ||
        svgSpecConstructorsByTagName[tagName as SvgSpecTagName] ||
        mathmlSpecConstructorsByTagName[tagName as MathmlSpecTagName];

    if (!constructor) {
        throw new TypeError(`Found no constructor for tag name '${tagName}'`);
    }

    return constructor;
}

/** Type guards the input as a valid spec tag name. */
export function isSpecTagName(input: unknown): input is SpecTagName {
    return wrapInTry({
        callback() {
            assertSpecTagName(input);
            return true;
        },
        fallbackValue: false,
    });
}

/** Asserts that the input as a valid spec tag name. */
export function assertSpecTagName(
    input: unknown,
    failureMessage?: string | undefined,
): asserts input is SpecTagName {
    assertRunTimeType(input, 'string', failureMessage);

    if (!typedArrayIncludes(allSpecTagNames, input)) {
        throw new AssertionError(
            [
                `'${input}' is not tag name`,
                failureMessage,
            ]
                .filter(isTruthy)
                .join(': '),
        );
    }
}

/** Passes the input through if it's a valid spec tag name, throws an error if not. */
export function ensureSpecTagName(input: unknown): SpecTagName {
    if (isSpecTagName(input)) {
        return input;
    } else if (!isRunTimeType(input, 'string')) {
        throw new Error(
            `'${JSON.stringify(input)}' is not a string, it cannot be a valid tag name.`,
        );
    } else {
        throw new Error(`'${input}' is not a valid tag name.`);
    }
}
