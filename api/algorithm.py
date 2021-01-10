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

import string
from scipy.stats import chisquare
import numpy

wikipedia = {'E': 12.70, 'T': 9.06, 'A': 8.17, 'O': 7.51, 'I': 6.97, 'N': 6.75, 'S': 6.33, 'H': 6.09, 'R': 5.99, 'D': 4.25, 'L': 4.03, 'C': 2.78, 'U': 2.76, 'M': 2.41, 'W': 2.36, 'F': 2.23, 'G': 2.02, 'Y': 1.97, 'P': 1.93, 'B': 1.29, 'V': 0.98, 'K': 0.77, 'J': 0.15, 'X': 0.15, 'Q': 0.10, 'Z': 0.07}
cornell = {'E': 12.02, 'T': 9.10, 'A': 8.12, 'O': 7.68, 'I': 7.31, 'N': 6.95, 'S': 6.28, 'H': 5.92, 'R': 6.02, 'D': 4.32, 'L': 3.98, 'C': 2.71, 'U': 2.88, 'M': 2.61, 'W': 2.09, 'F': 2.30, 'G': 2.03, 'Y': 2.11, 'P': 1.82, 'B': 1.49, 'V': 1.11, 'K': 0.69, 'J': 0.10, 'X': 0.17, 'Q': 0.11, 'Z': 0.07}
wellesley = {'E': 12.702, 'T': 9.056, 'A': 8.167, 'O': 7.507, 'I': 6.966, 'N': 6.749, 'S': 6.327, 'H': 6.094, 'R': 5.987, 'D': 4.253, 'L': 4.025, 'C': 2.782, 'U': 2.758, 'M': 2.406, 'W': 2.36, 'F': 2.228, 'G': 2.015, 'Y': 1.974, 'P': 1.929, 'B': 1.492, 'V': 0.978, 'K': 0.772, 'J': 0.153, 'X': 0.15, 'Q': 0.095, 'Z': 0.074}
practical = {'E': 12.10, 'T': 8.94, 'A': 8.55, 'O': 7.47, 'I': 7.33, 'N': 7.17, 'S': 6.73, 'H': 4.96, 'R': 6.33, 'D': 3.87, 'L': 4.21, 'C': 3.16, 'U': 2.68, 'M': 2.53, 'W': 1.83, 'F': 2.18, 'G': 2.09, 'Y': 1.72, 'P': 2.07, 'B': 1.6, 'V': 1.06, 'K': 0.81, 'J': 0.22, 'X': 0.19, 'Q': 0.10, 'Z': 0.11}

def decode1(ciphertext, keylength, table):
    keylength = int(keylength)
    englishLetterFreq = {}

    #englishLetterFreq = {'E': 12.4167, 'T': 9.69225, 'A': 8.20011, 'O': 7.14095, 'I': 7.68052, 'N': 7.64055, 'S': 7.06768, 'H': 3.50386, 'R': 6.68132, 'D': 3.63709, 'L': 4.48308, 'C': 3.44391, 'U': 2.8777, 'M': 2.81775, 'W': 1.35225, 'F': 2.235145, 'G': 1.81188, 'Y': 1.89182, 'P': 2.03171, 'B': 1.06581, 'V': 1.24567, 'K': 0.393019, 'J': 0.19984, 'X': 0.219824, 'Q': 0.09325, 'Z': 0.0599}
    if table == "wiki":
        englishLetterFreq = wikipedia
    elif table == "cornell":
        englishLetterFreq = cornell
    elif table == "wellesley":
        englishLetterFreq = wellesley
    elif table == "practical":
        englishLetterFreq = practical


    sort = sorted(englishLetterFreq.items())
    expFreq = [0 for _ in range(26)]
    for i in range(26):
        expFreq[i] = sort[i][1] / 100
    #print(expFreq)


    # STEP 1 - Distribute letters into n = keylength amount of groups
    counter = 0
    groups = [[] for _ in range(keylength)]
    for c in ciphertext:
        if c.isalpha():
            mod = counter % keylength
            groups[mod].append(c)
            counter += 1
    #print()

    cipherkey = ""
    for group in groups:
        # STEP 2 - Count the number of occurrences of each letter for each group
        letterfreq = dict.fromkeys(string.ascii_lowercase, 0)
        for char in group:
            letterfreq[char.lower()] += 1
        #print(letterfreq)

        # STEP 3 - Frequency Analysis
        index = 0
        # STEP 3.1 Take each letter and map it to 'E' shifting by index
        groupFreq = list(letterfreq.values())
        for i in range(len(groupFreq)):
            groupFreq[i] = round(groupFreq[i] / len(group), 4)
        numpyFred = numpy.array(groupFreq)

        minchisqvalue = 10000
        currentindex = 0
        while True:
            # STEP 3.2 Use chisquare to compute chisq - value between actual and expected frequency
            shiftedGroupFreq = numpy.roll(numpyFred, -index)

            chisq, p = chisquare(shiftedGroupFreq, expFreq)
            #print("chisq: %f p: %f" % (chisq, p))
            if chisq < minchisqvalue:
                minchisqvalue = chisq
                #print("min index %d" % index)
                currentindex = index
            index += 1
            if index > 25:
                #print("end of group\n")
                break
            #most = sort[index][1]


        # STEP 4 - Find letter in cipherkey
        shift = currentindex
        cipherkey += chr(shift + 65)

        # STEP 4.1 - Use Caesar Cipher to shift all letters for each group by the Key
        for i in range(len(group)):
            c = ord(group[i]) - shift
            if (group[i].isupper() and c < 65) or (group[i].islower() and c < 97):
                c += 26
            group[i] = chr(c)
        #print(group)
        #print()

    # STEP 5 - Create a pre-plaintext by inserting each deciphered letter in order by groups
    preplaintext = ""
    for x in range(len(groups[0])):
        for y in range(keylength):
            try:
                preplaintext += groups[y][x].lower()
            except IndexError:
                preplaintext += ''
    #print(preplaintext)

    # STEP 6 - Create plaintext by matching values (upper/lower cases, punctuations) in the pre-plaintext and ciphertext
    plaintext = ""
    inc = 0
    for c in ciphertext:
        if c.isalpha():
            if c.isupper():
                char = ord(preplaintext[inc]) - 32
                plaintext += chr(char)
            else:
                plaintext += preplaintext[inc]
            inc += 1
        else:
            plaintext += c

    return cipherkey, plaintext

