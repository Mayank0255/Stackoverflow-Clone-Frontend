const injectEllipsis = (html) => {
    const re = /<\/p>/g
    const str = html;
    let lastMatchIndex;
    let match;
    while ((match = re.exec(str)) != null) {
        lastMatchIndex = match.index;
    }

    return html.substring(0, lastMatchIndex) + "..." + html.substring(lastMatchIndex)
}

export default injectEllipsis;