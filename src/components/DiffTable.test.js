import React from 'react';
import { shallow } from 'enzyme';
import DiffTable from './DiffTable';

describe('<DiffTable />', () => {
  let wrapper, wrapper2, wrapper3;
  let data = [];
  const legitData = [
    {
      id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
      timestamp: 1581631200000,
      diff:[{
        field: "name",
        newValue: "Bruce",
        oldValue: "John"
      }]
    },
    {
      id: "asdfdasdf-a2f2-48c2-9001-ff43884e271b",
      timestamp: 1581631200123,
      diff:[{
        field: "name",
        newValue: "Dave",
        oldValue: "Davidson"
      }]
    }
  ];
  const illegitimateData = [
    {
      iddqd: "idkfa",
      timeToKill: 0,
      doomed: true
    }
  ]


  

  beforeEach(() => {
    wrapper = shallow(<DiffTable data={data} />);
    wrapper2 = shallow(<DiffTable data={legitData} />);
    wrapper3 = shallow(<DiffTable data={illegitimateData} />);
  });

  describe('render()', () => {
    it('renders the Diff table', () => {
      expect(wrapper.find({ 'data-testid': 'diff-table' })).toHaveLength(1);
    });

    it('still renders the table with broken data', () =>{
      expect(wrapper3.find({ 'data-testid':'diff-table' })).toHaveLength(1);
    });
  });

  describe('renderRows()', ()=>{
    it('does not render any rows when data is empty', ()=>{
      expect(wrapper.find({ 'data-testid': 'diff-table-row' })).toHaveLength(0);
    });

    it('renders two rows with two legit data items', () =>{
      expect(wrapper2.find({ 'data-testid':'diff-table-row' })).toHaveLength(2);
    });

    it('does not render any rows when data is corrupt', ()=>{
      expect(wrapper3.find({ 'data-testid': 'diff-table-row' })).toHaveLength(0);
    });

  });
});