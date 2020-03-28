"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function* execRegEx(reg, text) {
    const regLocal = new RegExp(reg);
    let r;
    while (r = regLocal.exec(text)) {
        yield r;
    }
}
function match(reg, text) {
    return __1.genSequence(execRegEx(reg, text))
        // extract the full match
        .map(a => a[0]);
}
function matchWords(text) {
    return __1.genSequence(match(/\w+/g, text));
}
function toSetOfWords(text) {
    return new Set(matchWords(text));
}
exports.toSetOfWords = toSetOfWords;
exports.text = 'Some long bit of text with many words, duplicate words...';
exports.setOfWords = toSetOfWords(exports.text);
// Walk through the set of words and pull out the 4 letter one.
exports.setOf4LetterWords = new Set(__1.genSequence(exports.setOfWords).filter(a => a.length === 4));
//# sourceMappingURL=match.js.map