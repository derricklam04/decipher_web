import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap'
import table from '../Info/table.png'
import ic from '../Info/ic.png'
import freq from '../Info/freq.png'
import shift from '../Info/shift.png'


export const About = () => {
    return (
        <div className="about">
            <h6 style={{marginLeft: 10, color:"grey"}}>Common Questions: <i>(click for more)</i></h6>
            <Accordion defaultActiveKey="">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <h5><b>What is the Vigenere Cipher?</b></h5>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <p>The Vigenere Cipher is a method of encrypting alphabetic text <i>(known as plain text)</i> based on letter substitution and shifting. This form of cipher can be best depicted using the <b>Vigenere Table.</b></p>
                        <img src={table}/>
                        <p style={{textAlign:"center"}}><i>(Source: https://www.javatpoint.com/vigenere-cipher)</i></p>
                        <p>In addition to the plain text, this cipher also requires a secret key which should contain alphabetic text only. To begin encryption, the key is repeated with the goal of matching the number of letters in the plain text <i>(excluding punctuation and spaces)</i>. </p>
                        <p>For example, if the plain text is “HELLO, ENCRYPTION WORLD!” and the key is “LOCK”, the key will be repeated to the following:
                            <ul>
                                <li>HELLO  ENCRYPTION  WORLD</li>
                                <li>LOCKL  OCKLOCKLOC  KLOCK</li>
                            </ul>
                        </p>
                        <p>For each letter pair in the plaintext and key, find its intersection in the Vigenere Table: 
                            <ul>
                                <li>HELLO, ENCRYPTION WORLD!</li>
                                <li>SSNVZ, SPMCMRDTCP GZFNN!</li>
                            </ul>
                        </p>
                        <p>This intersection also represents the shift amount similar to that of a Caesar Cipher. The result of this will be the new encrypted plaintext <i>(known as the cipher text)</i>.</p>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    <h5><b>How can I break the Vigenere Cipher without knowing the key? </b></h5>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <h6>We can break this problem into two parts:</h6><p></p>
                        <h5>Part 1 - How can we find the length of the key?</h5>
                        <ul>
                            <p>The <b>Index Of Coincidence (IC)</b> is a technique used in cryptography which measures the global distribution of letters in an encrypted message. </p>
                            <p>The IC could be found by this formula:</p>
                            <img height={80} src={ic}/>
                            <p><i>With <b>ni</b> being the number of occurrences of the letter <b>i</b> and <b>N</b> being the total number of letters (26). </i></p>
                            <p>It is known that the <b>Index of Coincidence of English Text is 0.0667</b>. Given this, we can try to brute force the key length by first assuming that it has a length of 1, then a length of 2, and so on.</p>

                            <p>At each key length assumption, separate the letters in the ciphertext into <b>n = key length</b> number of groups. This can be done by modulus division. 
                            For example, if the ciphertext is ‘abcdefghijklmnop” and we are currently assuming the key length to be 3. The text with be divided into 3 groups as such: 
                                <ul>
                                    <li>“adgjmp”</li>
                                    <li>“behkn”</li>
                                    <li>“cfilo”</li>
                                </ul>
                                <p>This step has to be done because we know that for each group formed, all of the letters in the group were ciphered by the same letter in the Vigenere Table. <i>(More on this in Part 2 below)</i></p>
                            </p>
                            <p>Calculate the IC of each group and sum it together. Divide the sum by the current assumed key length to get the <b>Final IC</b>. </p>
                            <p>Finally, compare the Final IC to that of English Text which is 0.0667. <p>If the current Final IC is at least 0.0615, we can assume its key length to correct and move on to the second part below.</p> </p>
                            <p><i>(NOTE) This stage will rule out many incorrect assumptions to optimize the running time of the algorithm. Note that the number 0.0615 can be configured. A lower value will allow for more “correct” assumptions, while a higher value will rule out more “incorrect” assumptions. </i></p>
                        </ul>
                        <h5>Part 2 - How can we use the length assumed in Part 1 to find the key?</h5>
                        <ul>
                        <p>The English Frequency Table is the number of times a letter appears on average in Written English Text.</p>
                        <img height={400} src={freq}/>
                        <p style={{textAlign:"center"}}><i>(Source: https://en.wikipedia.org/wiki/Frequency_analysis)</i></p>

                        <p>We can use <b>Frequency Analysis</b> to find the key letter that was used to cipher the letters in each group from Part 1. 
                        <p>At a high level, since this key letter represents the shift amount, we have to find the amount that each group of letters were shifted by.</p></p>

                        <p>For each group, create a frequency table for the number of occurrences of each letter
                            <i>(number of occurrence of letter x / total number of letters in group) </i>
                            and sort this table alphabetically. </p>
                        <ul>
                            <p>The next step is to compare this frequency table to the sorted English Frequency Table. 
                                <p>This can be done with <b>Chi-square Statistic</b>, which can measure the correlation between two frequency tables.</p>
                            </p>
                            <p>Because there are 26 letters in the alphabet, there are 26 possible shifts that we have to find Chi-square on. 
                                <p>In order to calculate Chi-square for other shifts, simply move all frequency values onto the next letter as such:</p>     
                            </p>
                            <img height={400} src={shift}/>
                            <p style={{textAlign:"center"}}><i>(All frequency values shifted to the right by 1)</i></p>
                            <p>The smaller the value of chi-square, the more resemblance there are between the two tables. Therefore, the shift that results in the smallest chi-square value will be the correct shift amount. 
                                <p>This shift amount can be taken directly to find the key letter. For example, if the shift amount was 5, then the key letter is ‘E’ <i>(the 5th letter in the alphabet)</i>. </p>
                            </p>
                        </ul>
                        <p>Repeat following for each group to find the whole key. 
                            <p>Once the key is retrieved, decryption will be straightforward as it is the reverse of encryption.</p>
                        </p>
                        </ul>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                    <h5><b>Where can I find sources and more?</b></h5>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                    <p><b>Index of Coincidence:</b>
                    <ul>
                        <li>https://www.dcode.fr/index-coincidence</li>
                    </ul>
                    </p>
                    <p><b>Chi-Square Statistic:</b>
                    <ul>
                        <li>https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chisquare.html</li>
                        <li>https://www.statisticshowto.com/probability-and-statistics/chi-square/</li>           
                    </ul>
                    </p>
                    <p><b>Letter Frequency Tables:</b>
                    <ul>
                        <li>https://en.wikipedia.org/wiki/Letter_frequency</li>
                        <li>http://pi.math.cornell.edu/~mec/2003-2004/cryptography/subs/frequencies.html</li>
                        <li>http://cs.wellesley.edu/~fturbak/codman/letterfreq.html</li>
                        <li>http://practicalcryptography.com/cryptanalysis/letter-frequencies-various-languages/english-letter-frequencies/</li>
                    </ul>
                    </p>
                    
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}