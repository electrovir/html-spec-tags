import {Constructor} from 'type-fest';

/** A string literal type that only matches the SVG spec tag names. */
export type SvgSpecTagName = keyof typeof svgSpecConstructorsByTagName;

/**
 * All current SVG spec tag names mapped to their respective element constructors.
 *
 * Generated from `SVGElementTagNameMap` in `typescript/lib/lib.dom.d.ts`:
 * https://raw.githubusercontent.com/microsoft/TypeScript/main/src/lib/dom.generated.d.ts
 */
export const svgSpecConstructorsByTagName = {
    a: window.SVGAElement,
    animate: window.SVGAnimateElement,
    animateMotion: window.SVGAnimateMotionElement,
    animateTransform: window.SVGAnimateTransformElement,
    circle: window.SVGCircleElement,
    clipPath: window.SVGClipPathElement,
    defs: window.SVGDefsElement,
    desc: window.SVGDescElement,
    ellipse: window.SVGEllipseElement,
    feBlend: window.SVGFEBlendElement,
    feColorMatrix: window.SVGFEColorMatrixElement,
    feComponentTransfer: window.SVGFEComponentTransferElement,
    feComposite: window.SVGFECompositeElement,
    feConvolveMatrix: window.SVGFEConvolveMatrixElement,
    feDiffuseLighting: window.SVGFEDiffuseLightingElement,
    feDisplacementMap: window.SVGFEDisplacementMapElement,
    feDistantLight: window.SVGFEDistantLightElement,
    feDropShadow: window.SVGFEDropShadowElement,
    feFlood: window.SVGFEFloodElement,
    feFuncA: window.SVGFEFuncAElement,
    feFuncB: window.SVGFEFuncBElement,
    feFuncG: window.SVGFEFuncGElement,
    feFuncR: window.SVGFEFuncRElement,
    feGaussianBlur: window.SVGFEGaussianBlurElement,
    feImage: window.SVGFEImageElement,
    feMerge: window.SVGFEMergeElement,
    feMergeNode: window.SVGFEMergeNodeElement,
    feMorphology: window.SVGFEMorphologyElement,
    feOffset: window.SVGFEOffsetElement,
    fePointLight: window.SVGFEPointLightElement,
    feSpecularLighting: window.SVGFESpecularLightingElement,
    feSpotLight: window.SVGFESpotLightElement,
    feTile: window.SVGFETileElement,
    feTurbulence: window.SVGFETurbulenceElement,
    filter: window.SVGFilterElement,
    foreignObject: window.SVGForeignObjectElement,
    g: window.SVGGElement,
    image: window.SVGImageElement,
    line: window.SVGLineElement,
    linearGradient: window.SVGLinearGradientElement,
    marker: window.SVGMarkerElement,
    mask: window.SVGMaskElement,
    metadata: window.SVGMetadataElement,
    mpath: window.SVGMPathElement,
    path: window.SVGPathElement,
    pattern: window.SVGPatternElement,
    polygon: window.SVGPolygonElement,
    polyline: window.SVGPolylineElement,
    radialGradient: window.SVGRadialGradientElement,
    rect: window.SVGRectElement,
    script: window.SVGScriptElement,
    set: window.SVGSetElement,
    stop: window.SVGStopElement,
    style: window.SVGStyleElement,
    svg: window.SVGSVGElement,
    switch: window.SVGSwitchElement,
    symbol: window.SVGSymbolElement,
    text: window.SVGTextElement,
    textPath: window.SVGTextPathElement,
    title: window.SVGTitleElement,
    tspan: window.SVGTSpanElement,
    use: window.SVGUseElement,
    view: window.SVGViewElement,
} as const satisfies Readonly<Record<string, Constructor<SVGElement>>>;

/** All possible SVG spec tag names within a single array. */
export const allSvgSpecTagNames: ReadonlyArray<SvgSpecTagName> = Object.keys(
    svgSpecConstructorsByTagName,
) as ReadonlyArray<SvgSpecTagName>;
