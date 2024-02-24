import {PropertyValueType, isTruthy, typedArrayIncludes, wrapInTry} from '@augment-vir/common';
import {AssertionError, assertRunTimeType, isRunTimeType} from 'run-time-assertions';
import {HtmlSpecTagName, allHtmlSpecTagNames, htmlSpecConstructorsByTagName} from './html';
import {MathmlSpecTagName, allMathmlSpecTagNames, mathmlSpecConstructorsByTagName} from './mathml';
import {SvgSpecTagName, allSvgSpecTagNames, svgSpecConstructorsByTagName} from './svg';
import {specTagNameByConstructor} from './tag-name-by-constructor';

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
    | PropertyValueType<typeof htmlSpecConstructorsByTagName>
    | PropertyValueType<typeof mathmlSpecConstructorsByTagName>
    | PropertyValueType<typeof svgSpecConstructorsByTagName>;

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

/**
 * Get a spec tag name from the given constructor. Note that some constructors match multiple tags
 * so you might get an unexpected output here.
 */
export function getSpecTagNameFromConstructor(constructor: SpecTagNameConstructor): SpecTagName {
    const tagName = specTagNameByConstructor.get(constructor);

    if (!tagName) {
        throw new TypeError(`'${constructor.name}' is not a valid spec tag name constructor.`);
    }

    return tagName;
}
