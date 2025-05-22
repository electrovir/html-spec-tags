import {type Constructor} from 'type-fest';

/**
 * A string literal type that only matches the MathML spec tag names.
 *
 * @category Tag
 */
export type MathmlSpecTagName = keyof typeof mathmlSpecConstructorsByTagName;

/**
 * All current MathML spec tag names mapped to their respective element constructors.
 *
 * Generated from `MathMLElementTagNameMap` in `typescript/lib/lib.dom.d.ts`:
 * https://raw.githubusercontent.com/microsoft/TypeScript/main/src/lib/dom.generated.d.ts
 *
 * @category Tag
 */
export const mathmlSpecConstructorsByTagName = {
    annotation: globalThis.MathMLElement,
    'annotation-xml': globalThis.MathMLElement,
    maction: globalThis.MathMLElement,
    math: globalThis.MathMLElement,
    merror: globalThis.MathMLElement,
    mfrac: globalThis.MathMLElement,
    mi: globalThis.MathMLElement,
    mmultiscripts: globalThis.MathMLElement,
    mn: globalThis.MathMLElement,
    mo: globalThis.MathMLElement,
    mover: globalThis.MathMLElement,
    mpadded: globalThis.MathMLElement,
    mphantom: globalThis.MathMLElement,
    mprescripts: globalThis.MathMLElement,
    mroot: globalThis.MathMLElement,
    mrow: globalThis.MathMLElement,
    ms: globalThis.MathMLElement,
    mspace: globalThis.MathMLElement,
    msqrt: globalThis.MathMLElement,
    mstyle: globalThis.MathMLElement,
    msub: globalThis.MathMLElement,
    msubsup: globalThis.MathMLElement,
    msup: globalThis.MathMLElement,
    mtable: globalThis.MathMLElement,
    mtd: globalThis.MathMLElement,
    mtext: globalThis.MathMLElement,
    mtr: globalThis.MathMLElement,
    munder: globalThis.MathMLElement,
    munderover: globalThis.MathMLElement,
    semantics: globalThis.MathMLElement,
} as const satisfies Readonly<Record<string, Constructor<MathMLElement>>>;

/**
 * All possible MathML spec tag names within a single array.
 *
 * @category Tag
 */
export const allMathmlSpecTagNames: ReadonlyArray<MathmlSpecTagName> = Object.keys(
    mathmlSpecConstructorsByTagName,
) as ReadonlyArray<MathmlSpecTagName>;
