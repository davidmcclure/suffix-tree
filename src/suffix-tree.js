

import _ from 'lodash';


export default class {


  /**
   * Initialize the tree.
   *
   * @param {Array<String>} seq - A sequence of tokens.
   */
  constructor(seq) {
    this.seq = seq;
    this._indexOffsets();
  }


  /**
   * Map token -> [offsets].
   */
  _indexOffsets() {

    this.offsets = {};

    _.each(this.seq, (token, i) => {

      // Initialize the offset array, if it doesn't exist.
      if (!_.has(this.offsets, token)) {
        this.offsets[token] = [i];
      }

      // Otherwise, register the new offset.
      else {
        this.offsets[token].push(i);
      }

    });

  }


  /**
   * Query a suffix tree.
   *
   * @param {String} root - The root token.
   * @param {Number} depth - The depth of the suffix tree.
   * @param {Number} maxChildren - The max number of children.
   */
  query(root, depth=10, maxChildren=null) {

    let suffixes = _.map(this.offsets[root], i => {
      return this.seq.slice(i+1, i+1+depth);
    });

    let tree = {
      name: root,
      count: 1,
    };

    _.each(suffixes, suffix => {
      _.reduce(suffix, function(parent, token) {

        let leaf;

        // If no children, create the array.
        if (!parent.children) {
          leaf = { name: token, count: 1 };
          parent.children = [leaf];
        }

        else {

          // Probe for an existing entry.
          let existing = _.find(parent.children, function(child) {
            return child.name == token;
          });

          // If one is found, bump the count.
          if (existing) {
            existing.count++;
            leaf = existing;
          }

          // Otherwise, push the new child.
          else {
            leaf = { name: token, count: 1 };
            parent.children.push(leaf);
          }

        }

        return leaf;

      }, tree)
    });

    (function sort(subtree) {

      if (subtree.children) {

        // Sort on count DESC, name ASC.
        subtree.children = _.sortByOrder(
          subtree.children,
          ['count', 'name'],
          ['desc', 'asc'],
        )

        if (maxChildren) {
          subtree.children = subtree.children.slice(0, maxChildren)
        }

      }

      // Recurse to children.
      _.each(subtree.children, sort);

    })(tree);

    return tree;

  }


}
