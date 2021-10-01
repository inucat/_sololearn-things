# Cryptography - Hashing
# by Shizuku
# License : CC-BY
# 
# Enter some greeting messages when asked.
# 
# You can change the PROBABILITY value below.

import hashlib, time, random

# Probability that a malicious hacker alters Alice's data
PROBABILITY = 0.3

# Used for the Caesar cipher
SHARED_KEY = 26

# Print with delay (disabled for SoloLearn)
def dprint(s, t):
  print(s)
  time.sleep(0)
  return

# Caesar cipher (ASCII-based, not alphabet-based)
def caesar(s, v):
  ret = ''
  base = ord(' ')
  for c in s:
    sval = ord(c) - base + v
    while sval < 0:
      sval = sval + 97
    ret = ret + chr( base + sval % 97 )
  return ret

# A commonplace story
print(
  'Alice is going to send Bob a message.\n'
  'Now they are sharing a key.')
text = input("Enter Alice's message to Bob > \n")

# Alice generates text and its hash, then encrypts them
hash_object = hashlib.sha1(text.encode())
hash = str(hash_object.hexdigest())
e_text = caesar(text, SHARED_KEY)
e_hash = caesar(hash, SHARED_KEY)

dprint(f'  Message : {text}', 0)
dprint(f'  Hash: {hash}', 2.5)

# If someone alters the data ...
if (random.random() < PROBABILITY):
  alt = 'Banana is yellow.'
  e_text = caesar(alt, SHARED_KEY)

dprint(
  "Bob received Alice's encrypted message and hash! "
  "He decrypted them, resulting in:", 1.2)

# Bob tries to decrypt both text and hash
d_text = caesar(e_text, -SHARED_KEY)
d_hash = caesar(e_hash, -SHARED_KEY)

# Then Bob calculates hash of decrypted text, then compares them
bob_hash = str(hashlib.sha1(d_text.encode()).hexdigest())

print(f'  Bob got: {d_text}')
print(f"  Alice's hash: {d_hash}")
print(f"  Bob's hash  : {bob_hash}")
if bob_hash == d_hash:
  print("Hashes are identical, so this is indeed Alice's!")
else:
  print("Hashes are different, so this is NOT Alice's!")
