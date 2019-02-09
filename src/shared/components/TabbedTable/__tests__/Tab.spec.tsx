import * as React from 'react';
import { Tab } from '../Tab';
import { shallow } from 'enzyme';

describe('<Tab />', () => {
  test('calls its child function with isActive if function is child', () => {
    const childFunc = jest.fn();

    const wrapper = shallow(<Tab tabIndex={0}>{childFunc}</Tab>, {
      context: {
        activeTabIndex: 0,
        onTabSelect: () => {}
      }
    });

    expect(childFunc).toHaveBeenCalledWith(true);
  });

  test('renders children normally if not a function', () => {
    const wrapper = shallow(
      <Tab tabIndex={0}>
        <div id="test-div" />
      </Tab>,
      {
        context: {
          activeTabIndex: 0,
          onTabSelect: () => {}
        }
      }
    );

    expect(wrapper.find('#test-div')).toHaveLength(1);
  });

  test('calls provided onClick prop when clicked', () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <Tab tabIndex={0} onClick={onClick}>
        Test
      </Tab>,
      {
        context: {
          activeTabIndex: 0,
          onTabSelect: () => {}
        }
      }
    );

    wrapper.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  test('calls context.onTabSelect with tab index and last tab status when clicked', () => {
    const onTabSelect = jest.fn();

    const wrapper = shallow(
      <Tab tabIndex={0} isLastTab>
        Test
      </Tab>,
      {
        context: {
          activeTabIndex: 0,
          onTabSelect
        }
      }
    );

    wrapper.simulate('click');

    expect(onTabSelect).toHaveBeenCalledWith(0, true);
  });

  test('#isActive', () => {
    const wrapper = shallow(<Tab tabIndex={0}>Test</Tab>, {
      context: {
        activeTabIndex: 0,
        onTabSelect: () => {}
      }
    });

    expect(wrapper.instance().isActive()).toBeTruthy();
  });
});
