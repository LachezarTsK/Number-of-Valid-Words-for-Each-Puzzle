
const ASCII_SMALL_CASE_A = 97;

/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
var findNumOfValidWords = function (words, puzzles) {
    const bitmaskToFrequency = new Map();
    fillMap_bitmaskToFrequency(words, bitmaskToFrequency);
    return searchForValidWords(puzzles, bitmaskToFrequency);
};

/**
 * @param {string[]} puzzles
 * @param {string[]} bitmaskToFrequency
 * @return {number[]}
 */
function searchForValidWords(puzzles, bitmaskToFrequency) {
    const validWords = [];
    let size = puzzles.length;

    for (let i = 0; i < size; i++) {
        let headChar = 1 << (puzzles[i].codePointAt(0) - ASCII_SMALL_CASE_A);
        let countValidWords = bitmaskToFrequency.has(headChar) ? bitmaskToFrequency.get(headChar) : 0;
        let bitmask = fillBitmask(puzzles[i].substring(1));

        for (let submask = bitmask; submask > 0; submask = (submask - 1) & bitmask) {
            countValidWords += bitmaskToFrequency.has(submask | headChar) ? bitmaskToFrequency.get(submask | headChar) : 0;
        }
        validWords.push(countValidWords);
    }
    return validWords;
}

/**
 * @param {string[]} words
 * @param {string[]} bitmaskToFrequency
 */
function fillMap_bitmaskToFrequency(words, bitmaskToFrequency) {

    let size = words.length;
    for (let i = 0; i < size; i++) {
        let bitmask = fillBitmask(words[i]);
        let frequency = bitmaskToFrequency.has(bitmask) ? bitmaskToFrequency.get(bitmask) + 1 : 1;
        bitmaskToFrequency.set(bitmask, frequency);
    }
}

/**
 * @param {string} word
 */
function fillBitmask(word) {
    let bitmask = 0;
    let size = word.length;
    for (let i = 0; i < size; i++) {
        bitmask |= 1 << (word.codePointAt(i) - ASCII_SMALL_CASE_A);
    }
    return bitmask;
}
