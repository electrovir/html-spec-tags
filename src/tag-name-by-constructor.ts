import {getObjectTypedEntries} from '@augment-vir/common';
import {SpecTagName, SpecTagNameConstructor} from './all-tags';
import {htmlSpecConstructorsByTagName} from './html';
import {mathmlSpecConstructorsByTagName} from './mathml';
import {svgSpecConstructorsByTagName} from './svg';

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
