import {assertTypeOf, itCases} from '@augment-vir/browser-testing';
import {ArrayElement} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {SvgSpecTagName, allSvgSpecTagNames, ensureSvgSpecTagName, isSvgSpecTagName} from './svg';

describe('allSvgSpecTagNames', () => {
    it('contains only entires that match SvgSpecTagName', () => {
        assertTypeOf<ArrayElement<typeof allSvgSpecTagNames>>().toEqualTypeOf<SvgSpecTagName>();
    });
});

describe('SvgSpecTagName', () => {
    it('is not just a plain string type', () => {
        assertTypeOf<SvgSpecTagName>().not.toEqualTypeOf<string>();
        // but it is a subset of string
        assertTypeOf<SvgSpecTagName>().toMatchTypeOf<string>();
    });
});

describe(isSvgSpecTagName.name, () => {
    it('passes all entries in allSvgSpecTagNames', () => {
        allSvgSpecTagNames.forEach((entry) => {
            assert.isTrue(isSvgSpecTagName(entry), `${entry} should be a valid SVG tag`);
        });
    });

    itCases(isSvgSpecTagName, [
        {
            it: 'fails on an HTML-only tag name',
            input: 'h1',
            expect: false,
        },
        {
            it: 'fails on a random string',
            input: 'hello there',
            expect: false,
        },
        {
            it: 'accepts a valid raw string',
            input: 'ellipse',
            expect: true,
        },
    ]);
});

describe(ensureSvgSpecTagName.name, () => {
    it('passes through all entries in allSvgSpecTagNames', () => {
        allSvgSpecTagNames.forEach((entry) => {
            assert.strictEqual(
                ensureSvgSpecTagName(entry),
                entry,
                `${entry} should be pass through ${ensureSvgSpecTagName.name}`,
            );
        });
    });

    itCases(ensureSvgSpecTagName, [
        {
            it: 'fails on an HTML tag name',
            input: 'h1',
            throws: Error,
        },
        {
            it: 'fails on a non-string',
            input: {not: 'a string'},
            throws: Error,
        },
        {
            it: 'fails on a random string',
            input: 'hello there',
            throws: Error,
        },
        {
            it: 'accepts a valid raw string',
            input: 'ellipse',
            expect: 'ellipse',
        },
    ]);
});
