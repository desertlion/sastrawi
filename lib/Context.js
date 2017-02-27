export default class Context {
  constructor ( originalWord, Dictionary, VisitorProvider ) {
    this.originalWord = originalWord
    this.currentWord = this.originalWord
    this.dictionary = Dictionary
    this.visitorProvider = VisitorProvider
    this.removals = []

    this.initVisitors()
  }

  initVisitors() {
    this.visitors = this.visitorProvider.getVisitors()
    this.suffixVisitors = this.visitorProvider.getSuffixVisitors()
    this.prefixVisitors = this.visitorProvider.getPrefixVisitors()
  }

  setDictionary(Dictionary) {
    this.dictionary = Dictionary
  }

  getDictionary() {
    return this.dictionary
  }

  getOriginalWord() {
    return this.originalWord
  }

  setCurrentWord(word) {
    this.currentWord = word
  }

  getCurrentWord(word) {
    return this.currentWord
  }

  stopProcess() {
    this.processIsStopped = true
  }

  processIsStopped() {
    return this.processIsStopped
  }

  addRemoval ( removal ) {
    this.removals.push(removal)
  }

  getRemovals() {
    return this.removals
  }

  getResult() {
    return this.result
  }
}