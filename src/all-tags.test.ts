import {itCases} from '@augment-vir/browser-testing';
import {typedArrayIncludes} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {assertTypeOf} from 'run-time-assertions';
import {SpecTagName, allSpecTagNames, ensureSpecTagName, isSpecTagName} from './all-tags';
import {HtmlSpecTagName, allHtmlSpecTagNames, isHtmlSpecTagName} from './html';
import {SvgSpecTagName, allSvgSpecTagNames, isSvgSpecTagName} from './svg';

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
                typedArrayIncludes(allSvgSpecTagNames, tagName);
            assert.isTrue(included, `${tagName} was not found in all HTML or SVG tag names.`);

            const matches = isHtmlSpecTagName(tagName) || isSvgSpecTagName(tagName);

            assert.isTrue(matches, `${tagName} is not a valid HTML or SVG tag name.`);
        });
    });
});

describe(isSpecTagName.name, () => {
    it('passes all entries in allSpecTagNames', () => {
        allSpecTagNames.forEach((entry) => {
            assert.isTrue(isSpecTagName(entry), `${entry} should be a valid spec tag`);
        });
    });

    itCases(isSpecTagName, [
        {
            it: 'fails on a random string',
            input: 'hello there',
            expect: false,
        },
        {
            it: 'accepts a valid raw HTML tag name string',
            input: 'img',
            expect: true,
        },
        {
            it: 'accepts a valid raw SVG tag name string',
            input: 'ellipse',
            expect: true,
        },
    ]);
});

describe(ensureSpecTagName.name, () => {
    it('passes through all entries in allSpecTagNames', () => {
        allSpecTagNames.forEach((entry) => {
            assert.strictEqual(
                ensureSpecTagName(entry),
                entry,
                `${entry} should be pass through ${ensureSpecTagName.name}`,
            );
        });
    });

    itCases(ensureSpecTagName, [
        {
            it: 'fails on a random string',
            input: 'hello there',
            throws: Error,
        },
        {
            it: 'fails on a non-string',
            input: {not: 'a string'},
            throws: Error,
        },
        {
            it: 'accepts a valid raw HTML tag name string',
            input: 'img',
            expect: 'img',
        },
        {
            it: 'accepts a valid raw SVG tag name string',
            input: 'ellipse',
            expect: 'ellipse',
        },
    ]);
});
