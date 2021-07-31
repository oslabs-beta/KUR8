/**
 * @jest-environment jsdom
 */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.
import CustomMetricsPage from '../../client/src/pages/CustomMetricsPage'
import Grid from '@material-ui/core/Grid';
// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

const initialState = {
  metricsReducer: {
    customDataArray: [],
  },
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

describe('React unit tests', () => {
  describe('CustomMetricsPage', () => {
    let wrapper;

    const props = {
      metricsReducer: {
        customDataArray: [],
      },
    };

    beforeAll(() => {
      wrapper = shallow(<CustomMetricsPage store={store} />).dive();
    });

    it('Renders a <Grid> tag', () => {
      wrapper.debug()
      expect(wrapper.type()).toEqual(<Grid />);
    });
  });
});