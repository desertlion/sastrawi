import Stemmer from './Stemmer'
import ArrayDictionary from './ArrayDictionary'

export default class StemmerFactory {
  createStemmer ( isDev = false ) {
    const stemmer = new Stemmer(this.createDefaultDictionary(isDev))
    return stemmer
  }
  createDefaultDictionary (isDev = false) {
    const words = this.getWords(isDev)
    return new ArrayDictionary(words)
  }
  getWords() {
    const fs = require('fs')
    const dictionaryFile = './data/kata-dasar.txt'
    return fs.readFile(dictionaryFile, (function(err, data) {
      if (err) throw err;
      console.log(data);
      return data.split('\n')
    }))
  }
}