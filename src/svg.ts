import {typedArrayIncludes} from '@augment-vir/common';
import {isRunTimeType} from 'run-time-assertions';

/** A string literal type that only matches the SVG spec tag names. */
export type SvgSpecTagName = (typeof allSvgSpecTagNames)[number];

/** All possible SVG spec 2 tag names within a single array. */
export const allSvgSpecTagNames = [
    'a',
    'animate',
    'animateMotion',
    'animateTransform',
    'audio',
    'canvas',
    'circle',
    'clipPath',
    'defs',
    'desc',
    'discard',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'foreignObject',
    'g',
    'iframe',
    'image',
    'line',
    'linearGradient',
    'marker',
    'mask',
    'metadata',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'radialGradient',
    'rect',
    'script',
    'set',
    'stop',
    'style',
    'svg',
    'switch',
    'symbol',
    'text',
    'textPath',
    'title',
    'tspan',
    'unknown',
    'use',
    'video',
    'view',
] as const;

/** Type guards the input as a valid SVG spec tag name. */
export function isSvgSpecTagName(input: unknown): input is SvgSpecTagName {
    return typedArrayIncludes(allSvgSpecTagNames, input);
}

/** Passes the input through if it's a valid SVG spec tag name, throws an error if not. */
export function ensureSvgSpecTagName(input: unknown): SvgSpecTagName {
    if (isSvgSpecTagName(input)) {
        return input;
    } else if (!isRunTimeType(input, 'string')) {
        throw new Error(
            `'${JSON.stringify(input)}' is not a string, it cannot be a valid SvgSpecTagName.`,
        );
    } else {
        throw new Error(`'${input}' is not a valid SvgSpecTagName.`);
    }
}
