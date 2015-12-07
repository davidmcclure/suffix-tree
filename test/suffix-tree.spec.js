

import { expect } from 'chai';
import { repeat } from './utils';

import SuffixTree from '../src/suffix-tree';


describe('SuffixTree', function() {

  describe('#query', function() {

    it('generates a suffix tree from a root token', function() {

      let tree = new SuffixTree([
        'A', '1', '2',
        'A', '3', '4',
        'A', '5', '6',
      ]);

      let res = tree.query('A', 2);

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
      expect(res.children[0].children[0].children).to.undefined;

      expect(res.children[1].children[0].name).to.equal('4');
      expect(res.children[1].children[0].count).to.equal(1);
      expect(res.children[1].children[0].children).to.undefined;

      expect(res.children[2].children[0].name).to.equal('6');
      expect(res.children[2].children[0].count).to.equal(1);
      expect(res.children[2].children[0].children).to.undefined;

    });

    it('accumulates token counts at each level', function() {

      let tree = new SuffixTree([].concat(
        ['A', 'B'],
        repeat('X', 10),
        ['A', 'B', 'C'],
        repeat('X', 10),
        ['A', 'B', 'C', 'D'],
      ));

      let res = tree.query('A', 3);

      // 3x 'B'

      expect(res.children[0].name).to.equal('B');
      expect(res.children[0].count).to.equal(3);

      // 2x 'C'

      expect(res.children[0].children[0].name).to.equal('C');
      expect(res.children[0].children[0].count).to.equal(2);

      // 1x 'D'

      expect(res.children[0].children[0].children[0].name).to.equal('D');
      expect(res.children[0].children[0].children[0].count).to.equal(1);

    });

    it('sorts by count DESC, then name ASC', function() {

      let tree = new SuffixTree([

        'A', 'B',

        'A', 'C',
        'A', 'C',

        'A', 'D',
        'A', 'D',

        'A', 'E',
        'A', 'E',
        'A', 'E',

      ]);

      let res = tree.query('A', 1);

      expect(res.children[0].name).to.equal('E');
      expect(res.children[1].name).to.equal('C');
      expect(res.children[2].name).to.equal('D');
      expect(res.children[3].name).to.equal('B');

    });

    it('truncates children at maxChildren', function() {

      let tree = new SuffixTree([

        'A', 'B',

        'A', 'C',
        'A', 'C',

        'A', 'D',
        'A', 'D',
        'A', 'D',

      ]);

      let res = tree.query('A', 1, 2);

      expect(res.children[0].name).to.equal('D');
      expect(res.children[1].name).to.equal('C');
      expect(res.children).to.have.length(2);

    });

  });

});
