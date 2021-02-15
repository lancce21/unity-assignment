import React from 'react';
import { shallow } from 'enzyme';
import DiffTable from './DiffTable';

describe('<DiffTable />', () => {
  let wrapper;
 
  const legitData = [
    {
      id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
      timestamp: 0,
      diff:[{
        field: "name",
        newValue: "Oldest",
        oldValue: "Ever"
      }]
    },
    {
      id: "asdfdasdf-a2f2-48c2-9001-ff43884e271b",
      timestamp: 1581991200123,
      diff:[{
        field: "name",
        newValue: "Newest",
        oldValue: "Now"
      }]
    },
    {
      id: "qwer-twer-awse-wer1-ff43884e271b",
      timestamp: 1200123,
      diff:[{
        field: "name",
        newValue: "Second Oldest",
        oldValue: "Mini Pappa"
      }]
    },
    {
      id: "asdfdasdf-a2f2-48c2-9001-ff43884e271b",
      timestamp: 791200123,
      diff:[{
        field: "name",
        newValue: "Almost New",
        oldValue: "Baby"
      }]
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<DiffTable data={legitData} sortDesc={false} />);
  });

  describe('render()', () => {
    it('renders the Diff table', () => {
      expect(wrapper.find({ 'data-testid': 'diff-table' })).toHaveLength(1);
    });
  });

  describe('renderRows()', ()=>{
    it('renders the correct amount of rows when the data is legit', ()=>{
      const newValues = wrapper.find({ 'data-testid': 'diff-table-row' });
      expect(newValues).toHaveLength(4);
      
    });

    it('renders sorts the order according to the prop sortDesc (false) given above', ()=>{
      const items = wrapper.find({'data-testid':"new-value"});

      expect(items).toHaveLength(4);
      expect(items.first().text()).toBe("Oldest");
      expect(items.last().text()).toBe("Newest");
    });

    it('renders the order of the items in desc order', ()=>{
      wrapper = shallow(<DiffTable data={legitData} sortDesc={true} />);

      const items = wrapper.find({'data-testid':'new-value'});

      expect(items.first().text()).toBe("Newest");
      expect(items.last().text()).toBe("Oldest");
    });

  });
});