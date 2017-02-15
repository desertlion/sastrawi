export default class Stemmer {

  /**
   * Creates an instance of Stemmer.
   * 
   * @param {Dictionary} Dictionary - Dictionary to be used in this stemmer
   * @param {Tokenizer} Tokenizer - Tokenizer lib to be used
   * @memberOf Stemmer
   */
  constructor ( Dictionary ) {
    if ( !Dictionary ) throw new TypeError('Dictionary is required')
    let dictionary  = Dictionary
    let result      = []
  }

  /**
   * Check whether given character is a string
   * @param {any} char - var to be tested
   * @returns bool
   */
  isChar (char) {
    return typeof char === 'string'
  }

  /**
   * Change Dictionary to be used in stemmer
   * 
   * @param {Dictionary} Dictionary
   * 
   * @memberOf Stemmer
   */
  changeDictionary ( Dictionary ) {
    this.dictionary = Dictionary
  }

  /**
   * Stem a sentence string to its common stem form
   * 
   * @param {string} sentence - the text string to stem, e.g : memberdayakan pembangunan
   * @return string common stem form, e.g : daya bangun
   * 
   * @memberOf Stemmer
   */
  stem ( sentence ) {
    const self  = this;
    const words = self.tokenize( self.normalizeText(sentence) )
    let stems   = []
    for(let i=0; i<words.length; i++) {
      stems.push(this.stemWord(words[i]))
    }
    console.info(stems);
    return stems.join(" ")
  }

  /**
   * Stem a word to its common stem form
   * 
   * @param {string} word - the word to stem, e.g : memberdayakan
   * @return {string} stemmed word - common stem form, e.g : daya
   */
  stemWord ( word ) {
    return (this.isPlural(word)) ? 
      this.stemPluralWord(word) : 
      this.stemSingularWord
  }

  /**
   * Check plural
   * 
   * @param {string} word
   * @return boolean
   */
  isPlural ( word ) {
    // -ku|-mu|-nya
    // nikmat-Ku, etc
    const pattern = word.match(/^(.*)-(ku|mu|nya|lah|kah|tah|pun)$/)
    if ( pattern ) {
      return (pattern.indexOf('-') >= 0) !== false
    }
    return (word.indexOf('-') >= 0) !== false
  }

  /**
   * Steam a plural word to its common stem form.
   * Asian J. (2007) "Effective Techniques for Indonesian Text Retrieval" page 76-77.
   * 
   * @param {string} plural - the word to stem, e.g : bersama-sama
   * @return {string} common stem form, e.g : sama
   * @link http://researchbank.rmit.edu.au/eserv/rmit:6312/Asian.pdf
   */
  stemPluralword ( plural ) {
    const words = plural.match(/^(.*)-(.*)$/)

    if ( !words[1] || !words[2] ) return plural

    // malaikat-malaikat-nya -> malaikat malaikat-nya
    suffix = words[2]
    if ( suffix.indexOf(['ku', 'mu', 'nya', 'lah', 'kah', 'tah', 'pun']) >= 0 &&
      words[1].match(/^(.*)-(.*)$/) ) {
        words[2] += '-' + suffix
    }

    // berbalas-balasan -> balas
    let rootWord1 = this.stemSingularWord( words[1] )
    let rootWord2 = this.stemSingularWord( words[2] )

    // meniru-nirukan -> tiru
    if ( !this.dictionary.contains(words[2]) && rootWord2 == words[2] ) {
      rootWord2 = this.stemSingularWord('me' + words[2])
    }

    return (rootWord1 == rootWord2 ) ? rootWord1 : plural
  }

  /**
   * Stem a singular word to its common stem form
   * 
   * @param {string} word - the word to stem, e.g : mengalahkan
   * @return {string} common stem form, e.g : kalah
   */
  stemSingularWord ( word ) {
    const context = new Context(word, this.dictionary, this.visitorProvider)
    return context.execute().getResult()
  }
  
  /**
   * Split sentence into words
   * 
   * @param {string} sentence
   * @returns {array}
   */
  tokenize ( sentence ) {
    return sentence.split(" ")
  }

  /**
   * Removes symbols and Characters other than alphabetics
   * 
   * @param {string} sentence
   * @return {string} normalized text
   */
  normalizeText ( sentence ) {
    return sentence.toLowerCase()
      .replace(/[^a-z0-9 -]/img, ' ')
      .replace(/( +)/im, ' ')
  }
}
