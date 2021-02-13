import React from 'react';
import { shallow } from 'enzyme';
import DiffTable from './DiffTable';

describe('<DiffTable />', () => {
  let wrapper;
  let data;

  beforeEach(() => {
    wrapper = shallow(<DiffTable data={data} />);
  });

  describe('render()', () => {
    it('renders the Diff table', () => {
      expect(wrapper.find({ 'data-testid': 'diff-table' })).toHaveLength(1);
    });
  });
});