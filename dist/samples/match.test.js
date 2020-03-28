"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match = require("./match");
describe('validate match', () => {
    test('tests the set of words', () => {
        expect(match.setOfWords).toBeInstanceOf(Set);
        expect([...match.setOfWords].sort()).toEqual(['Some', 'bit', 'duplicate', 'long', 'many', 'of', 'text', 'with', 'words',]);
        expect([...match.setOfWords]).toEqual(['Some', 'long', 'bit', 'of', 'text', 'with', 'many', 'words', 'duplicate',]);
        expect([...match.setOf4LetterWords]).toEqual(['Some', 'long', 'text', 'with', 'many']);
    });
});
//# sourceMappingURL=match.test.js.map