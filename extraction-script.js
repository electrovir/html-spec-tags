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
