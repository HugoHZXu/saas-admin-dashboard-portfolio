import '@testing-library/jest-dom';
import { render, fireEvent } from '../utils/testUtils';
import { HugoUIModalFooter } from './ModalFooter';

const setup = (onClick: jest.Mock) => {
  render(
    <HugoUIModalFooter
      actionProps={{
        tertiary: {
          label: 'Tertiary',
          onClick,
        },
      }}
    />
  );
};

describe('HugoUIModalFooter', () => {
  it('calls tertiary onClick on Enter', () => {
    const onClick = jest.fn();
    setup(onClick);
    const link = document.querySelector('.HugoUILink');
    expect(link).toBeTruthy();
    fireEvent.keyUp(link as Element, { key: 'Enter' });
    expect(onClick).toHaveBeenCalled();
  });

  it('calls tertiary onClick on Space', () => {
    const onClick = jest.fn();
    setup(onClick);
    const link = document.querySelector('.HugoUILink');
    expect(link).toBeTruthy();
    fireEvent.keyUp(link as Element, { key: ' ' });
    expect(onClick).toHaveBeenCalled();
  });
});
