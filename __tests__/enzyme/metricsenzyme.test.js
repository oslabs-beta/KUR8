/**
 * @jest-environment jsdom
 */

import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from '@jest/globals';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MetricsPage from '../../client/src/pages/MetricsPage';
import HistogramChart from '../../client/src/components/Charts/HistogramChart';
import CPUGauge from '../../client/src/components/Charts/CPUGauge';
import QueryRangeChart from '../../client/src/components/Charts/QueryRangeChart';
import QueryCpuRangeChart from '../../client/src/components/Charts/QueryCpuRangeChart';
import TotalHTTPRequest from '../../client/src/components/Charts/TotalHTTPRequest';
import CPUContainer from '../../client/src/components/Charts/CPUContainer';
import PodByNamespace from '../../client/src/components/Charts/PodByNamespace';
import MemoryNode from '../../client/src/components/Charts/MemoryNode';

configure({ adapter: new Adapter() });

const initialState = {
  metricsReducer: {
    cpuGauge: [],
  },
};

const mockStore = configureMockStore([thunk]);
let store;

describe('MetricsPage', () => {
  let wrapper;

  const props = {
    metricsReducer: {
      cpuGauge: [],
    },
  };

  beforeAll(() => {
    store = mockStore(initialState);
    wrapper = shallow(<MetricsPage {...props} store={store} />)
      .children()
      .dive();
  });

  it('Contains one QueryCpuRangeChart Component', () => {
    expect(wrapper.find(QueryCpuRangeChart)).toHaveLength(1);
  });

  it('Contains one QueryRangeChart Component', () => {
    expect(wrapper.find(QueryRangeChart)).toHaveLength(1);
  });

  it('Contains one HistogramChart Component', () => {
    expect(wrapper.find(HistogramChart)).toHaveLength(1);
  });

  it('Contains one PodByNamespace Component', () => {
    expect(wrapper.find(PodByNamespace)).toHaveLength(1);
  });

  it('Contains one CPUGauge Component', () => {
    expect(wrapper.find(CPUGauge)).toHaveLength(1);
  });

  it('Contains one TotalHTTPRequest Component', () => {
    expect(wrapper.find(TotalHTTPRequest)).toHaveLength(1);
  });

  it('Contains one CPUContainer Component', () => {
    expect(wrapper.find(CPUContainer)).toHaveLength(1);
  });

  it('Contains one MemoryNode Component', () => {
    expect(wrapper.find(MemoryNode)).toHaveLength(1);
  });
});
