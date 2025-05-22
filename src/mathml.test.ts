import {assert} from '@augment-vir/assert';
import {type ArrayElement} from '@augment-vir/common';
import {describe, it} from '@augment-vir/test';
import {
    type MathmlSpecTagName,
    allMathmlSpecTagNames,
    mathmlSpecConstructorsByTagName,
} from './mathml.js';

describe('mathmlSpecConstructorsByTagName', () => {
    it('has all MathMLElement subclasses for values', () => {
        Object.values(mathmlSpecConstructorsByTagName).forEach((elementConstructor) => {
            /** Ignore sub-classes that don't exist in the current runtime. */
            if ((elementConstructor as typeof elementConstructor | undefined) == undefined) {
                return;
            }

            assert.isTrue(
                elementConstructor.prototype instanceof MathMLElement ||
                    elementConstructor === MathMLElement,
                `${elementConstructor.name} is not an MathMLElement constructor`,
            );
        });
    });

    it('has strict value types', () => {
        const spanConstructor = mathmlSpecConstructorsByTagName['mo'];

        assert.tsType(spanConstructor).equals(MathMLElement);
        assert.strictEquals(spanConstructor, MathMLElement);
    });
});

describe('allMathmlSpecTagNames', () => {
    it('has only keys from mathmlSpecConstructorsByTagName', () => {
        assert.hasKeys(mathmlSpecConstructorsByTagName, allMathmlSpecTagNames);
    });

    it('matches MathmlSpecTagName', () => {
        assert.tsType<ArrayElement<typeof allMathmlSpecTagNames>>().equals<MathmlSpecTagName>();
    });
});

describe('MathmlSpecTagName', () => {
    it('can be used as a key into mathmlSpecConstructorsByTagName', () => {
        const key: MathmlSpecTagName = 'mo';
        const constructor = mathmlSpecConstructorsByTagName[key];
        assert.isDefined(constructor);
    });

    it('is not just plain string type', () => {
        assert.tsType<MathmlSpecTagName>().notEquals<string>();
        // but it is a subset of string
        assert.tsType<MathmlSpecTagName>().matches<string>();
    });
});
