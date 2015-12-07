

import { expect } from 'chai';
import SuffixTree from '../src/suffix-tree';


describe('SuffixTree', function() {

  describe('#query', function() {

    it('generates a suffix tree from a root token', function() {

      let tree = new SuffixTree([
        'A', '1', '2',
        'A', '3', '4',
        'A', '5', '6',
      ]);

      let res = tree.query('A');

      // Root

      expect(res.name).to.equal('A');
      expect(res.count).to.equal(1);

      // Level 1

      expect(res.children[0].name).to.equal('1');
      expect(res.children[0].count).to.equal(1);

      expect(res.children[1].name).to.equal('3');
      expect(res.children[1].count).to.equal(1);

      expect(res.children[2].name).to.equal('5');
      expect(res.children[2].count).to.equal(1);

      // Level 2

      expect(res.children[0].children[0].name).to.equal('2');
      expect(res.children[0].children[0].count).to.equal(1);

      expect(res.children[1].children[0].name).to.equal('4');
      expect(res.children[1].children[0].count).to.equal(1);

      expect(res.children[2].children[0].name).to.equal('6');
      expect(res.children[2].children[0].count).to.equal(1);

    });

  });

});
