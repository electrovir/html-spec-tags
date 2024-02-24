import {ArrayElement} from '@augment-vir/common';
import {assert} from '@open-wc/testing';
import {assertTypeOf} from 'run-time-assertions';
import {MathmlSpecTagName, allMathmlSpecTagNames, mathmlSpecConstructorsByTagName} from './mathml';

describe('mathmlSpecConstructorsByTagName', () => {
    it('has all MathMLElement subclasses for values', () => {
        Object.values(mathmlSpecConstructorsByTagName).forEach((elementConstructor) => {
            /** Ignore sub-classes that don't exist in the current runtime. */
            if (elementConstructor == undefined) {
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

        assertTypeOf(spanConstructor).toEqualTypeOf(MathMLElement);
        assert.strictEqual(spanConstructor, MathMLElement);
    });
});

describe('allMathmlSpecTagNames', () => {
    it('has only keys from mathmlSpecConstructorsByTagName', () => {
        assert.hasAllKeys(mathmlSpecConstructorsByTagName, allMathmlSpecTagNames);
    });

    it('matches MathmlSpecTagName', () => {
        assertTypeOf<
            ArrayElement<typeof allMathmlSpecTagNames>
        >().toEqualTypeOf<MathmlSpecTagName>();
    });
});

describe('MathmlSpecTagName', () => {
    it('can be used as a key into mathmlSpecConstructorsByTagName', () => {
        const key: MathmlSpecTagName = 'mo';
        const constructor = mathmlSpecConstructorsByTagName[key];
        assert.isDefined(constructor);
    });

    it('is not just plain string type', () => {
        assertTypeOf<MathmlSpecTagName>().not.toEqualTypeOf<string>();
        // but it is a subset of string
        assertTypeOf<MathmlSpecTagName>().toMatchTypeOf<string>();
    });
});
