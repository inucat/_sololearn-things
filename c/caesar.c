/**
 * Caesar Cipher in C language
 * Written by Shizuku for SoloLearn project
 * License: CC0-1.0 (almost free for anything)
 * 
 * Input must follow the style:
 * 
 *      shift_value words ...
 * 
 * e.g.) 1 Hello, World!
 *      ... which results in "Ifmmp, Xpsme!"
 * 
 * ! shift_value can be any integer (+/-).
 * 
 * ! Input will be read until 1st newline (\n).
 * 
 * ! Only ASCII characters are acceptable.
 * 
 * ! Sometimes you may have to ENCLOSE text with "" (double quotes).
 * 
 * Enjoy!
 */
#include <stdio.h>
// #include <stdlib.h>
#include <string.h>

/// Shift alphabets or do nothing with the other letters.
/// @param ch A letter to shift
/// @param sval Shift amount
/// @return Shifted or input letter
static char shiftChar(char ch, int sval) {
    if (('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z')) {
        int base = (ch >= 'a') ? 'a' : 'A';
        int s = ch - base + sval;
        while (s < 0) {
            s += 26;
        }
        return s % 26 + base;   
    }
    return ch;
}

int main (int argc, char *argv[]) {
    int shift_val = 0;
    scanf("%d", &shift_val);
    if (!(shift_val%26)) {
        fprintf(stderr, "Shift value is assumed 0.\n");
    }

    // Secure memory to store words
    char encText[8192] = {0};
    fgets(encText, 8192-8, stdin);

    // Shift the letters in the text
    for (int i=0; encText[i]; i++) {
        encText[i] = shiftChar(encText[i], shift_val);
    }
    
    printf("Encrypted text is:\n%s\n", encText);

    return 0;
}
