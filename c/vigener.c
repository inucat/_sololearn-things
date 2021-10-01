/*
  Vigener Cipher in C language
  Written by Shizuku for SoloLearn project
  License: CC0-1.0 (almost free for anything)

  Input must follow the style:
    keys ...
    text ...

  e.g.)
    apple pen
    Hello, world! This is a pen.
    (You get "Htaws, jogao! Xuih tw e ptc.")

  Make sure the keys and text are separated by NEWLINE.

  In order to decrypt, prefix a hyphen (-) to the 1st keys.
    e.g.) -apple pen

  Non-alphabet letters in keys are ignored.

  Enjoy!
*/

// Defines max size of string buffers.
#define BUFFER_MAX 1024

#include <stdio.h>
#include <string.h>
#include <ctype.h>

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
  int sval_cnt = 0;
  int sval_arr[BUFFER_MAX] = {0};
  int sval_sign = 1;
  char key[BUFFER_MAX];

  printf("Keys: ");
  fgets(key, BUFFER_MAX-1, stdin);
  printf("%s\n", key);
  
  if (key[0] == '-') {
    sval_sign = -1;
  }
  for (int i=0; key[i]; i++) {
    if (isalpha(key[i])) {
      // Get a shift value for each letter (case-insensitive)
      sval_arr[sval_cnt++] = (key[i] - 1) & 0x1F;
    }
  }
  if (!sval_cnt) {
    fprintf(stderr, "Please enter a valid key.\n");
    return -1;
  }

  // Secure memory to store text
  char text[BUFFER_MAX] = {0};
  printf("Text: ");
  fgets(text, BUFFER_MAX-1, stdin);
  printf("%s\n", text);

  // Shift the letters 
  for (int i=0; text[i]; i++) {
    text[i] = shiftChar(text[i], (sval_arr[i % sval_cnt]) * sval_sign);
  }
  
  printf("\nCiphertext is: %s\n", text);

  return 0;
}
