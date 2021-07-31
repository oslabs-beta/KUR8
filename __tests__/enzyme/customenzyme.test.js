import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.
import CustomMetricsPage from '../../client/src/pages/CustomMetricsPage'

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('CustomMetricsPage', () => {
    let wrapper;
    const props = {
      customDataArray: [],
    };

    beforeAll(() => {
      wrapper = shallow(<CustomMetricsPage {...props} />);
    });

    it('Renders a <Grid> tag', () => {
      wrapper.debug()
      expect(wrapper.type()).toEqual('Grid');
    });
  });
});