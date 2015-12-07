

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


}
