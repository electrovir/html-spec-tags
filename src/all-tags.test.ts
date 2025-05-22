import {AssertionError, assert, check} from '@augment-vir/assert';
import {stringify} from '@augment-vir/common';
import {describe, it, itCases} from '@augment-vir/test';
import {
    type SpecTagName,
    allSpecTagNames,
    assertSpecTagName,
    ensureSpecTagName,
    getSpecTagNameConstructor,
    isSpecTagName,
} from './all-tags.js';
import {isHtmlSpecTagName, isMathmlSpecTagName, isSvgSpecTagName} from './assertions.js';
import {type HtmlSpecTagName, allHtmlSpecTagNames} from './html.js';
import {allMathmlSpecTagNames} from './mathml.js';
import {type SvgSpecTagName, allSvgSpecTagNames} from './svg.js';

describe('SpecTagName', () => {
    it('matches SVG and HTML spec tag names', () => {
        assert.tsType<HtmlSpecTagName>().matches<SpecTagName>();
        assert.tsType<SvgSpecTagName>().matches<SpecTagName>();
    });
});

describe('allSpecTagNames', () => {
    it('includes HTML and SVG tag names', () => {
        allSpecTagNames.forEach((tagName) => {
            const included =
                check.hasValue(allHtmlSpecTagNames, tagName) ||
                check.hasValue(allMathmlSpecTagNames, tagName) ||
                check.hasValue(allSvgSpecTagNames, tagName);
            assert.isTrue(included, `${tagName} was not found in all HTML or SVG tag names.`);

            const matches =
                isHtmlSpecTagName(tagName) ||
                isSvgSpecTagName(tagName) ||
                isMathmlSpecTagName(tagName);
            assert.isTrue(matches, `${tagName} is not a valid HTML or SVG tag name.`);
        });
    });
});

describe('spec tag name assertions', () => {
    it('passes all entries in allSpecTagNames', () => {
        allSpecTagNames.forEach((entry) => {
            assert.isTrue(isSpecTagName(entry), `${entry} should be a valid spec tag`);
            assertSpecTagName(entry);
            assertSpecTagName(ensureSpecTagName(entry));
        });
    });

    const testCases: ReadonlyArray<Readonly<{input: string | {tagName: string}; valid: boolean}>> =
        [
            {
                input: 'img',
                valid: true,
            },
            {
                input: 'ellipse',
                valid: true,
            },
            {
                input: 'mo',
                valid: true,
            },
            {
                input: 'hello there',
                valid: false,
            },
            {
                input: {tagName: 'mo'},
                valid: false,
            },
        ];

    itCases(
        isSpecTagName,
        testCases.map((testCase) => {
            return {
                it: testCase.valid
                    ? `accepts '${stringify(testCase.input)}'`
                    : `rejects '${stringify(testCase.input)}'`,
                input: testCase.input,
                expect: testCase.valid,
            } as const;
        }),
    );

    itCases(
        assertSpecTagName,
        testCases.map((testCase) => {
            return {
                it: testCase.valid
                    ? `accepts '${stringify(testCase.input)}'`
                    : `rejects '${stringify(testCase.input)}'`,
                inputs: [testCase.input],
                throws: testCase.valid ? undefined : {matchConstructor: AssertionError},
            } as const;
        }),
    );

    itCases(
        ensureSpecTagName,
        testCases.map((testCase) => {
            return {
                it: testCase.valid
                    ? `accepts '${stringify(testCase.input)}'`
                    : `rejects '${stringify(testCase.input)}'`,
                input: testCase.input,
                throws: testCase.valid ? undefined : {matchConstructor: Error},
            } as const;
        }),
    );
});

describe(getSpecTagNameConstructor.name, () => {
    itCases(getSpecTagNameConstructor, [
        {
            it: 'gets an HTMLElement constructor',
            input: 'span',
            expect: HTMLSpanElement,
        },
        {
            it: 'gets an SVGElement constructor',
            input: 'g',
            expect: SVGGElement,
        },
        {
            it: 'gets a MathMLElement constructor',
            input: 'mo',
            expect: MathMLElement,
        },
        {
            it: 'gets the HTMLElement constructor version of a tag',
            input: 'a',
            expect: HTMLAnchorElement,
        },
        {
            it: 'rejects an invalid tag',
            // @ts-expect-error: this is intentionally not a valid tag
            input: 'not a valid tag',
            throws: {matchConstructor: TypeError},
        },
    ]);
});
