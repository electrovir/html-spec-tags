import {AssertionError, assert, check} from '@augment-vir/assert';
import {wrapInTry, type Values} from '@augment-vir/common';
import {HtmlSpecTagName, allHtmlSpecTagNames, htmlSpecConstructorsByTagName} from './html.js';
import {
    MathmlSpecTagName,
    allMathmlSpecTagNames,
    mathmlSpecConstructorsByTagName,
} from './mathml.js';
import {SvgSpecTagName, allSvgSpecTagNames, svgSpecConstructorsByTagName} from './svg.js';

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

/** Any of the possible spec tag name constructors. */
export type SpecTagNameConstructor =
    | Values<typeof htmlSpecConstructorsByTagName>
    | Values<typeof mathmlSpecConstructorsByTagName>
    | Values<typeof svgSpecConstructorsByTagName>;

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
export function getSpecTagNameConstructor(tagName: SpecTagName): SpecTagNameConstructor {
    const constructor =
        (htmlSpecConstructorsByTagName as Record<string, SpecTagNameConstructor>)[tagName] ||
        (svgSpecConstructorsByTagName as Record<string, SpecTagNameConstructor>)[tagName] ||
        (mathmlSpecConstructorsByTagName as Record<string, SpecTagNameConstructor>)[tagName];

    if (!constructor) {
        throw new TypeError(`Found no constructor for tag name '${tagName}'`);
    }

    return constructor;
}

/** Type guards the input as a valid spec tag name. */
export function isSpecTagName(input: unknown): input is SpecTagName {
    return wrapInTry(
        () => {
            assertSpecTagName(input);
            return true;
        },
        {
            fallbackValue: false,
        },
    );
}

/** Asserts that the input as a valid spec tag name. */
export function assertSpecTagName(
    input: unknown,
    failureMessage?: string | undefined,
): asserts input is SpecTagName {
    assert.isString(input, failureMessage);

    if (!check.hasValue(allSpecTagNames, input)) {
        throw new AssertionError(`'${input}' is not tag name`, failureMessage);
    }
}

/** Passes the input through if it's a valid spec tag name, throws an error if not. */
export function ensureSpecTagName(input: unknown): SpecTagName {
    if (isSpecTagName(input)) {
        return input;
    } else if (check.isString(input)) {
        throw new TypeError(`'${input}' is not a valid tag name.`);
    } else {
        throw new TypeError(
            `'${JSON.stringify(input)}' is not a string, it cannot be a valid tag name.`,
        );
    }
}
