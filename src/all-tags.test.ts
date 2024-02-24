import {itCases} from '@augment-vir/browser-testing';
import {typedArrayIncludes} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {AssertionError, assertTypeOf} from 'run-time-assertions';
import {
    SpecTagName,
    allSpecTagNames,
    assertSpecTagName,
    ensureSpecTagName,
    isSpecTagName,
} from './all-tags';
import {isHtmlSpecTagName, isMathmlSpecTagName, isSvgSpecTagName} from './assertions';
import {HtmlSpecTagName, allHtmlSpecTagNames} from './html';
import {allMathmlSpecTagNames} from './mathml';
import {SvgSpecTagName, allSvgSpecTagNames} from './svg';

describe('SpecTagName', () => {
    it('matches SVG and HTML spec tag names', () => {
        assertTypeOf<HtmlSpecTagName>().toMatchTypeOf<SpecTagName>();
        assertTypeOf<SvgSpecTagName>().toMatchTypeOf<SpecTagName>();
    });
});

describe('allSpecTagNames', () => {
    it('includes HTML and SVG tag names', () => {
        allSpecTagNames.forEach((tagName) => {
            const included =
                typedArrayIncludes(allHtmlSpecTagNames, tagName) ||
                typedArrayIncludes(allMathmlSpecTagNames, tagName) ||
                typedArrayIncludes(allSvgSpecTagNames, tagName);
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

    const testCases: ReadonlyArray<Readonly<{input: unknown; valid: boolean}>> = [
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
                it: testCase.valid ? `accepts '${testCase.input}'` : `rejects '${testCase.input}'`,
                input: testCase.input,
                expect: testCase.valid,
            } as const;
        }),
    );

    itCases(
        assertSpecTagName,
        testCases.map((testCase) => {
            return {
                it: testCase.valid ? `accepts '${testCase.input}'` : `rejects '${testCase.input}'`,
                inputs: [testCase.input],
                throws: testCase.valid ? undefined : AssertionError,
            } as const;
        }),
    );

    itCases(
        ensureSpecTagName,
        testCases.map((testCase) => {
            return {
                it: testCase.valid ? `accepts '${testCase.input}'` : `rejects '${testCase.input}'`,
                input: testCase.input,
                throws: testCase.valid ? undefined : Error,
            } as const;
        }),
    );
});
