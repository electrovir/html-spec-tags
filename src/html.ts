import {isRunTimeType} from 'run-time-assertions';

/** A string literal type that only matches the HTML spec tag names. */
export type HtmlSpecTagName = keyof typeof htmlSpecConstructorsByTagName;

/** A mapping of all HTML spec tag names to their respective element classes. */
export const htmlSpecConstructorsByTagName = {
    a: window.HTMLAnchorElement,
    abbr: window.HTMLElement,
    address: window.HTMLElement,
    area: window.HTMLAreaElement,
    article: window.HTMLElement,
    aside: window.HTMLElement,
    audio: window.HTMLAudioElement,
    b: window.HTMLElement,
    base: window.HTMLBaseElement,
    bdi: window.HTMLElement,
    bdo: window.HTMLElement,
    blockquote: window.HTMLQuoteElement,
    body: window.HTMLBodyElement,
    br: window.HTMLBRElement,
    button: window.HTMLButtonElement,
    canvas: window.HTMLCanvasElement,
    caption: window.HTMLTableCaptionElement,
    cite: window.HTMLElement,
    code: window.HTMLElement,
    col: window.HTMLTableColElement,
    colgroup: window.HTMLTableColElement,
    data: window.HTMLDataElement,
    datalist: window.HTMLDataListElement,
    dd: window.HTMLElement,
    del: window.HTMLModElement,
    details: window.HTMLDetailsElement,
    dfn: window.HTMLElement,
    dialog: window.HTMLDialogElement,
    div: window.HTMLDivElement,
    dl: window.HTMLDListElement,
    dt: window.HTMLElement,
    em: window.HTMLElement,
    embed: window.HTMLEmbedElement,
    fieldset: window.HTMLFieldSetElement,
    figcaption: window.HTMLElement,
    figure: window.HTMLElement,
    footer: window.HTMLElement,
    form: window.HTMLFormElement,
    h1: window.HTMLHeadingElement,
    h2: window.HTMLHeadingElement,
    h3: window.HTMLHeadingElement,
    h4: window.HTMLHeadingElement,
    h5: window.HTMLHeadingElement,
    h6: window.HTMLHeadingElement,
    head: window.HTMLHeadElement,
    header: window.HTMLElement,
    hgroup: window.HTMLElement,
    hr: window.HTMLHRElement,
    html: window.HTMLHtmlElement,
    i: window.HTMLElement,
    iframe: window.HTMLIFrameElement,
    img: window.HTMLImageElement,
    input: window.HTMLInputElement,
    ins: window.HTMLModElement,
    kbd: window.HTMLElement,
    label: window.HTMLLabelElement,
    legend: window.HTMLLegendElement,
    li: window.HTMLLIElement,
    link: window.HTMLLinkElement,
    main: window.HTMLElement,
    map: window.HTMLMapElement,
    mark: window.HTMLElement,
    menu: window.HTMLMenuElement,
    meta: window.HTMLMetaElement,
    meter: window.HTMLMeterElement,
    nav: window.HTMLElement,
    noscript: window.HTMLElement,
    object: window.HTMLObjectElement,
    ol: window.HTMLOListElement,
    optgroup: window.HTMLOptGroupElement,
    option: window.HTMLOptionElement,
    output: window.HTMLOutputElement,
    p: window.HTMLParagraphElement,
    picture: window.HTMLPictureElement,
    pre: window.HTMLPreElement,
    progress: window.HTMLProgressElement,
    q: window.HTMLQuoteElement,
    rp: window.HTMLElement,
    rt: window.HTMLElement,
    ruby: window.HTMLElement,
    s: window.HTMLElement,
    samp: window.HTMLElement,
    script: window.HTMLScriptElement,
    search: window.HTMLElement,
    section: window.HTMLElement,
    select: window.HTMLSelectElement,
    slot: window.HTMLSlotElement,
    small: window.HTMLElement,
    source: window.HTMLSourceElement,
    span: window.HTMLSpanElement,
    strong: window.HTMLElement,
    style: window.HTMLStyleElement,
    sub: window.HTMLElement,
    summary: window.HTMLElement,
    sup: window.HTMLElement,
    table: window.HTMLTableElement,
    tbody: window.HTMLTableSectionElement,
    td: window.HTMLTableCellElement,
    template: window.HTMLTemplateElement,
    textarea: window.HTMLTextAreaElement,
    tfoot: window.HTMLTableSectionElement,
    th: window.HTMLTableCellElement,
    thead: window.HTMLTableSectionElement,
    time: window.HTMLTimeElement,
    title: window.HTMLTitleElement,
    tr: window.HTMLTableRowElement,
    track: window.HTMLTrackElement,
    u: window.HTMLElement,
    ul: window.HTMLUListElement,
    var: window.HTMLElement,
    video: window.HTMLVideoElement,
    wbr: window.HTMLElement,
} as const;

/** All possible HTML spec tag names within a single array. */
export const allHtmlSpecTagNames: ReadonlyArray<HtmlSpecTagName> = Object.keys(
    htmlSpecConstructorsByTagName,
) as ReadonlyArray<HtmlSpecTagName>;

/** Type guards the input as a valid HTML spec tag name. */
export function isHtmlSpecTagName(input: unknown): input is HtmlSpecTagName {
    return isRunTimeType(input, 'string') && input in htmlSpecConstructorsByTagName;
}

/** Passes the input through if it's a valid HTML spec tag name, throws an error if not. */
export function ensureHtmlSpecTagName(input: unknown): HtmlSpecTagName {
    if (isHtmlSpecTagName(input)) {
        return input;
    } else if (!isRunTimeType(input, 'string')) {
        throw new Error(
            `'${JSON.stringify(input)}' is not a string, it cannot be a valid HtmlSpecTagName.`,
        );
    } else {
        throw new Error(`'${input}' is not a valid HtmlSpecTagName.`);
    }
}
