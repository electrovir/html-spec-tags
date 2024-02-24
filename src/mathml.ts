import {Constructor} from 'type-fest';

/** A string literal type that only matches the MathML spec tag names. */
export type MathmlSpecTagName = keyof typeof mathmlSpecConstructorsByTagName;

/**
 * All current MathML spec tag names mapped to their respective element constructors.
 *
 * Generated from `MathMLElementTagNameMap` in `typescript/lib/lib.dom.d.ts`:
 * https://raw.githubusercontent.com/microsoft/TypeScript/main/src/lib/dom.generated.d.ts
 */
export const mathmlSpecConstructorsByTagName = {
    annotation: window.MathMLElement,
    'annotation-xml': window.MathMLElement,
    maction: window.MathMLElement,
    math: window.MathMLElement,
    merror: window.MathMLElement,
    mfrac: window.MathMLElement,
    mi: window.MathMLElement,
    mmultiscripts: window.MathMLElement,
    mn: window.MathMLElement,
    mo: window.MathMLElement,
    mover: window.MathMLElement,
    mpadded: window.MathMLElement,
    mphantom: window.MathMLElement,
    mprescripts: window.MathMLElement,
    mroot: window.MathMLElement,
    mrow: window.MathMLElement,
    ms: window.MathMLElement,
    mspace: window.MathMLElement,
    msqrt: window.MathMLElement,
    mstyle: window.MathMLElement,
    msub: window.MathMLElement,
    msubsup: window.MathMLElement,
    msup: window.MathMLElement,
    mtable: window.MathMLElement,
    mtd: window.MathMLElement,
    mtext: window.MathMLElement,
    mtr: window.MathMLElement,
    munder: window.MathMLElement,
    munderover: window.MathMLElement,
    semantics: window.MathMLElement,
} as const satisfies Readonly<Record<string, Constructor<MathMLElement>>>;

/** All possible MathML spec tag names within a single array. */
export const allMathmlSpecTagNames: ReadonlyArray<MathmlSpecTagName> = Object.keys(
    mathmlSpecConstructorsByTagName,
) as ReadonlyArray<MathmlSpecTagName>;
