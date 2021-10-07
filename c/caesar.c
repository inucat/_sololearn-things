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
    // Amount of shift
    int shift_val = 0;

    // Secure memory to store words
    char encText[8192] = {0};

    // If executed without any arguments
    if (argc == 1) {
        scanf("%d", &shift_val);
        if (!(shift_val%26)) {
            fprintf(stderr, "Shift value is assumed 0.\n");
        }
        fgets(encText, 8192-8, stdin);
    } else {
        sscanf(argv[1], "%d", &shift_val);
        for (int i=2, pText=0; i < argc; i++) {
            sscanf(argv[i], "%s", encText + pText);
            pText += strlen(argv[i]);
            if (i != argc - 1) {
                *(encText + pText++) = ' ';
            }
            if (pText > 8192) {
                encText[8191] = 0;
                break;
            }
        }
    }

    // Shift the letters in the text
    for (int i=0; encText[i]; i++) {
        encText[i] = shiftChar(encText[i], shift_val);
    }
    
    printf("Encrypted text is:\n%s\n", encText);

    return 0;
}
