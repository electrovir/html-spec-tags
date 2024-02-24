import {isTruthy, wrapInTry} from '@augment-vir/common';
import {AssertionError, assertRunTimeType, isRunTimeType} from 'run-time-assertions';
import {Constructor} from 'type-fest';
import {htmlSpecConstructorsByTagName} from './html';
import {mathmlSpecConstructorsByTagName} from './mathml';
import {svgSpecConstructorsByTagName} from './svg';

type SpecAsserter<ConstructorMap extends Readonly<Record<string, Constructor<Element>>>> = (
    input: unknown,
    failureMessage?: string | undefined,
) => asserts input is keyof ConstructorMap;

function createAsserters<ConstructorMap extends Readonly<Record<string, Constructor<Element>>>>(
    constructorMap: ConstructorMap,
    name: string,
) {
    function assertTypeGuard(input: unknown, failureMessage?: string | undefined): void {
        assertRunTimeType(input, 'string', failureMessage);

        if (!(input in constructorMap)) {
            throw new AssertionError(
                [
                    `'${input}' is not a ${name} element tag name`,
                    failureMessage,
                ]
                    .filter(isTruthy)
                    .join(': '),
            );
        }
    }

    function typeGuard(input: unknown): input is keyof ConstructorMap {
        return wrapInTry({
            callback() {
                assertTypeGuard(input);
                return true;
            },
            fallbackValue: false,
        });
    }

    return {
        typeGuard,
        assertTypeGuard,
        ensureTypeGuard(input: unknown): keyof ConstructorMap {
            if (typeGuard(input)) {
                return input;
            } else if (!isRunTimeType(input, 'string')) {
                throw new Error(
                    `'${JSON.stringify(input)}' is not a string, it cannot be a valid ${name} tag name.`,
                );
            } else {
                throw new Error(`'${input}' is not a valid ${name} tag name.`);
            }
        },
    };
}

const svgAsserters = createAsserters(svgSpecConstructorsByTagName, 'SVG');
const htmlAsserters = createAsserters(htmlSpecConstructorsByTagName, 'HTML');
const mathmlAsserters = createAsserters(mathmlSpecConstructorsByTagName, 'MathML');

/** Type guards the input as a valid SVG spec tag name. */
export const isSvgSpecTagName = svgAsserters.typeGuard;
/** Asserts that the input as a valid SVG spec tag name. */
export const assertSvgSpecTagName: SpecAsserter<typeof svgSpecConstructorsByTagName> =
    svgAsserters.assertTypeGuard;
/** Passes the input through if it's a valid SVG spec tag name. Throws an error if not. */
export const ensureSvgSpecTagName = svgAsserters.ensureTypeGuard;

/** Type guards the input as a valid SVG spec tag name. */
export const isHtmlSpecTagName = htmlAsserters.typeGuard;
/** Asserts that the input as a valid HTML spec tag name. */
export const assertHtmlSpecTagName: SpecAsserter<typeof htmlSpecConstructorsByTagName> =
    htmlAsserters.assertTypeGuard;
/** Passes the input through if it's a valid HTML spec tag name. Throws an error if not. */
export const ensureHtmlSpecTagName = htmlAsserters.ensureTypeGuard;

/** Type guards the input as a valid MathML spec tag name. */
export const isMathmlSpecTagName = mathmlAsserters.typeGuard;
/** Asserts that the input as a valid MathML spec tag name. */
export const assertMathmlSpecTagName: SpecAsserter<typeof mathmlSpecConstructorsByTagName> =
    mathmlAsserters.assertTypeGuard;
/** Passes the input through if it's a valid MathML spec tag name. Throws an error if not. */
export const ensureMathmlSpecTagName = mathmlAsserters.ensureTypeGuard;
