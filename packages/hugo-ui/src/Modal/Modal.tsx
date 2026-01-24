import React, { useLayoutEffect, useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ThemeProvider } from '@mui/material/styles';
import Zoom, { ZoomProps } from '@mui/material/Zoom';
import classnames from 'classnames';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Paper, { PaperProps } from '@mui/material/Paper';
import DialogContent from '@mui/material/DialogContent';
import { visuallyHidden } from '@mui/utils';
import { HugoUILoading } from '../Loading/Loading';
import { HugoUIModalTitle } from './ModalTitle';
import {
  HugoUIModalFooter,
  HugoUIModalButtonsType,
  HugoUIModalPrimaryButtonProps,
  HugoUIModalSecondaryButtonProps,
} from './ModalFooter';
import { HugoUIFeedback, HugoUIFeedbackMessageType } from './Feedback';
import { HugoUIButtonSize } from '../Button';
import { HugoUIBaseProps } from '../types/base';
import { createDialogTheme, ROOT_PREFIX, CONTENT_ROOT_PREFIX } from './modalStyles';
import { isPhone } from '../utils/platformUtils';

export type HugoUIModalType =
  | 'transactional'
  | 'destructive'
  | 'warning'
  | 'informational'
  | 'error'
  | 'announcement'
  | 'feedback';

export interface HugoUIModalProps extends HugoUIBaseProps, Omit<DialogProps, 'title'> {
  /**
   * The type of the button
   */
  type?: HugoUIModalType;
  /**
   * The function to be called when the modal is closed
   * @returns
   */
  onClose?: () => void;
  /**
   * The button definitions for the modal
   * @property primary - The primary button
   * @property secondary - The secondary button
   * @property tertiary - The tertiary button
   */
  buttonDefs?: HugoUIModalButtonsType;
  /**
   * The content of the modal
   */
  children?: React.ReactNode;
  /**
   *
   */
  subTitle?: React.ReactNode;
  /**
   * Indicates whether the modal is open
   */
  closeButton?: boolean;
  /**
   * The footer component of the modal
   */
  footerComponent?: React.ReactNode;
  /**
   * The header component of the modal
   */
  headerComponent?: React.ReactNode;
  /**
   * Indicates whether the modal is loading
   */
  loading?: boolean;
  /**
   * show loading indicator on Modal
   */
  showLoadingIndicator?: boolean;
  /**
   * the position of Modal on page
   */
  offsetY?: number;
  /**
   * only for announcement
   */
  adColumn?: React.ReactNode;
  /**
   * only for feedback
   */
  messages?: HugoUIFeedbackMessageType[];
  /**
   * The title of the modal
   */
  title?: React.ReactNode;
  /**
   * for adjust the position and height on Mobile/Tablet
   */
  isTouchDeviceLandscapeView?: boolean;
  /**
   * allow user to customize their prefix icon of Modal header
   */
  headerPrefixIconName?: string;
  /**
   * allows user to disable the auto focus onto the bottom action buttons in the case there is another element to focus on first
   */
  disableAutoFocus?: boolean;
}

const TransitionZoom = React.forwardRef(function Transition(props: ZoomProps, ref) {
  return <Zoom in ref={ref} {...props} />;
});

interface CustomPaperProps extends PaperProps {
  fullScreen?: boolean;
  offsetY?: number;
  isTouchDeviceLandscapeView: boolean;
  type: HugoUIModalType;
}

const CustomPaperComponent = ({
  fullScreen,
  offsetY = 56,
  isTouchDeviceLandscapeView,
  type,
  ...props
}: CustomPaperProps) => {
  const PaperRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const root = PaperRef?.current;
    if (root) {
      root.setAttribute('aria-modal', 'true');
      root.setAttribute(
        'role',
        ['transactional', 'destructive', 'warning'].includes(type) ? 'alertdialog' : 'dialog'
      );
      if (fullScreen) {
        root.style.margin = '0';
        if (isTouchDeviceLandscapeView) {
          // on landscape view, the keyboard pop up shouldn't squezee the space, which will cause the Modal height too small
          root.style.maxHeight = `${window.innerHeight}px`;
        } else {
          root.style.maxHeight = '100%';
        }
      } else {
        const scrollArea = root.querySelector('.MuiDialogContent-root');
        const setScrollStyle = () => {
          if (scrollArea && scrollArea.scrollHeight > scrollArea.clientHeight) {
            root.style.margin = '0';
            root.style.marginTop = `${offsetY}px`;
          }
        };
        if (isTouchDeviceLandscapeView) {
          // on landscape view, the keyboard pop up shouldn't squezee the space, which will cause the Modal height too small
          root.style.maxHeight = `${window.innerHeight - Math.abs(offsetY) - 48}px`;
          setScrollStyle();
        } else {
          root.style.maxHeight = `calc(100% - ${Math.abs(offsetY)}px - 48px)`;
          setScrollStyle();
        }
      }
    }
  }, [fullScreen, isTouchDeviceLandscapeView]);
  return <Paper {...props} ref={PaperRef} />;
};

