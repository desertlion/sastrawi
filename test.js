import Sastrawi from './index'
import chai from 'chai'
const expect = chai.expect

let Stemmer = new Sastrawi.StemmerFactory
Stemmer = Stemmer.createStemmer()

describe('Sastrawi.Stemmer', function () {
  describe('Constructor', function () {
    it('should return error when not initiated properly', function () {
      expect( () => new Sastrawi.Stemmer() ).to.throw('Dictionary is required')
    })
  })
  describe('isChar', () => {
    it('should return true if param is a string', () => {
      expect( Stemmer.isChar('aaaa') ).to.be.true
      expect( Stemmer.isChar(123) ).to.be.false
    })
  })
  describe('normalizeText', () => {
    it('should remove symbols and characters other than alphabetics', () => {
      expect( Stemmer.normalizeText('hallo @desertlion') ).to.equal('hallo desertlion')
    })
  })
  describe('stem', () => {
    it('should stem a sentence string to its common stem form', () => {
      expect( Stemmer.stem('memberdayakan pembangunan') ).to.equal('daya bangun')
    })
  })
  describe('stemWord', () => {
    it('should stem a single word to its common stem form', () => {
      expect( Stemmer.stemWord('memberdayakan') ).to.equal('daya')
    })
  })
  describe('isPlural', () => {
    it('should check whether word is plural or not', () => {
      expect( Stemmer.isPlural('bersama-sama') ).to.be.true
    })
  })
  describe('tokenize', () => {
    it('should split sentence into words based on space character', () => {
      expect( Stemmer.tokenize('memberdayakan pembangunan') ).to.have.members(['memberdayakan', 'pembangunan'])
    })
  })
})