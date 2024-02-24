import {ArrayElement} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {assertTypeOf} from 'run-time-assertions';
import {HtmlSpecTagName, allHtmlSpecTagNames, htmlSpecConstructorsByTagName} from './html';

describe('htmlSpecConstructorsByTagName', () => {
    it('has all HTMLElement subclasses for values', () => {
        Object.values(htmlSpecConstructorsByTagName).forEach((elementConstructor) => {
            /** Ignore sub-classes that don't exist in the current runtime. */
            if (elementConstructor == undefined) {
                return;
            }

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
        const key: HtmlSpecTagName = 'span';
        const constructor = htmlSpecConstructorsByTagName[key];
        assert.isDefined(constructor);
    });

    it('is not just plain string type', () => {
        assertTypeOf<HtmlSpecTagName>().not.toEqualTypeOf<string>();
        // but it is a subset of string
        assertTypeOf<HtmlSpecTagName>().toMatchTypeOf<string>();
    });
});
