/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Provider } from 'react-redux';
import { configure, shallow } from 'enzyme';
import { expect } from '@jest/globals';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import CustomMetricsPage from '../../client/src/pages/CustomMetricsPage';
import CustomQuery from '../../client/src/components/Charts/CustomQuery';
import CustomCharts from '../../client/src/components/Charts/CustomCharts';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

const initialState = {
  metricsReducer: {
    fetchCustomQuery: [],
    allPromQL: [],
    customDataArray: [],
    hyrateCustom: [],
  },
};

const mockStore = configureMockStore([thunk]);
let store;

describe('CustomMetricsPage', () => {
  let wrapper;

  const props = {
    metricsReducer: {
      customDataArray: [],
    },
  };

  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = shallow(<CustomMetricsPage {...props} store={store} />)
      .children()
      .dive();
  });

  it('Contains one CustomQuery Component', () => {
    expect(wrapper.find(CustomQuery)).toHaveLength(1);
  });

  it('Contains one CustomCharts Component', () => {
    expect(wrapper.find(CustomCharts)).toHaveLength(1);
  });

  describe('CustomQuery', () => {
    let wrapper;

    const props = {
      metricsReducer: {
        fetchCustomQuery: [],
        allPromQL: [],
        customDataArray: [],
        hyrateCustom: [],
      },
    };

    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, 'useState');
    // useStateSpy.mockImplementation((state) => [state, setState]);

    beforeAll(() => {
      store = mockStore(initialState);
      wrapper = shallow(<CustomQuery {...props} store={store} />)
        .children()
        .dive();
    });

    // afterEach(() => {
    //   jest.clearAllMocks();
    // });

    it('Renders the Add New Chart button', () => {
      const button = wrapper.find('#addnewchart');
      expect(button).toHaveLength(1);
    });

    it('Clicking the Add New Chart button changes prop "in" from false to true and vice versa', () => {
      expect(wrapper.find('#collapse').prop('in')).toEqual(false);
      wrapper.find('#addnewchart').simulate('click');
      expect(wrapper.find('#collapse').prop('in')).toEqual(true);
      wrapper.find('#addnewchart').simulate('click');
      expect(wrapper.find('#collapse').prop('in')).toEqual(false);
    });

    describe('filling out form', () => {
      beforeAll(() => {
        wrapper.find('#addnewchart').simulate('click');
      });

      it("input query defaults to ''", () => {
        expect(wrapper.find('#autocomplete-query').prop('value')).toEqual('');
      });
    });
  });
});
