def encode(plaintext, cipherkey):
    cipherkey = cipherkey.upper()
    
    i = 0
    result = ""

    for c in plaintext:
        if c.isalpha():
            pvalue = ord(c)

            cvalue = ord(cipherkey[i])
            cvalue -= 65

            pvalue += cvalue
            if (c.isupper() and pvalue > 90) or (c.islower() and pvalue > 122):
                pvalue -= 26

            result += chr(pvalue)

            i += 1
            if i >= len(cipherkey):
                i = 0
        else:
            result += c

    return result

def decode(ciphertext, cipherkey):
    cipherkey = cipherkey.upper()

    i = 0
    result = ""

    for c in ciphertext:
        if c.isalpha():
            pvalue = ord(c)

            cvalue = ord(cipherkey[i])
            cvalue -= 65

            pvalue -= cvalue
            if (c.isupper() and pvalue < 65) or (c.islower() and pvalue < 97):
                pvalue += 26

            result += chr(pvalue)

            i += 1
            if i >= len(cipherkey):
                i = 0
        else:
            result += c

    return result
