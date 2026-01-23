/* © 2022 Promethean. All Rights Reserved.
 *
 * Unauthorized copying of this file or any part of this file
 * via any medium is strictly prohibited.
 */
import React from 'react';
import { render } from '../utils/testUtils';
import { HugoUILoading } from './Loading';
import { ROOT_PREFIX, generateNumberSizeCss } from './loadingStyles';

describe('render components', () => {
  it('test size: small', () => {
    render(<HugoUILoading size="small" />);
    expect(document.querySelector(`.${ROOT_PREFIX}-small`)).toBeTruthy();
  });

  it('test size: medium', () => {
    render(<HugoUILoading />);
    expect(document.querySelector(`.${ROOT_PREFIX}-medium`)).toBeTruthy();
  });

  it('test size', () => {
    render(<HugoUILoading size="large" />);
    expect(document.querySelector(`.${ROOT_PREFIX}-large`)).toBeTruthy();
  });

  it('test customized class', () => {
    render(<HugoUILoading size="large" className="test" />);
    expect(
      document.querySelector(`.${ROOT_PREFIX}-large`)?.classList.contains('test')
    ).toBeTruthy();
  });
});

describe('styles function', () => {
  it('pass the number size should return the object', () => {
    expect(generateNumberSizeCss(20)['&-20'].width).toEqual('20px');
    expect(generateNumberSizeCss(20)['&-20'].height).toEqual('20px');
  });

  it('pass the other size should return the empty object', () => {
    expect(generateNumberSizeCss('large')).toEqual({});
  });
});
