export default class Context {
  constructor ( originalWord, Dictionary, VisitorProvider ) {
    this.originalWord = originalWord
    this.currentWord = this.originalWord
    this.dictionary = Dictionary
    this.visitorProvider = VisitorProvider

    this.initVisitors()
  }
}