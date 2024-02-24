import {ArrayElement} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {assertTypeOf} from 'run-time-assertions';
import {SvgSpecTagName, allSvgSpecTagNames, svgSpecConstructorsByTagName} from './svg';

describe('svgSpecConstructorsByTagName', () => {
    it('has all SVGElement subclasses for values', () => {
        Object.values(svgSpecConstructorsByTagName).forEach((elementConstructor) => {
            /** Ignore sub-classes that don't exist in the current runtime. */
            if (elementConstructor == undefined) {
                return;
            }

            assert.isTrue(
                elementConstructor.prototype instanceof SVGElement,
                `${elementConstructor.name} is not an SVGElement constructor`,
            );
        });
    });

    it('has strict value types', () => {
        const spanConstructor = svgSpecConstructorsByTagName['g'];

        assertTypeOf(spanConstructor).toEqualTypeOf(SVGGElement);
        assert.strictEqual(spanConstructor, SVGGElement);
    });
});

describe('allSvgSpecTagNames', () => {
    it('has only keys from svgSpecConstructorsByTagName', () => {
        assert.hasAllKeys(svgSpecConstructorsByTagName, allSvgSpecTagNames);
    });

    it('matches SvgSpecTagName', () => {
        assertTypeOf<ArrayElement<typeof allSvgSpecTagNames>>().toEqualTypeOf<SvgSpecTagName>();
    });
});

describe('SvgSpecTagName', () => {
    it('can be used as a key into svgSpecConstructorsByTagName', () => {
        const key: SvgSpecTagName = 'g';
        const constructor = svgSpecConstructorsByTagName[key];
        assert.isDefined(constructor);
    });

    it('is not just plain string type', () => {
        assertTypeOf<SvgSpecTagName>().not.toEqualTypeOf<string>();
        // but it is a subset of string
        assertTypeOf<SvgSpecTagName>().toMatchTypeOf<string>();
    });
});
