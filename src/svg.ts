import {type Constructor} from '@augment-vir/common';

/**
 * A string literal type that only matches the SVG spec tag names.
 *
 * @category Tag
 */
export type SvgSpecTagName = keyof typeof svgSpecConstructorsByTagName;

/**
 * All current SVG spec tag names mapped to their respective element constructors.
 *
 * Generated from `SVGElementTagNameMap` in `typescript/lib/lib.dom.d.ts`:
 * https://raw.githubusercontent.com/microsoft/TypeScript/main/src/lib/dom.generated.d.ts
 *
 * @category Tag
 */
export const svgSpecConstructorsByTagName = {
    a: globalThis.SVGAElement,
    animate: globalThis.SVGAnimateElement,
    animateMotion: globalThis.SVGAnimateMotionElement,
    animateTransform: globalThis.SVGAnimateTransformElement,
    circle: globalThis.SVGCircleElement,
    clipPath: globalThis.SVGClipPathElement,
    defs: globalThis.SVGDefsElement,
    desc: globalThis.SVGDescElement,
    ellipse: globalThis.SVGEllipseElement,
    feBlend: globalThis.SVGFEBlendElement,
    feColorMatrix: globalThis.SVGFEColorMatrixElement,
    feComponentTransfer: globalThis.SVGFEComponentTransferElement,
    feComposite: globalThis.SVGFECompositeElement,
    feConvolveMatrix: globalThis.SVGFEConvolveMatrixElement,
    feDiffuseLighting: globalThis.SVGFEDiffuseLightingElement,
    feDisplacementMap: globalThis.SVGFEDisplacementMapElement,
    feDistantLight: globalThis.SVGFEDistantLightElement,
    feDropShadow: globalThis.SVGFEDropShadowElement,
    feFlood: globalThis.SVGFEFloodElement,
    feFuncA: globalThis.SVGFEFuncAElement,
    feFuncB: globalThis.SVGFEFuncBElement,
    feFuncG: globalThis.SVGFEFuncGElement,
    feFuncR: globalThis.SVGFEFuncRElement,
    feGaussianBlur: globalThis.SVGFEGaussianBlurElement,
    feImage: globalThis.SVGFEImageElement,
    feMerge: globalThis.SVGFEMergeElement,
    feMergeNode: globalThis.SVGFEMergeNodeElement,
    feMorphology: globalThis.SVGFEMorphologyElement,
    feOffset: globalThis.SVGFEOffsetElement,
    fePointLight: globalThis.SVGFEPointLightElement,
    feSpecularLighting: globalThis.SVGFESpecularLightingElement,
    feSpotLight: globalThis.SVGFESpotLightElement,
    feTile: globalThis.SVGFETileElement,
    feTurbulence: globalThis.SVGFETurbulenceElement,
    filter: globalThis.SVGFilterElement,
    foreignObject: globalThis.SVGForeignObjectElement,
    g: globalThis.SVGGElement,
    image: globalThis.SVGImageElement,
    line: globalThis.SVGLineElement,
    linearGradient: globalThis.SVGLinearGradientElement,
    marker: globalThis.SVGMarkerElement,
    mask: globalThis.SVGMaskElement,
    metadata: globalThis.SVGMetadataElement,
    mpath: globalThis.SVGMPathElement,
    path: globalThis.SVGPathElement,
    pattern: globalThis.SVGPatternElement,
    polygon: globalThis.SVGPolygonElement,
    polyline: globalThis.SVGPolylineElement,
    radialGradient: globalThis.SVGRadialGradientElement,
    rect: globalThis.SVGRectElement,
    script: globalThis.SVGScriptElement,
    set: globalThis.SVGSetElement,
    stop: globalThis.SVGStopElement,
    style: globalThis.SVGStyleElement,
    svg: globalThis.SVGSVGElement,
    switch: globalThis.SVGSwitchElement,
    symbol: globalThis.SVGSymbolElement,
    text: globalThis.SVGTextElement,
    textPath: globalThis.SVGTextPathElement,
    title: globalThis.SVGTitleElement,
    tspan: globalThis.SVGTSpanElement,
    use: globalThis.SVGUseElement,
    view: globalThis.SVGViewElement,
} as const satisfies Readonly<Record<string, Constructor<SVGElement>>>;

/**
 * All possible SVG spec tag names within a single array.
 *
 * @category Tag
 */
export const allSvgSpecTagNames: ReadonlyArray<SvgSpecTagName> = Object.keys(
    svgSpecConstructorsByTagName,
) as ReadonlyArray<SvgSpecTagName>;
