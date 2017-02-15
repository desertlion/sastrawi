/**
 * Dictionary with type of array, each dictionary should have contains method
 * Javascript still don't have interfaces yet
 * 
 * @class ArrayDictionary
 */
export default class ArrayDictionary {
  constructor( words = [] ) {
    this.words = words
    this.addWords(words)
  }
  contains(word) {
    return this.words[word]
  }
  count() {
    return this.words.length
  }
  addWords (words) {
    words.forEach( (word) => {
      this.add(word)
    })
  }
  add (word) {
    if ( !word.length ) return
    this.words[word] = word
  }
  remove (word) {
    this.words[word] = undefined
  }
  addWordsFromTextFile(filePath, $delimeter = "\n") {
    // this one only works inside nodejs
    const fs = require('fs')
    this.addWords(fs.readFile(filePath, (function(err, data) {
      if (err) throw err;
      return data.split(delimeter)
    })))
  }
}