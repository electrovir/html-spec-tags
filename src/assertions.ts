import {assert, AssertionError, check} from '@augment-vir/assert';
import {wrapInTry, type Constructor} from '@augment-vir/common';
import {htmlSpecConstructorsByTagName} from './html.js';
import {mathmlSpecConstructorsByTagName} from './mathml.js';
import {svgSpecConstructorsByTagName} from './svg.js';

/**
 * Used to define spec assertions.
 *
 * @category Internal
 */
export type SpecAsserter<ConstructorMap extends Readonly<Record<string, Constructor<Element>>>> = (
    input: unknown,
    failureMessage?: string | undefined,
) => asserts input is keyof ConstructorMap;

function createAsserters<ConstructorMap extends Readonly<Record<string, Constructor<Element>>>>(
    constructorMap: ConstructorMap,
    name: string,
) {
    function assertTypeGuard(input: unknown, failureMessage?: string | undefined): void {
        assert.isString(input, failureMessage);

        if (!(input in constructorMap)) {
            throw new AssertionError(
                `'${input}' is not a ${name} element tag name`,
                failureMessage,
            );
        }
    }

    function typeGuard(input: unknown): input is keyof ConstructorMap {
        return wrapInTry(
            () => {
                assertTypeGuard(input);
                return true;
            },
            {
                fallbackValue: false,
            },
        );
    }

    return {
        typeGuard,
        assertTypeGuard,
        ensureTypeGuard(this: void, input: unknown): keyof ConstructorMap {
            if (typeGuard(input)) {
                return input;
            } else if (check.isString(input)) {
                throw new TypeError(`'${input}' is not a valid ${name} tag name.`);
            } else {
                throw new TypeError(
                    `'${JSON.stringify(input)}' is not a string, it cannot be a valid ${name} tag name.`,
                );
            }
        },
    };
}

const svgAsserters = createAsserters(svgSpecConstructorsByTagName, 'SVG');
const htmlAsserters = createAsserters(htmlSpecConstructorsByTagName, 'HTML');
const mathmlAsserters = createAsserters(mathmlSpecConstructorsByTagName, 'MathML');

/**
 * Type guards the input as a valid SVG spec tag name.
 *
 * @category Assertion
 */
export const isSvgSpecTagName = svgAsserters.typeGuard;
/**
 * Asserts that the input as a valid SVG spec tag name.
 *
 * @category Assertion
 */
export const assertSvgSpecTagName: SpecAsserter<typeof svgSpecConstructorsByTagName> =
    svgAsserters.assertTypeGuard;
/**
 * Passes the input through if it's a valid SVG spec tag name. Throws an error if not.
 *
 * @category Assertion
 */
export const ensureSvgSpecTagName = svgAsserters.ensureTypeGuard;

/**
 * Type guards the input as a valid SVG spec tag name.
 *
 * @category Assertion
 */
export const isHtmlSpecTagName = htmlAsserters.typeGuard;
/**
 * Asserts that the input as a valid HTML spec tag name.
 *
 * @category Assertion
 */
export const assertHtmlSpecTagName: SpecAsserter<typeof htmlSpecConstructorsByTagName> =
    htmlAsserters.assertTypeGuard;
/**
 * Passes the input through if it's a valid HTML spec tag name. Throws an error if not.
 *
 * @category Assertion
 */
export const ensureHtmlSpecTagName = htmlAsserters.ensureTypeGuard;

/**
 * Type guards the input as a valid MathML spec tag name.
 *
 * @category Assertion
 */
export const isMathmlSpecTagName = mathmlAsserters.typeGuard;
/**
 * Asserts that the input as a valid MathML spec tag name.
 *
 * @category Assertion
 */
export const assertMathmlSpecTagName: SpecAsserter<typeof mathmlSpecConstructorsByTagName> =
    mathmlAsserters.assertTypeGuard;
/**
 * Passes the input through if it's a valid MathML spec tag name. Throws an error if not.
 *
 * @category Assertion
 */
export const ensureMathmlSpecTagName = mathmlAsserters.ensureTypeGuard;
