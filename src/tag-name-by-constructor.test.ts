import {assert, check} from '@augment-vir/assert';
import {getObjectTypedEntries} from '@augment-vir/common';
import {describe, itCases, type FunctionTestCase} from '@augment-vir/test';
import {type SpecTagName, type SpecTagNameConstructor} from './all-tags.js';
import {htmlSpecConstructorsByTagName} from './html.js';
import {mathmlSpecConstructorsByTagName} from './mathml.js';
import {svgSpecConstructorsByTagName} from './svg.js';
import {getSpecTagNameFromConstructor} from './tag-name-by-constructor.js';

describe(getSpecTagNameFromConstructor.name, () => {
    const constructorEntries: [SpecTagName, SpecTagNameConstructor][] = [
        getObjectTypedEntries(htmlSpecConstructorsByTagName),
        getObjectTypedEntries(mathmlSpecConstructorsByTagName),
        getObjectTypedEntries(svgSpecConstructorsByTagName),
    ].flat();

    assert.isAbove(constructorEntries.length, 0, 'needs some test cases');

    const constructorEntryTestCases: ReadonlyArray<
        FunctionTestCase<typeof getSpecTagNameFromConstructor> | undefined
    > = constructorEntries.map(
        ([
            tagName,
            constructor,
        ]) => {
            if (!(constructor as SpecTagNameConstructor | undefined)) {
                /** Some of the constructors don't exist in some tested run times. */
                return undefined;
            }
            return {
                /**
                 * Don't interpolate the tag name because some constructors match multiple tag
                 * names.
                 */
                it: `works for '${constructor.name}'`,
                input: constructor,
                throws: undefined,
            };
        },
    );

    itCases(getSpecTagNameFromConstructor, [
        {
            it: 'errors on invalid constructor',
            // @ts-expect-error: intentionally use invalid constructor
            input: RegExp,
            throws: {matchConstructor: TypeError},
        },
        ...constructorEntryTestCases.filter(check.isTruthy),
    ]);
});
