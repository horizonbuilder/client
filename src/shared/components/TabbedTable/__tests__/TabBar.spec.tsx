import * as React from 'react';
import { TabBar } from '../TabBar';
import { shallow } from 'enzyme';

interface TestComponentProps {
  tabIndex?: number;
  isLastTab?: boolean;
}

const TestComponent = (props: TestComponentProps) => null;

describe('<TabBar />', () => {
  test('Renders its children with injected tabIndex prop', () => {
    const wrapper = shallow(
      <TabBar>
        <TestComponent />
        <TestComponent />
      </TabBar>
    );

    const testComponentChildren = wrapper.find(TestComponent);

    expect(testComponentChildren.first().prop('tabIndex')).toBe(0);

    expect(testComponentChildren.last().prop('tabIndex')).toBe(1);
  });

  test('Renders its children with injected isLastTab prop', () => {
    const wrapper = shallow(
      <TabBar>
        <TestComponent />
        <TestComponent />
      </TabBar>
    );

    const testComponentChildren = wrapper.find(TestComponent);

    expect(testComponentChildren.first().prop('isLastTab')).toBeFalsy();

    expect(testComponentChildren.last().prop('tabIndex')).toBeTruthy();
  });
});
