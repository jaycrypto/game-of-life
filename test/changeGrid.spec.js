'use strict';

import deepFreeze from 'deep-freeze';
import expect from 'expect';
import changeGridReducer from '../reducers/changeGridReducer';

describe('changeGridReducer', () => {
  describe('NEXT_GEN', () => {
    it('if passed "undefined" should return []', () => {
      const action = { type: 'NEXT_GEN' }
      expect(
        changeGridReducer(undefined, action)
      ).toEqual([]);
    });

    it('should return right next generation', () => {
      const gridBefore = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [true, true, true, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
      ];
      const action = { type: 'NEXT_GEN'}
      const gridAfter = [
        [false, false, false, false, false],
        [false, true, false, false, false],
        [false, true, false, false, false],
        [false, true, false, false, false],
        [false, false, false, false, false]
      ];

      deepFreeze(gridBefore);
      deepFreeze(action);

      expect(
        changeGridReducer(gridBefore, action)
      ).toEqual(gridAfter);
    });

    it('returns state if type of action is not recognized', () => {
      const gridBefore = [
        [false, false],
        [false, false]
      ]
      deepFreeze(gridBefore);

      expect(
        changeGridReducer(gridBefore, {})
      ).toEqual(gridBefore);
    });
  });

  describe('CREATE', () => {
    it('returns new empty board according action.width and action.height', () => {
      const gridBefore = [];
      const action = {
        type: 'CREATE',
        width: 5,
        height: 4
      };
      const gridAfter = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
      ];
      deepFreeze(gridBefore);
      deepFreeze(action);

      expect(
        changeGridReducer([], action)
      ).toEqual(gridAfter);

    });
  });

  describe('TOGGLE_CELL', () => {
    it('returns new board with toggled cell', () => {
      const gridBefore = [
        [false, false],
        [false, false]
      ];
      const action = {
        type: 'TOGGLE_CELL',
        row: 0,
        col: 1
      };
      const gridAfter = [
        [false, true],
        [false, false]
      ];

      expect(
        changeGridReducer(gridBefore, action)
      ).toEqual(gridAfter);

    });
  });

  describe('RESET_GRID', () => {
    it('should return grid with all cells set to false', () => {
      const gridBefore = [
        [true, true],
        [true, true]
      ];
      const action = {
        type: 'RESET_GRID'
      };
      const gridAfter = [
        [false, false],
        [false, false]
      ];

      expect(
        changeGridReducer(gridBefore, action)
      ).toEqual(gridAfter);
    });
  });

  describe('RANDOM_GRID', () => {
    it('returns random grid', () => {
      const gridBefore = [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
      ];
      const action = {
        type: 'RANDOM_GRID',
        chance: 0.5
      };

      expect(
        changeGridReducer(gridBefore, action)
      ).toNotEqual(gridBefore);

      expect(
        changeGridReducer(gridBefore, action).length
      ).toBe(gridBefore.length);

      expect(
        changeGridReducer(gridBefore, action)[0].length
      ).toBe(gridBefore[0].length);
    });
  });
});
