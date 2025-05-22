import {assert} from '@augment-vir/assert';
import {type ArrayElement} from '@augment-vir/common';
import {describe, it} from '@augment-vir/test';
import {type SvgSpecTagName, allSvgSpecTagNames, svgSpecConstructorsByTagName} from './svg.js';

describe('svgSpecConstructorsByTagName', () => {
    it('has all SVGElement subclasses for values', () => {
        Object.values(svgSpecConstructorsByTagName).forEach((elementConstructor) => {
            /** Ignore sub-classes that don't exist in the current runtime. */
            if ((elementConstructor as typeof elementConstructor | undefined) == undefined) {
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

        assert.tsType(spanConstructor).equals(SVGGElement);
        assert.strictEquals(spanConstructor, SVGGElement);
    });
});

describe('allSvgSpecTagNames', () => {
    it('has only keys from svgSpecConstructorsByTagName', () => {
        assert.hasKeys(svgSpecConstructorsByTagName, allSvgSpecTagNames);
    });

    it('matches SvgSpecTagName', () => {
        assert.tsType<ArrayElement<typeof allSvgSpecTagNames>>().equals<SvgSpecTagName>();
    });
});

describe('SvgSpecTagName', () => {
    it('can be used as a key into svgSpecConstructorsByTagName', () => {
        const key: SvgSpecTagName = 'g';
        const constructor = svgSpecConstructorsByTagName[key];
        assert.isDefined(constructor);
    });

    it('is not just plain string type', () => {
        assert.tsType<SvgSpecTagName>().notEquals<string>();
        // but it is a subset of string
        assert.tsType<SvgSpecTagName>().matches<string>();
    });
});
