import {assert} from '@augment-vir/assert';
import {getObjectTypedEntries, stringify} from '@augment-vir/common';
import {describe, it} from '@augment-vir/test';
import {type Constructor} from 'type-fest';
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
} from './assertions.js';
import {type HtmlSpecTagName, htmlSpecConstructorsByTagName} from './html.js';
import {type MathmlSpecTagName, mathmlSpecConstructorsByTagName} from './mathml.js';
import {type SvgSpecTagName, svgSpecConstructorsByTagName} from './svg.js';

type TestCase = {
    tag: string | {not: string};
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
                    it(`${testCase.valid ? 'accepts' : 'rejects'} ${stringify(testCase.tag)}`, () => {
                        if (testCase.valid) {
                            assert.isTrue(testInfo.typeGuard(testCase.tag));
                            testInfo.asserter(testCase.tag);
                            testInfo.asserter(testInfo.ensurer(testCase.tag));
                        } else {
                            assert.isFalse(testInfo.typeGuard(testCase.tag));
                            assert.throws(() => testInfo.asserter(testCase.tag));
                            assert.throws(() => testInfo.ensurer(testCase.tag));
                        }
                    });
                });
            });
        },
    );

    it('properly type guards SVG tags', () => {
        const tagName = 'feMorphology' as string;
        assert.tsType(ensureSvgSpecTagName(tagName)).equals<SvgSpecTagName>();
        if (isSvgSpecTagName(tagName)) {
            assert.tsType(tagName).equals<SvgSpecTagName>();
        } else {
            assert.tsType(tagName).notEquals<SvgSpecTagName>();
        }
        assertSvgSpecTagName(tagName);
        assert.tsType(tagName).equals<SvgSpecTagName>();
    });

    it('properly type guards HTML tags', () => {
        const tagName = 'summary' as string;
        assert.tsType(ensureHtmlSpecTagName(tagName)).equals<HtmlSpecTagName>();
        if (isHtmlSpecTagName(tagName)) {
            assert.tsType(tagName).equals<HtmlSpecTagName>();
        } else {
            assert.tsType(tagName).notEquals<HtmlSpecTagName>();
        }
        assertHtmlSpecTagName(tagName);
        assert.tsType(tagName).equals<HtmlSpecTagName>();
    });

    it('properly type guards MathML tags', () => {
        const tagName = 'mmultiscripts' as string;
        assert.tsType(ensureMathmlSpecTagName(tagName)).equals<MathmlSpecTagName>();
        if (isMathmlSpecTagName(tagName)) {
            assert.tsType(tagName).equals<MathmlSpecTagName>();
        } else {
            assert.tsType(tagName).notEquals<MathmlSpecTagName>();
        }
        assertMathmlSpecTagName(tagName);
        assert.tsType(tagName).equals<MathmlSpecTagName>();
    });
});