import string
from scipy.stats import chisquare
import numpy

def find_ic(group):
    totalletters = 0
    sum = 0
    for letterfreq in group:
        totalletters += letterfreq
        numerator = letterfreq * (letterfreq - 1)
        sum += numerator
    denominator = totalletters * (totalletters - 1)
    if denominator == 0:
        return sum
    return sum / denominator

def decode2(ciphertext, global_ic, table):
    print(global_ic)
    englishLetterFreq = {}
    if table == "wiki":
        englishLetterFreq = wikipedia
    elif table == "cornell":
        englishLetterFreq = cornell
    elif table == "wellesley":
        englishLetterFreq = wellesley
    elif table == "practical":
        englishLetterFreq = practical
    
    sort = sorted(englishLetterFreq.items())
    expFreq = [0 for _ in range(26)]
    for i in range(26):
        expFreq[i] = sort[i][1]
    
    results={}

    keylength = 1
    stop = False
    ic_set = {}
    # STEP 1 - Distribute letters into n = keylength amount of groups
    while stop == False:
        counter = 0
        groups = [[] for _ in range(keylength)]
        for c in ciphertext:
            if c.isalpha():
                mod = counter % keylength
                groups[mod].append(c)
                counter += 1
        #print()

        sum_ic = 0
        for group in groups:
            # STEP 2 - Count the number of occurrences of each letter for each group
            letterfreq = dict.fromkeys(string.ascii_lowercase, 0)
            for char in group:
                letterfreq[char.lower()] += 1
            letterfreqs = letterfreq.values()

            # STEP 3 - Find IC for each group
            ic = find_ic(letterfreqs)
            sum_ic += ic

        groups_ic = sum_ic / keylength
        ic_set[keylength] = groups_ic
        # STEP 4 - Assume current keylength if IC is great enough
        if groups_ic > global_ic:  # assume current key length
            #print(keylength, groups_ic)

            cipherkey = ""
            for group in groups:
                # STEP 5 - TASK 3
                letterfreq = dict.fromkeys(string.ascii_lowercase, 0)
                for char in group:
                    letterfreq[char.lower()] += 1

                groupFreq = list(letterfreq.values())
                for i in range(len(groupFreq)):
                    groupFreq[i] = round(groupFreq[i] / len(group), 4)
                numpyFred = numpy.array(groupFreq)

                # STEP 3 - Frequency Analysis
                index = 0
                # STEP 3.1 Take each letter and map it to 'E' shifting by index
                minchisqvalue = 10000
                currentindex = 0
                while True:
                    shiftedGroupFreq = numpy.roll(numpyFred, -index)

                    # STEP 3.2 Use chisquare to compute chisq - value between actual and expected frequency
                    chisq, p = chisquare(shiftedGroupFreq, expFreq)
                    # print("chisq: %f" % chisq)
                    if chisq < minchisqvalue:
                        minchisqvalue = chisq
                        currentindex = index
                    index += 1
                    if index > 25:
                        # print("end of group\n")
                        break
                    #most = sort[index][1]

                # STEP 4 - Find letter in cipherkey
                shift = currentindex
                cipherkey += chr(shift + 65)

                # STEP 4.1 - Use Caesar Cipher to shift all letters for each group by the Key
                for i in range(len(group)):
                    c = ord(group[i]) - shift
                    if (group[i].isupper() and c < 65) or (group[i].islower() and c < 97):
                        c += 26
                    group[i] = chr(c)
                #print(group)
                #print()

            # STEP 6 - Create a pre-plaintext by inserting each deciphered letter in order by groups
            preplaintext = ""
            for x in range(len(groups[0])):
                for y in range(keylength):
                    try:
                        preplaintext += groups[y][x].lower()
                    except IndexError:
                        preplaintext += ''
            #print(preplaintext)

            # STEP 7 - Create plaintext by matching values (upper/lower cases, punctuations) in the pre-plaintext and ciphertext
            plaintext = ""
            inc = 0
            for c in ciphertext:
                if c.isalpha():
                    if c.isupper():
                        plaintext += preplaintext[inc].upper()
                    else:
                        plaintext += preplaintext[inc]
                    inc += 1
                else:
                    plaintext += c
            
            # RETURN
            #print(cipherkey)
            if results:
                keys = list(results.values()) # CHECK if key is repeated

                for key in keys:
                    if key[0] in cipherkey:
                        break
                else:
                    results[keylength] = [cipherkey, plaintext]                    
                    if len(results) > 3:
                        stop = True
            else:
                results[keylength] = [cipherkey, plaintext]

        # Continue if IC is too low
        keylength += 1
        if keylength == 101:
            stop = True
    
    return(results)
