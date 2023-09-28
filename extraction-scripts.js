/**
 * Built for HTML tag and interface name parsing from the HTML spec web page:
 * https://html.spec.whatwg.org/multipage/indices.html#elements-3
 */
Array.from(document.querySelectorAll('tr'))
    .map((row) => {
        const tagNameElements = Array.from(
            row.querySelectorAll('th > code[id*="elements-3:"] > a'),
        );
        if (!tagNameElements.length) {
            return undefined;
        }
        const constructorName = row.querySelector(
            'td:last-child > code[id*="elements-3:"] > a',
        )?.textContent;
        if (!constructorName) {
            return undefined;
        }

        return tagNameElements.map(
            (tagNameElement) => `${tagNameElement.textContent}: ${constructorName}`,
        );
    })
    .filter((row) => row)
    .flat()
    .join(',\n');

/**
 * Built for SVG tag name parsing from the SVG 2 spec web page:
 * https://www.w3.org/TR/SVG2/eltindex.html
 *
 * I can't find an easy reference that includes tag names and interface names so SVGs only get the
 * tag names.
 */
console.log(
    Array.from(document.querySelectorAll('.element-name > a > span'))
        .map((span) => `'${span.textContent}'`)
        .join(','),
);
