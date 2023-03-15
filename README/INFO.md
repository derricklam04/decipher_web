# What is the Vigenere Cipher?

The Vigenere Cipher is a method of encrypting alphabetic text (known as plain text) based on letter substitution and shifting. This form of cipher can be best depicted using the Vigenere Table.

![](https://github.com/derricklam04/decipher_web/blob/deploy/src/Info/table.png)

In addition to the plain text, this cipher also requires a secret key which should contain alphabetic text only. To begin encryption, the key is repeated with the goal of matching the number of letters in the plain text (excluding punctuation and spaces).

For example, if the plain text is “HELLO, ENCRYPTION WORLD!” and the key is “LOCK”, the key will be repeated to the following:
```    
HELLO  ENCRYPTION  WORLD
LOCKL  OCKLOCKLOC  KLOCK
```

For each letter pair in the plaintext and key, find its intersection in the Vigenere Table: 
```
HELLO, ENCRYPTION WORLD!
SSNVZ, SPMCMRDTCP GZFNN!
```

This intersection also represents the shift amount similar to that of a Caesar Cipher. The result of this will be the new encrypted plaintext (known as the cipher text).

# How can I break the Vigenere Cipher without knowing the key?

We can break this problem into two parts:

## Part 1 - How can we find the length of the key?

The Index Of Coincidence (IC) is a technique used in cryptography which measures the global distribution of letters in an encrypted message.

The IC could be found by this formula:

![](https://github.com/derricklam04/decipher_web/blob/deploy/src/Info/ic.png)

With ni being the number of occurrences of the letter i and N being the total number of letters (26).

It is known that the Index of Coincidence of English Text is 0.0667. Given this, we can try to brute force the key length by first assuming that it has a length of 1, then a length of 2, and so on.

At each key length assumption, separate the letters in the ciphertext into n = key length number of groups. This can be done by modulus division.

For example, if the ciphertext is ‘abcdefghijklmnop” and we are currently assuming the key length to be 3. The text with be divided into 3 groups as such:
```
“adgjmp”
“behkn”
“cfilo”
```

This step has to be done because we know that for each group formed, all of the letters in the group were ciphered by the same letter in the Vigenere Table. (More on this in Part 2 below)

Calculate the IC of each group and sum it together. Divide the sum by the current assumed key length to get the Final IC.

Finally, compare the Final IC to that of English Text which is 0.0667. If the current Final IC is at least 0.0615, we can assume its key length to correct and move on to the second part below.

(NOTE) This stage will rule out many incorrect assumptions to optimize the running time of the algorithm. Note that the number 0.0615 can be configured. A lower value will allow for more “correct” assumptions, while a higher value will rule out more “incorrect” assumptions. 

## Part 2 - How can we use the length assumed in Part 1 to find the key?

The English Frequency Table is the number of times a letter appears on average in Written English Text.

![](https://github.com/derricklam04/decipher_web/blob/deploy/src/Info/freq.png)

We can use Frequency Analysis to find the key letter that was used to cipher the letters in each group from Part 1.

At a high level, since this key letter represents the shift amount, we have to find the amount that each group of letters were shifted by.

For each group, create a frequency table for the number of occurrences of each letter
(number of occurrence of letter x / total number of letters in group) 
and sort this table alphabetically. 

The next step is to compare this frequency table to the sorted English Frequency Table. 
This can be done with Chi-square Statistic, which can measure the correlation between two frequency tables.

Because there are 26 letters in the alphabet, there are 26 possible shifts that we have to find Chi-square on.

In order to calculate Chi-square for other shifts, simply move all frequency values onto the next letter as such:     

![](https://github.com/derricklam04/decipher_web/blob/deploy/src/Info/shift.png)

(All frequency values shifted to the right by 1)

The smaller the value of chi-square, the more resemblance there are between the two tables. Therefore, the shift that results in the smallest chi-square value will be the correct shift amount.

This shift amount can be taken directly to find the key letter. For example, if the shift amount was 5, then the key letter is ‘E’ (the 5th letter in the alphabet). 

Repeat following for each group to find the whole key. 
Once the key is retrieved, decryption will be straightforward as it is the reverse of encryption.

# Where can I find sources and more?
Index of Coincidence:
- https://www.dcode.fr/index-coincidence

Chi-Square Statistic:
- https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html
- https://www.statisticshowto.com/probability-and-statistics/chi-square/           

Letter Frequency Tables:
- https://en.wikipedia.org/wiki/Letter_frequency
- http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html
- http://cs.wellesley.edu/~fturbak/codman/letterfreq.html
- http://practicalcryptography.com/cryptanalysis/letter-frequencies-various-languages/english-letter-frequencies/

