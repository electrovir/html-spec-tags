import {getObjectTypedEntries} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {assertThrows, assertTypeOf} from 'run-time-assertions';
import {Constructor} from 'type-fest';
import {
    assertHtmlSpecTagName,
    assertMathmlSpecTagName,
    assertSvgSpecTagName,
    ensureHtmlSpecTagName,
    ensureMathmlSpecTagName,
    ensureSvgSpecTagName,
    isHtmlSpecTagName,
    isMathmlSpecTagName,
    isSvgSpecTagName,
} from './assertions';
import {HtmlSpecTagName, htmlSpecConstructorsByTagName} from './html';
import {MathmlSpecTagName, mathmlSpecConstructorsByTagName} from './mathml';
import {SvgSpecTagName, svgSpecConstructorsByTagName} from './svg';

type TestCase = {
    tag: unknown;
    valid: boolean;
};

const testCases: Readonly<
    Record<
        string,
        {
            testCases: ReadonlyArray<Readonly<TestCase>>;
            typeGuard: (input: unknown) => boolean;
            asserter: (input: unknown) => void;
            ensurer: (input: unknown) => string;
            constructorMap: Readonly<Record<string, Constructor<Element>>>;
        }
    >
> = {
    svg: {
        testCases: [
            {tag: 'ellipse', valid: true},
            {tag: 'svg', valid: true},

            {tag: 'hello there', valid: false},
            {tag: 'mspace', valid: false},
            {tag: 'h1', valid: false},
            {tag: {not: 'a string'}, valid: false},
        ],
        typeGuard: isSvgSpecTagName,
        asserter: assertSvgSpecTagName,
        ensurer: ensureSvgSpecTagName,
        constructorMap: svgSpecConstructorsByTagName,
    },
    html: {
        testCases: [
            {tag: 'h1', valid: true},
            {tag: 'html', valid: true},

            {tag: 'hello there', valid: false},
            {tag: 'mspace', valid: false},
            {tag: 'ellipse', valid: false},
            {tag: {not: 'a string'}, valid: false},
        ],
        typeGuard: isHtmlSpecTagName,
        asserter: assertHtmlSpecTagName,
        ensurer: ensureHtmlSpecTagName,
        constructorMap: htmlSpecConstructorsByTagName,
    },
    mathml: {
        testCases: [
            {tag: 'mspace', valid: true},
            {tag: 'math', valid: true},

            {tag: 'hello there', valid: false},
            {tag: 'h1', valid: false},
            {tag: 'ellipse', valid: false},
            {tag: {not: 'a string'}, valid: false},
        ],
        typeGuard: isMathmlSpecTagName,
        asserter: assertMathmlSpecTagName,
        ensurer: ensureMathmlSpecTagName,
        constructorMap: mathmlSpecConstructorsByTagName,
    },
};

describe('tag assertions', () => {
    getObjectTypedEntries(testCases).forEach(
        ([
            tagType,
            testInfo,
        ]) => {
            describe(tagType, () => {
                it('passes all constructor keys', () => {
                    Object.keys(testInfo.constructorMap).forEach((tagName) => {
                        assert.isTrue(testInfo.typeGuard(tagName));
                        testInfo.asserter(tagName);
                        testInfo.asserter(testInfo.ensurer(tagName));
                    });
                });

                testInfo.testCases.forEach((testCase) => {
                    it(`${testCase.valid ? 'accepts' : 'rejects'} ${testCase.tag}`, () => {
                        if (testCase.valid) {
                            assert.isTrue(testInfo.typeGuard(testCase.tag));
                            testInfo.asserter(testCase.tag);
                            testInfo.asserter(testInfo.ensurer(testCase.tag));
                        } else {
                            assert.isFalse(testInfo.typeGuard(testCase.tag));
                            assertThrows(() => testInfo.asserter(testCase.tag));
                            assertThrows(() => testInfo.ensurer(testCase.tag));
                        }
                    });
                });
            });
        },
    );

    it('properly type guards SVG tags', () => {
        const tagName = 'feMorphology' as string;
        assertTypeOf(ensureSvgSpecTagName(tagName)).toEqualTypeOf<SvgSpecTagName>();
        if (isSvgSpecTagName(tagName)) {
            assertTypeOf(tagName).toEqualTypeOf<SvgSpecTagName>();
        } else {
            assertTypeOf(tagName).not.toEqualTypeOf<SvgSpecTagName>();
        }
        assertSvgSpecTagName(tagName);
        assertTypeOf(tagName).toEqualTypeOf<SvgSpecTagName>();
    });

    it('properly type guards HTML tags', () => {
        const tagName = 'summary' as string;
        assertTypeOf(ensureHtmlSpecTagName(tagName)).toEqualTypeOf<HtmlSpecTagName>();
        if (isHtmlSpecTagName(tagName)) {
            assertTypeOf(tagName).toEqualTypeOf<HtmlSpecTagName>();
        } else {
            assertTypeOf(tagName).not.toEqualTypeOf<HtmlSpecTagName>();
        }
        assertHtmlSpecTagName(tagName);
        assertTypeOf(tagName).toEqualTypeOf<HtmlSpecTagName>();
    });

    it('properly type guards MathML tags', () => {
        const tagName = 'mmultiscripts' as string;
        assertTypeOf(ensureMathmlSpecTagName(tagName)).toEqualTypeOf<MathmlSpecTagName>();
        if (isMathmlSpecTagName(tagName)) {
            assertTypeOf(tagName).toEqualTypeOf<MathmlSpecTagName>();
        } else {
            assertTypeOf(tagName).not.toEqualTypeOf<MathmlSpecTagName>();
        }
        assertMathmlSpecTagName(tagName);
        assertTypeOf(tagName).toEqualTypeOf<MathmlSpecTagName>();
    });
});
