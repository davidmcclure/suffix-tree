

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

      expect(tree.query('A')).to.equal({
        name: 'A',
        size: 1,
        children: [
          {
            name: '1',
            size: 1,
            children: [
              {
                name: '2',
                size: 1
              }
            ]
          },
          {
            name: '3',
            size: 1,
            children: [
              {
                name: '4',
                size: 1
              }
            ]
          },
          {
            name: '5',
            size: 1,
            children: [
              {
                name: '6',
                size: 1
              }
            ]
          },
        ]
      });

    });

  });

});
