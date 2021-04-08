import * as R from 'ramda';

export function getChangedTag(tag, newText, oldText) {
    return R.pipe(
        R.zipWith(
            (a, b) => ({new: a, old: b})),
        R.find((pair) => pair.new !== pair.old)
    )(R.match(tag, newText), R.match(tag, oldText));
}