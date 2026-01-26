import '@testing-library/jest-dom';
import { act } from 'react';
import { screen, render, fireEvent, waitFor } from '../utils/testUtils';
import { HugoUIModal } from './Modal';
import { HugoUIModalContentText } from './ModalContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { isPhone } from '../utils/platformUtils';

jest.mock('@mui/material/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../utils/platformUtils', () => ({
  isPhone: jest.fn(),
}));

beforeEach(() => {
  (useMediaQuery as jest.Mock).mockReturnValue(false);
  (isPhone as jest.Mock).mockReturnValue(false);
});

describe('render HugoUIModal', () => {
  it('correctly render default modal - transactional', () => {
    render(<HugoUIModal open={true}>This is test content</HugoUIModal>);
    const root = document.querySelector('.HugoUIModal-transactional');
    expect(root).toBeTruthy();
  });

  it('correctly render content', () => {
    render(
      <HugoUIModal open={true}>
        <HugoUIModalContentText>This is test content</HugoUIModalContentText>
      </HugoUIModal>
    );
    expect(screen.getByText('This is test content')).toBeInTheDocument();
  });

  it('correctly show title', () => {
    const { rerender } = render(
      <HugoUIModal open={true} title="test title">
        This is test content
      </HugoUIModal>
    );
    expect(screen.getByText('test title')).toBeInTheDocument();

    rerender(<HugoUIModal open={true}>This is test content</HugoUIModal>);
    expect(screen.queryByText('test title')).toBe(null);
  });

  it('correctly show subtitle', () => {
    const { rerender } = render(
      <HugoUIModal open={true} title="test title" subTitle="test subtitle">
        This is test content
      </HugoUIModal>
    );
    expect(screen.getByText('test subtitle')).toBeInTheDocument();

    rerender(<HugoUIModal open={true}>This is test content</HugoUIModal>);
    expect(screen.queryByText('test subtitle')).toBe(null);
  });

  it('should show closeButton in title if user passes the prop, otherwise only error and information will show closeButton', () => {
    const { rerender } = render(
      <HugoUIModal open={true} title="title" closeButton type="transactional">
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalTitle-close')).toBeTruthy();

    rerender(
      <HugoUIModal open={true} title="title" closeButton={false} type="error">
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalTitle-close')).toBeTruthy();

    rerender(
      <HugoUIModal open={true} title="title" closeButton={false} type="transactional">
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalTitle-close')).toBeFalsy();
  });

  it('should show icon in title if the type is error, warning and destructure', () => {
    const { rerender } = render(
      <HugoUIModal open={true} title="title" type="error">
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalTitle-icon')).toBeTruthy();

    rerender(
      <HugoUIModal open={true} title="title" type="warning">
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalTitle-icon')).toBeTruthy();

    rerender(
      <HugoUIModal open={true} title="title" type="destructive">
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalTitle-icon')).toBeTruthy();

    rerender(
      <HugoUIModal open={true} title="title">
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalTitle-icon')).toBeFalsy();
  });

  it('should show Feedback component and children if type is equal feedback and children exists', () => {
    render(
      <HugoUIModal
        open={true}
        type="feedback"
        messages={[{ type: 'success', message: 'success message' }]}
      >
        This is test content
      </HugoUIModal>
    );
    expect(screen.getByText('success message')).toBeInTheDocument();
    expect(screen.queryByText('This is test content')).toBeInTheDocument();
  });

  it('should show customized footer and header if user passes the footerComponent and headerComponent', () => {
    render(
      <HugoUIModal
        open={true}
        headerComponent={<div>the customized header</div>}
        footerComponent={<div>the customized footer</div>}
      >
        This is test content
      </HugoUIModal>
    );
    expect(screen.getByText('the customized header')).toBeInTheDocument();
    expect(screen.getByText('the customized footer')).toBeInTheDocument();
  });

  it('should hide the certain button if hidden is true', () => {
    const { rerender } = render(
      <HugoUIModal
        open={true}
        loading={true}
        type="destructive"
        buttonDefs={{
          tertiary: {
            label: 'test link button',
          },
        }}
      >
        This is test content
      </HugoUIModal>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    rerender(
      <HugoUIModal
        open={true}
        loading={true}
        type="destructive"
        buttonDefs={{
          secondary: {
            level: 'secondary',
            hidden: true,
          },
          tertiary: {
            label: 'test link button',
          },
        }}
      >
        This is test content
      </HugoUIModal>
    );
    expect(screen.queryByText('Cancel')).toBeFalsy();
  });

  it('should renter tertiary button as custom component', () => {
    render(
      <HugoUIModal
        open={true}
        loading={true}
        type="destructive"
        buttonDefs={{
          tertiary: {
            renderCustomComponent: () => <b>custom-component</b>,
          },
        }}
      >
        This is test content
      </HugoUIModal>
    );
    expect(screen.getByText('custom-component')).toBeInTheDocument();
  });

  it('should show loading and disable buttons if loading is true', () => {
    render(
      <HugoUIModal
        open={true}
        loading={true}
        buttonDefs={{
          tertiary: {
            label: 'test link button',
          },
        }}
      >
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModal-loading')).toBeTruthy();
    expect(
      document
        .querySelector('.HugoUIButton-primaryLevel')
        ?.classList.contains('HugoUIButton-loading-center')
    ).toBeTruthy();
    expect(
      document.querySelector('.HugoUIButton-secondaryLevel')?.classList.contains('Mui-disabled')
    ).toBeTruthy();
    expect(
      document.querySelector('.HugoUILink')?.classList.contains('HugoUILink-disabled')
    ).toBeTruthy();
  });

  it('should distant 80 to the top if the Modal has scroll bar', () => {
    render(
      <HugoUIModal open={true} title="title">
        {Array.from({ length: 60 }, (v, k) => (
          <HugoUIModalContentText key={k}>
            This will update the panel to the newest software version
          </HugoUIModalContentText>
        ))}
      </HugoUIModal>
    );
    expect(screen.getByRole('dialog')).toHaveStyle('max-height: calc(100% - 104px);');
  });
});

describe('render Modal', () => {
  it('should show success message if only pass success', () => {
    render(
      <HugoUIModal
        open={true}
        type="feedback"
        title="title"
        messages={[{ type: 'success', message: 'success message' }]}
      />
    );
    expect(screen.getByText('success message')).toBeInTheDocument();
  });

  it('should show error message if only pass error', () => {
    render(
      <HugoUIModal
        open={true}
        type="feedback"
        title="title"
        messages={[{ type: 'error', message: 'failed message' }]}
      />
    );
    expect(screen.getByText('failed message')).toBeInTheDocument();
  });

  it('should show error message if pass the mixed messages', () => {
    render(
      <HugoUIModal
        open={true}
        type="feedback"
        title="title"
        messages={[
          { type: 'success', message: 'success message' },
          { type: 'error', message: 'failed message' },
        ]}
      />
    );
    expect(screen.getByText('success message')).toBeInTheDocument();
    expect(screen.getByText('failed message')).toBeInTheDocument();
  });
});

describe('test keyboard trigger Modal events', () => {
  it('Press ESC should close Modal', () => {
    const onCloseEvent = jest.fn();
    render(
      <HugoUIModal open={true} onClose={onCloseEvent}>
        This is test content
      </HugoUIModal>
    );
    const dialogContainer = document.querySelector('.MuiDialog-container');
    expect(dialogContainer).toBeTruthy();
    fireEvent.keyUp(dialogContainer as Element, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });
    expect(onCloseEvent).toHaveBeenCalled();
  });
});

describe('test expected aria labels and props', () => {
  it('type error, warning and destructure should have role and aria label', () => {
    const { rerender } = render(
      <HugoUIModal open={true} title="title" type="error">
        This is test content
      </HugoUIModal>
    );
    const errorIcon = document.querySelector('.HugoUIModalTitle-icon');
    expect(errorIcon).toBeTruthy();
    expect(errorIcon?.getAttribute('role')).toBe('img');
    expect(errorIcon?.getAttribute('aria-label')).toBe('alert');

    rerender(
      <HugoUIModal open={true} title="title" type="warning">
        This is test content
      </HugoUIModal>
    );
    const warningIcon = document.querySelector('.HugoUIModalTitle-icon');
    expect(warningIcon).toBeTruthy();
    expect(warningIcon?.getAttribute('role')).toBe('img');
    expect(warningIcon?.getAttribute('aria-label')).toBe('warning');

    rerender(
      <HugoUIModal open={true} title="title" type="destructive">
        This is test content
      </HugoUIModal>
    );
    const destructiveIcon = document.querySelector('.HugoUIModalTitle-icon');
    expect(destructiveIcon).toBeTruthy();
    expect(destructiveIcon?.getAttribute('role')).toBe('img');
    expect(destructiveIcon?.getAttribute('aria-label')).toBe('alert');
  });
});

describe('loading indicator', () => {
  it('announces loading after delay', async () => {
    jest.useFakeTimers();
    render(
      <HugoUIModal open={true} loading={true} showLoadingIndicator>
        This is test content
      </HugoUIModal>
    );
    expect(document.querySelector('.HugoUIModalContent-loadingIndicator')).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    await waitFor(() => {
      expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent('Loading');
    });
    jest.useRealTimers();
  });
});

describe('loading constraints', () => {
  it('prioritizes secondary loading when indicator hidden', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);
    (isPhone as jest.Mock).mockReturnValue(false);
    render(
      <HugoUIModal
        open={true}
        loading={true}
        showLoadingIndicator={false}
        buttonDefs={{ secondary: { level: 'secondary', loading: true } }}
      >
        This is test content
      </HugoUIModal>
    );
    expect(
      document
        .querySelector('.HugoUIButton-secondaryLevel')
        ?.classList.contains('HugoUIButton-loading-center')
    ).toBeTruthy();
    expect(
      document.querySelector('.HugoUIButton-primaryLevel')?.classList.contains('Mui-disabled')
    ).toBeTruthy();
  });
});
