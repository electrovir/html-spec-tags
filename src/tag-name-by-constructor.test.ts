import {assert} from '@augment-vir/assert';
import {getObjectTypedEntries} from '@augment-vir/common';
import {describe, itCases, type FunctionTestCase} from '@augment-vir/test';
import {SpecTagName, type SpecTagNameConstructor} from './all-tags.js';
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
        FunctionTestCase<typeof getSpecTagNameFromConstructor>
    > = constructorEntries.map(
        ([
            tagName,
            constructor,
        ]) => {
            return {
                it: `works for '${constructor.name}'`,
                input: constructor,
                /** Don't compare the tag name because some constructors match multiple tag names. */
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
        ...constructorEntryTestCases,
    ]);
});