const HugoUIModalLoadingIndicator = ({ loading }: { loading?: boolean }) => {
  const intl = useIntl();

  const [readoutLoading, setReadoutLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      // use setTimeout to delay the readout, to avoid  that it doesn't read out when loading is displayed immediately after mounting the modal
      setTimeout(() => {
        setReadoutLoading(true);
      }, 200);
    } else {
      setReadoutLoading(false);
    }
  }, [loading]);

  return (
    <>
      {!!loading && (
        <HugoUILoading size="large" className={`${CONTENT_ROOT_PREFIX}-loadingIndicator`} />
      )}
      <div style={visuallyHidden} aria-live="polite">
        {readoutLoading
          ? intl.formatMessage({ id: 'hugoUI.button.loading', defaultMessage: 'Loading' })
          : ''}
      </div>
    </>
  );
};

export const HugoUIModal = ({
  title,
  type = 'transactional',
  className,
  onClose,
  buttonDefs,
  children,
  subTitle,
  open,
  closeButton,
  footerComponent,
  headerComponent,
  loading,
  showLoadingIndicator,
  adColumn,
  messages,
  offsetY = 56,
  // screenWidth > screenHeight can't fully judge it is landscape, because on portrait view, the keyboard pops up will cause screenWidth > screenHeight, so need pass the value from outer.
  //If on Mobile App, you can pass the real value through some native plugins, and on mobile browser, you can judge is the keyboard pops up through the form elements focus
  isTouchDeviceLandscapeView = false,
  headerPrefixIconName,
  disableAutoFocus,
  ...props
}: HugoUIModalProps) => {
  const intl = useIntl();

  // mobile landscape and portrait should be fullscreen
  const fullScreen = useMediaQuery('(max-width:686px)') || isPhone();

  const showCloseable = closeButton
    ? closeButton
    : type === 'error' || type === 'informational' || type === 'feedback';
  const showActions = type !== 'error' && type !== 'informational' && type !== 'feedback';

  const _subTitle = type === 'announcement' ? title || subTitle : subTitle;
  const _headerComponent = type === 'announcement' ? adColumn : headerComponent;

  const _showLoadingIndicator =
    showLoadingIndicator === undefined ? !showActions : showLoadingIndicator;

  const { primary, secondary, tertiary } = buttonDefs || {};

  const actions = () => {
    const defaultPrimary: HugoUIModalPrimaryButtonProps = {
      level: 'primary',
      colorTheme: 'purple',
      label: intl.formatMessage({ id: 'hugoUI.button.save', defaultMessage: 'Save' }),
      size: (fullScreen ? 'large' : 'medium') as HugoUIButtonSize,
    };
    const defaultSecondary: HugoUIModalSecondaryButtonProps = {
      level: 'secondary',
      colorTheme: 'purple',
      drawingStyle: 'outlined',
      label: intl.formatMessage({ id: 'hugoUI.button.cancel', defaultMessage: 'Cancel' }),
      size: (fullScreen ? 'large' : 'medium') as HugoUIButtonSize,
      onClick: onClose,
    };

    let primaryConstraintProps: Pick<
      HugoUIModalPrimaryButtonProps,
      'loading' | 'loadingPosition' | 'disabled'
    > = loading ? { disabled: true } : {};
    let secondaryConstraintProps: Pick<
      HugoUIModalSecondaryButtonProps,
      'loading' | 'loadingPosition' | 'disabled'
    > = loading ? { disabled: true } : {};
    const tertiaryConstraintProps = loading ? { disabled: true } : {};

    if (!_showLoadingIndicator) {
      // if loading indicator is not shown, the loading position of button should be center
      // if secondary button is loading, primary button should be disabled, otherwise secondary button should be disabled
      if (secondary?.loading) {
        primaryConstraintProps = loading ? { disabled: true } : {};
        secondaryConstraintProps = loading
          ? { loading: true, loadingPosition: 'center', disabled: false }
          : {};
      } else {
        primaryConstraintProps = loading
          ? { loading: true, loadingPosition: 'center', disabled: false }
          : {};
        secondaryConstraintProps = loading ? { disabled: true } : {};
      }
    }

    let buttonSettings: HugoUIModalButtonsType = {};
    switch (type) {
      case 'destructive':
        buttonSettings = {
          primary: {
            level: 'primary',
            colorTheme: 'red',
            label: intl.formatMessage({ id: 'hugoUI.button.destruct', defaultMessage: 'Destruct' }),
          },
          secondary: {
            colorTheme: 'grey',
          },
        };
        break;
      case 'warning':
        buttonSettings = {
          secondary: {
            level: 'secondary',
            colorTheme: 'purple',
            drawingStyle: 'outlined',
            label: intl.formatMessage({
              id: 'hugoUI.button.leave',
              defaultMessage: 'Leave without saving',
            }),
          },
        };
        break;
      case 'announcement':
        buttonSettings = {
          tertiary: {
            label: intl.formatMessage({
              id: 'hugoUI.button.neverShow',
              defaultMessage: 'Never show again',
            }),
          },
        };
        break;
      default:
        break;
    }
    const modalButtons: HugoUIModalButtonsType = {
      primary: {
        ...defaultPrimary,
        ...buttonSettings.primary,
        ...(primary || {}),
        ...primaryConstraintProps,
      },
      secondary: {
        ...defaultSecondary,
        ...buttonSettings.secondary,
        ...(secondary || {}),
        ...secondaryConstraintProps,
      },
    };
    // only create the tertiary one if it is specified, no default
    if (buttonSettings?.tertiary || tertiary) {
      modalButtons.tertiary = {
        ...(buttonSettings.tertiary || {}),
        ...(tertiary || {}),
        ...tertiaryConstraintProps,
      };
    }
    return modalButtons;
  };

  const keyUpHandle = useMemo(
    () => (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (open) {
        // esc to trigger close modal
        if (e.key === 'Escape') {
          onClose?.();
        }
      }
    },
    [open, onClose]
  );

  const Paper = useCallback(
    (props: PaperProps) =>
      CustomPaperComponent({ ...props, fullScreen, offsetY, isTouchDeviceLandscapeView, type }),
    [fullScreen, isTouchDeviceLandscapeView]
  );

  let feedbackDisp;
  if (type === 'feedback') {
    feedbackDisp = <HugoUIFeedback fullScreen={fullScreen} messages={messages} />;
  }
  let modalHeader;
  if (_headerComponent) {
    modalHeader = _headerComponent;
  } else {
    modalHeader = (
      <React.Fragment>
        <HugoUIModalTitle
          title={title}
          type={type}
          closeable={showCloseable}
          onClose={onClose}
          prefixIconName={headerPrefixIconName}
        />
      </React.Fragment>
    );
  }

  return (
    <ThemeProvider theme={createDialogTheme}>
      <Dialog
        open={open}
        onKeyUp={keyUpHandle}
        fullScreen={fullScreen}
        className={classnames(
          `${ROOT_PREFIX}-${type}`,
          {
            [`${ROOT_PREFIX}-loading`]: loading,
            [`${ROOT_PREFIX}-showLoadingIndicator`]: _showLoadingIndicator,
          },
          className
        )}
        onBackdropClick={onClose}
        TransitionComponent={TransitionZoom}
        transitionDuration={{
          appear: 300,
          enter: 300,
          exit: 1,
        }}
        PaperComponent={Paper}
        {...props}
      >
        {modalHeader}
        <DialogContent className={`${CONTENT_ROOT_PREFIX}-root`}>
          {_showLoadingIndicator && <HugoUIModalLoadingIndicator loading={loading} />}
          <div className={`${CONTENT_ROOT_PREFIX}-content`}>
            {_subTitle && <h3 className={`${ROOT_PREFIX}-subtitle`}>{_subTitle}</h3>}
            {children}
            {feedbackDisp}
          </div>
        </DialogContent>
        {footerComponent ||
          (showActions && (
            <HugoUIModalFooter actionProps={actions()} disableAutoFocus={disableAutoFocus} />
          ))}
      </Dialog>
    </ThemeProvider>
  );
};
