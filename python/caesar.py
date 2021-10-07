# CCaesar in Python
# by Shizuku
# License : CC0
# 
# Enter some greeting messages when asked.

# Caesar cipher (alphabet-based)
def caesar(s, v):
	ret = ''
	base = 0
	for c in s:
		ord_c = ord(c)
		if ord_c in range(ord('A'), ord('Z') + 1):
			base = ord('A')
		elif ord_c in range(ord('a'), ord('z') + 1):
			base = ord('a')
		else:
			ret = ret + c
			continue
		sval = ord(c) - base + v
		while sval < 0:
			sval = sval + 26
		ret = ret + chr( base + sval % 26 )
	return ret

text = None
with open("text.txt", "r") as f:
	text = f.read()

e_text = caesar(text, 13)
print(e_text)
