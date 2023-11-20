import {itCases} from '@augment-vir/browser-testing';
import {ArrayElement} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {assertTypeOf} from 'run-time-assertions';
import {
    HtmlSpecTagName,
    allHtmlSpecTagNames,
    ensureHtmlSpecTagName,
    htmlSpecConstructorsByTagName,
    isHtmlSpecTagName,
} from './html';

describe('htmlSpecConstructorsByTagName', () => {
    it('has all HTMLElement subclasses for values', () => {
        Object.values(htmlSpecConstructorsByTagName).forEach((elementConstructor) => {
            assert.isTrue(
                elementConstructor.prototype instanceof HTMLElement ||
                    elementConstructor === HTMLElement,
                `${elementConstructor.name} is not an HTMLElement constructor`,
            );
        });
    });

    it('has strict value types', () => {
        const spanConstructor = htmlSpecConstructorsByTagName['span'];

        assertTypeOf(spanConstructor).toEqualTypeOf(HTMLSpanElement);
        assert.strictEqual(spanConstructor, HTMLSpanElement);
    });
});

describe('allHtmlSpecTagNames', () => {
    it('has only keys from htmlSpecConstructorsByTagName', () => {
        assert.hasAllKeys(htmlSpecConstructorsByTagName, allHtmlSpecTagNames);
    });

    it('matches HtmlSpecTagName', () => {
        assertTypeOf<ArrayElement<typeof allHtmlSpecTagNames>>().toEqualTypeOf<HtmlSpecTagName>();
    });
});

describe('HtmlSpecTagName', () => {
    it('can be used as a key into htmlSpecConstructorsByTagName', () => {
        const key: HtmlSpecTagName = 'span' as HtmlSpecTagName;
        const constructor = htmlSpecConstructorsByTagName[key];
        assert.isDefined(constructor);
    });

    it('is not just plain string type', () => {
        assertTypeOf<HtmlSpecTagName>().not.toEqualTypeOf<string>();
        // but it is a subset of string
        assertTypeOf<HtmlSpecTagName>().toMatchTypeOf<string>();
    });
});

describe(isHtmlSpecTagName.name, () => {
    it('passes all entries in allHtmlSpecTagNames', () => {
        allHtmlSpecTagNames.forEach((entry) => {
            assert.isTrue(isHtmlSpecTagName(entry), `${entry} should be a valid HTML tag`);
        });
    });

    itCases(isHtmlSpecTagName, [
        {
            it: 'fails on an SVG-only tag name',
            input: 'circle',
            expect: false,
        },
        {
            it: 'fails on a random string',
            input: 'hello there',
            expect: false,
        },
        {
            it: 'accepts a valid raw string',
            input: 'img',
            expect: true,
        },
    ]);
});

describe(ensureHtmlSpecTagName.name, () => {
    it('passes through all entries in allHtmlSpecTagNames', () => {
        allHtmlSpecTagNames.forEach((entry) => {
            assert.strictEqual(
                ensureHtmlSpecTagName(entry),
                entry,
                `${entry} should be pass through ${ensureHtmlSpecTagName.name}`,
            );
        });
    });

    itCases(ensureHtmlSpecTagName, [
        {
            it: 'fails on an SVG-only tag name',
            input: 'circle',
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
            input: 'img',
            expect: 'img',
        },
    ]);
});
