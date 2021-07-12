function caclLineIndent(line: string): number {
    const whitespace = /^(\s+)/;
    let space = whitespace.exec(line);
    return +(space ? space[1].length : 0);
}

export function reduceIndentByLast(s: string): string {
    // 0. Reduce the indent of multi-line string by the last line indent.
    let arr = s.split(/\r?\n/g);
    if (arr.length < 2) {
        return s;
    }
    let last = caclLineIndent(arr[arr.length-1]);
    arr.forEach((line: string, index: number) => {
        let l = caclLineIndent(line);
        if (l >= last) {
            arr[index] = line.slice(last);
        }
    });
    return arr.join('\n');
}
