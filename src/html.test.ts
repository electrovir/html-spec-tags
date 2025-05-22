import {assert} from '@augment-vir/assert';
import {type ArrayElement} from '@augment-vir/common';
import {describe, it} from '@augment-vir/test';
import {type HtmlSpecTagName, allHtmlSpecTagNames, htmlSpecConstructorsByTagName} from './html.js';

describe('htmlSpecConstructorsByTagName', () => {
    it('has all HTMLElement subclasses for values', () => {
        Object.values(htmlSpecConstructorsByTagName).forEach((elementConstructor) => {
            /** Ignore sub-classes that don't exist in the current runtime. */
            if ((elementConstructor as typeof elementConstructor | undefined) == undefined) {
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

        assert.tsType(spanConstructor).equals(HTMLSpanElement);
        assert.strictEquals(spanConstructor, HTMLSpanElement);
    });
});

describe('allHtmlSpecTagNames', () => {
    it('has only keys from htmlSpecConstructorsByTagName', () => {
        assert.hasKeys(htmlSpecConstructorsByTagName, allHtmlSpecTagNames);
    });

    it('matches HtmlSpecTagName', () => {
        assert.tsType<ArrayElement<typeof allHtmlSpecTagNames>>().equals<HtmlSpecTagName>();
    });
});

describe('HtmlSpecTagName', () => {
    it('can be used as a key into htmlSpecConstructorsByTagName', () => {
        const key: HtmlSpecTagName = 'span';
        const constructor = htmlSpecConstructorsByTagName[key];
        assert.isDefined(constructor);
    });

    it('is not just plain string type', () => {
        assert.tsType<HtmlSpecTagName>().notEquals<string>();
        // but it is a subset of string
        assert.tsType<HtmlSpecTagName>().matches<string>();
    });
});
