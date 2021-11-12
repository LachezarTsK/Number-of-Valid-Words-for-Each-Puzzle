
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

public class Solution {

    Map<Integer, Integer> bitmaskToFrequency;

    public List<Integer> findNumOfValidWords(String[] words, String[] puzzles) {
        fillMap_bitmaskToFrequency(words);
        return searchForValidWords(puzzles);
    }

    public List<Integer> searchForValidWords(String[] puzzles) {
        List<Integer> validWords = new ArrayList<>();
        int size = puzzles.length;

        for (int i = 0; i < size; i++) {
            int headChar = 1 << (puzzles[i].charAt(0) - 'a');
            int countValidWords = bitmaskToFrequency.getOrDefault(headChar, 0);
            int bitmask = fillBitmask(puzzles[i].substring(1));

            for (int submask = bitmask; submask > 0; submask = (submask - 1) & bitmask) {
                countValidWords += bitmaskToFrequency.getOrDefault(submask | headChar, 0);
            }
            validWords.add(countValidWords);
        }
        return validWords;
    }

    public void fillMap_bitmaskToFrequency(String[] words) {
        bitmaskToFrequency = new HashMap<>();
        int size = words.length;
        for (int i = 0; i < size; i++) {
            int bitmask = fillBitmask(words[i]);
            bitmaskToFrequency.put(bitmask, bitmaskToFrequency.getOrDefault(bitmask, 0) + 1);
        }
    }

    public int fillBitmask(String word) {
        int bitmask = 0;
        int size = word.length();
        for (int i = 0; i < size; i++) {
            bitmask |= 1 << (word.charAt(i) - 'a');
        }
        return bitmask;
    }
}
