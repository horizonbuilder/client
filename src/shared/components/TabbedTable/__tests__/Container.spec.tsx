import * as React from 'react';
import { Container } from '../Container';
import { shallow } from 'enzyme';

describe('<Container /> (TabbedTable)', () => {
  test('It renders its children', () => {
    const wrapper = shallow(
      <Container>
        <div id="test-div" />
      </Container>
    );

    expect(wrapper.find('#test-div')).toHaveLength(1);
  });

  describe('#onTabSelect', () => {
    test('Sets state with provided index and isLastTab', () => {
      const wrapper = shallow(
        <Container>
          <div id="test-div" />
        </Container>
      );

      wrapper.instance().onTabSelect(1, true);

      expect(wrapper.state('activeTabIndex')).toBe(1);
      expect(wrapper.state('lastTabActive')).toBeTruthy();
    });
  });
});
