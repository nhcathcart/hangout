//replace all spaces with dashes
export function dashify(input: string) {
    return input.replace(/\s+/g, '-').toLowerCase();
}