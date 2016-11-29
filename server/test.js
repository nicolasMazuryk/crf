/**
 * Created by supervlad on 11/29/16.
 */

var expect = require('chai').expect

describe('Array', function() {

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect(-1).to.equal([1,2,3].indexOf(4))
    })
  })

})