import Home from './Home.js';
import React from 'react';
import {shallow} from 'enzyme';

describe('<Home />', function () {
  it('should be defined', () => {
    expect(Home).toBeDefined();
  });

  it('Home\'s title should be Home', function () {
    let home = shallow(<Home />);
    expect(home.find('h1').text()).toEqual('Home');
  });
});
