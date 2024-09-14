import {getObjectTypedEntries} from '@augment-vir/common';
import {SpecTagName, SpecTagNameConstructor} from './all-tags.js';
import {htmlSpecConstructorsByTagName} from './html.js';
import {mathmlSpecConstructorsByTagName} from './mathml.js';
import {svgSpecConstructorsByTagName} from './svg.js';

const constructorEntries: ReadonlyArray<Readonly<[SpecTagNameConstructor, SpecTagName]>> = [
    getObjectTypedEntries(htmlSpecConstructorsByTagName).map(
        ([
            tagName,
            constructor,
        ]): Readonly<[SpecTagNameConstructor, SpecTagName]> => {
            return [
                constructor,
                tagName,
            ];
        },
    ),
    getObjectTypedEntries(mathmlSpecConstructorsByTagName).map(
        ([
            tagName,
            constructor,
        ]): Readonly<[SpecTagNameConstructor, SpecTagName]> => {
            return [
                constructor,
                tagName,
            ];
        },
    ),
    getObjectTypedEntries(svgSpecConstructorsByTagName).map(
        ([
            tagName,
            constructor,
        ]): Readonly<[SpecTagNameConstructor, SpecTagName]> => {
            return [
                constructor,
                tagName,
            ];
        },
    ),
].flat();

export const specTagNameByConstructor = new Map<SpecTagNameConstructor, SpecTagName>(
    constructorEntries,
);

/**
 * Get a spec tag name from the given constructor. Note that some constructors match multiple tags
 * so you might get an unexpected output here.
 */
export function getSpecTagNameFromConstructor(constructor: SpecTagNameConstructor): SpecTagName {
    const tagName = specTagNameByConstructor.get(constructor);

    if (!tagName) {
        throw new TypeError(`'${constructor.name}' is not a valid spec tag name constructor.`);
    }

    return tagName;
}
