import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { PlayFunction } from '@storybook/types';
import { StoryFn, Meta, ReactRenderer } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fireEvent, within, waitFor } from '@storybook/test';
import {
  Button,
  Modal,
  ModalContentText,
  ModalProps,
  ModalButtonsType,
  Typography,
  ModalType,
} from 'hugo-ui';
import { groupArgs, hideAttributes } from './utils';

const hiddenKeys = ['component', 'ref', 'isRtl'];

export default {
  title: 'HugoUI/Molecules/Modal',
  component: Modal,
  argTypes: {
    ...groupArgs(['id', 'type', 'title', 'onClose', 'className', 'style'], 'Basic'),
    ...groupArgs(['loading', 'showLoadingIndicator'], 'Loading'),
    ...groupArgs(['headerComponent', 'headerPrefixIconName', 'closeButton'], 'header'),
    ...groupArgs(['subTitle', 'children', 'adColumn', 'messages'], 'Content'),
    ...groupArgs(['buttonDefs', 'footerComponent'], 'footer'),
    ...hideAttributes(hiddenKeys),
  },
} as Meta<typeof Modal>;

const BasicTemplate: StoryFn<typeof Modal> = (args) => {
  const { children, ...otherArgs } = args;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal {...otherArgs} open={open} onClose={handleClose}>
        {children}
      </Modal>
    </>
  );
};

const basicAction = {
  buttonDefs: {
    primary: {
      onClick: action('onClick'),
    },
  },
};

const basicPlay: PlayFunction<ReactRenderer, ModalProps> = async ({ canvasElement }) => {
  setTimeout(() => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Demo' });
    fireEvent.click(button);
  }, 100);
};

const transactionalArgs = {
  ...basicAction,
  title: 'Transactional',
  type: 'transactional' as ModalType,
  children: (
    <ModalContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ModalContentText>
  ),
};

export const Transactional = BasicTemplate.bind({});
Transactional.args = transactionalArgs;
Transactional.play = basicPlay;

export const Destructive = BasicTemplate.bind({});
Destructive.args = {
  ...basicAction,
  title: 'Destructive',
  type: 'destructive',
  children: (
    <ModalContentText>
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ModalContentText>
  ),
};
Destructive.play = basicPlay;

export const Warning = BasicTemplate.bind({});
Warning.args = {
  ...basicAction,
  title: 'Warning',
  type: 'warning',
  children: (
    <ModalContentText>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</ModalContentText>
  ),
};
Warning.play = basicPlay;

const informationalArgs = {
  title: 'Informational',
  type: 'informational' as ModalType,
  children: (
    <ModalContentText>
      Duis aute irure dolor in reprehenderit in voluptate velit esse.
    </ModalContentText>
  ),
};

export const Informational = BasicTemplate.bind({});
Informational.args = informationalArgs;
Informational.play = basicPlay;

export const SystemError = BasicTemplate.bind({});
SystemError.args = {
  title: 'Lorem ipsum',
  type: 'error',
  children: (
    <ModalContentText>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa.
    </ModalContentText>
  ),
};
SystemError.play = basicPlay;

export const CustomizeHeaderIcon = BasicTemplate.bind({});
CustomizeHeaderIcon.args = {
  ...basicAction,
  title: 'Destructive',
  type: 'destructive',
  headerComponent: (
    <div
      style={{
        height: 50,
        paddingLeft: 32,
        lineHeight: '50px',
        display: 'flex',
        gap: 8,
        alignItems: 'center',
      }}
    >
      <DeleteOutlineIcon fontSize="small" />
      <span>Phasellus viverra nulla ut metus.</span>
    </div>
  ),
  children: (
    <ModalContentText>
      Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
    </ModalContentText>
  ),
};
CustomizeHeaderIcon.play = basicPlay;

export const CustomizeHeaderAndFooter: StoryFn<typeof Modal> = (args) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...otherArgs } = args;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal
        {...otherArgs}
        open={open}
        onClose={handleClose}
        headerComponent={
          <div style={{ height: 50, paddingLeft: 32, lineHeight: '50px' }}>
            Sample header text
            <CloseIcon
              fontSize="small"
              onClick={handleClose}
              style={{ marginLeft: 8, cursor: 'pointer', verticalAlign: 'middle' }}
            />
          </div>
        }
        footerComponent={
          <div style={{ height: 50, paddingLeft: 32, lineHeight: '50px' }}>
            Lorem ipsum dolor sit amet.
          </div>
        }
      >
        <ModalContentText>Integer in mauris eu nibh euismod gravida.</ModalContentText>
        <ModalContentText style={{ marginTop: 30 }}>
          Donec quis dui at dolor tempor interdum.
        </ModalContentText>
      </Modal>
    </>
  );
};
CustomizeHeaderAndFooter.argTypes = {
  ...hideAttributes(['open', 'onClose', 'headerComponent', 'footerComponent', 'children']),
};
CustomizeHeaderAndFooter.play = basicPlay;

export const FeedbackSuccess = BasicTemplate.bind({});
FeedbackSuccess.args = {
  type: 'feedback',
  messages: [
    {
      type: 'success',
      message: 'Lorem ipsum dolor sit amet.',
    },
  ],
};
FeedbackSuccess.play = basicPlay;

export const FeedbackSuccessWithExtra = BasicTemplate.bind({});
FeedbackSuccessWithExtra.args = {
  type: 'feedback',
  messages: [
    {
      type: 'success',
      message: 'Sed do eiusmod tempor incididunt.',
      description: 'Aliquam lorem ante dapibus in.',
    },
  ],
};
FeedbackSuccessWithExtra.play = basicPlay;

export const FeedbackDestructiveSuccess = BasicTemplate.bind({});
FeedbackDestructiveSuccess.args = {
  type: 'feedback',
  messages: [{ type: 'destructiveSuccess', message: 'Ut enim ad minim veniam.' }],
};
FeedbackDestructiveSuccess.play = basicPlay;

export const FeedbackDestructiveSuccessWithExtra = BasicTemplate.bind({});
FeedbackDestructiveSuccessWithExtra.args = {
  type: 'feedback',
  messages: [
    {
      type: 'destructiveSuccess',
      message: 'Duis aute irure dolor in reprehenderit.',
      description: 'Phasellus viverra nulla ut metus.',
    },
  ],
};
FeedbackDestructiveSuccessWithExtra.play = basicPlay;

export const FeedbackError = BasicTemplate.bind({});
FeedbackError.args = {
  type: 'feedback',
  messages: [{ type: 'error', message: 'Excepteur sint occaecat cupidatat non proident.' }],
};
FeedbackError.play = basicPlay;

export const FeedbackErrorWithExtra = BasicTemplate.bind({});
FeedbackErrorWithExtra.args = {
  type: 'feedback',
  messages: [
    {
      type: 'error',
      message: 'Curabitur pretium tincidunt lacus.',
      description: 'Lorem ipsum dolor sit amet.',
    },
  ],
};
FeedbackErrorWithExtra.play = basicPlay;

export const FeedbackMixed = BasicTemplate.bind({});
FeedbackMixed.args = {
  type: 'feedback',
  messages: [
    { type: 'success', message: 'Integer in mauris eu nibh.' },
    {
      type: 'error',
      message: (
        <div>
          Lorem ipsum dolor sit amet.
          <p>Sed do eiusmod tempor incididunt.</p>
          <p>Ut enim ad minim veniam.</p>
          <p>Duis aute irure dolor in reprehenderit.</p>
          <p>Excepteur sint occaecat cupidatat non proident.</p>
        </div>
      ),
    },
  ],
};
FeedbackMixed.play = basicPlay;

export const FeedbackMixedWithExtra = BasicTemplate.bind({});
FeedbackMixedWithExtra.args = {
  type: 'feedback',
  messages: [
    {
      type: 'success',
      message: 'Donec quis dui at dolor tempor.',
      description: 'Sed do eiusmod tempor incididunt.',
    },
    {
      type: 'error',
      message: 'Vivamus luctus egestas leo.',
      description: (
        <>
          <ModalContentText>Vivamus luctus egestas leo.</ModalContentText>
          <ModalContentText>
            Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue.
          </ModalContentText>
        </>
      ),
      descriptonComponentType: 'div',
    },
  ],
};
FeedbackMixedWithExtra.play = basicPlay;

export const PositionLargeContent: StoryFn<typeof Modal> = (args) => {
  const { children, ...otherArgs } = args;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  const buttonDefs: ModalButtonsType = {
    ...args.buttonDefs,
    secondary: {
      ...args.buttonDefs?.secondary,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        args.buttonDefs?.secondary?.onClick?.(e);
        setOpen(false);
      },
    },
    tertiary: {
      ...args.buttonDefs?.tertiary,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        args.buttonDefs?.tertiary?.onClick?.(e);
        setOpen(false);
      },
    },
  };

  return (
    <>
      <p>Vivamus luctus egestas leo.</p>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal {...otherArgs} open={open} onClose={handleClose} buttonDefs={buttonDefs}>
        {children}
      </Modal>
      <p>Praesent dapibus neque id cursus.</p>
    </>
  );
};
PositionLargeContent.args = {
  title: 'Lorem ipsum',
  type: 'transactional',
  subTitle: 'Duis aute irure dolor in reprehenderit.',
  buttonDefs: {
    primary: {
      label: 'Lorem ipsum',
      onClick: action('onClick'),
    },
    secondary: {
      label: 'Dolor sit',
      onClick: action('onClick'),
    },
    tertiary: {
      label: 'Amet consectetur',
      onClick: action('onClick'),
    },
  },
  children: (
    <>
      {Array.from({ length: 60 }, (v, k) => (
        <ModalContentText key={k}>Fusce lobortis lorem at ipsum semper sagittis.</ModalContentText>
      ))}
    </>
  ),
};
PositionLargeContent.play = basicPlay;

export const MultipleModals1: StoryFn<typeof Modal> = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setStep(0);
    }
  }, [open]);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  return (
    <>
      <p>Fusce lobortis lorem at ipsum.</p>
      <Typography variant="subtitleD">Nullam quis ante etiam sit amet.</Typography>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal
        title="Multiple Modals - 01"
        type="transactional"
        open={open && step === 0}
        onClose={handleClose}
        transitionDuration={{
          appear: 300,
          exit: 0,
          enter: 300,
        }}
        buttonDefs={{
          primary: {
            label: 'Adipiscing elit',
            onClick: (e) => {
              action('onClick')(e);
              setStep(1);
            },
          },
        }}
      >
        <ModalContentText>Donec vitae sapien ut libero venenatis faucibus.</ModalContentText>
      </Modal>
      <Modal
        title="Multiple Modals - 02"
        type="transactional"
        open={open && step === 1}
        onClose={handleClose}
        transitionDuration={{
          appear: 0,
          exit: 0,
          enter: 0,
        }}
        buttonDefs={{
          primary: {
            label: 'Sed do',
            onClick: (e) => {
              action('onClick')(e);
              setStep(2);
            },
          },
        }}
      >
        <ModalContentText>
          Nullam quis ante. Etiam sit amet orci eget eros faucibus.
        </ModalContentText>
      </Modal>
      <Modal
        title="Lorem ipsum"
        type="feedback"
        open={open && step === 2}
        onClose={handleClose}
        transitionDuration={{
          appear: 0,
          exit: 100,
          enter: 0,
        }}
        messages={[
          {
            type: 'success',
            message: 'Praesent dapibus neque id cursus.',
            description: 'Ut enim ad minim veniam.',
          },
        ]}
      />
    </>
  );
};
MultipleModals1.play = basicPlay;

export const MultipleModals2: StoryFn<typeof Modal> = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setStep(0);
    }
  }, [open]);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  return (
    <>
      <p>Donec vitae sapien ut libero.</p>
      <Typography variant="subtitleD">Aliquam lorem ante dapibus in.</Typography>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal
        open={open}
        onClose={handleClose}
        {...(step < 2
          ? {
              title: `Multiple Modals - 0${step + 1}`,
              type: 'transactional',
              loading,
              buttonDefs:
                step === 0
                  ? {
                      primary: {
                        label: 'Next',
                        onClick: (e) => {
                          action('onClick')(e);
                          setStep(1);
                        },
                      },
                    }
                  : {
                      primary: {
                        label: loading ? 'Loading' : 'Save',
                        onClick: (e) => {
                          action('onClick')(e);
                          setLoading(true);
                          setTimeout(() => {
                            setLoading(false);
                            setStep(2);
                          }, 3000);
                        },
                      },
                      secondary: {
                        label: 'Previous',
                        onClick: (e) => {
                          action('onClick')(e);
                          setStep(0);
                        },
                      },
                    },
            }
          : {
              type: 'feedback',
              messages: [{ type: 'success', message: 'Fusce lobortis lorem at ipsum.' }],
            })}
      >
        {step < 2 ? (
          <ModalContentText>
            Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
          </ModalContentText>
        ) : null}
      </Modal>
    </>
  );
};
MultipleModals2.play = basicPlay;

export const TitleWithTheMultipleLines = BasicTemplate.bind({});
TitleWithTheMultipleLines.args = {
  ...basicAction,
  title:
    'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  type: 'transactional',
  children: <ModalContentText>Phasellus viverra nulla ut metus varius laoreet.</ModalContentText>,
};
TitleWithTheMultipleLines.play = basicPlay;

const LoadingTemplate: StoryFn<typeof Modal> = (args) => {
  const { children, ...otherArgs } = args;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setLoading(false);
    }
  }, [open]);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  const buttonDefs: ModalButtonsType = {
    primary: {
      onClick: (e) => {
        action('onClick')(e);
        setLoading(true);
        setTimeout(() => {
          setOpen(false);
          setInfoModalOpen(true);
        }, 3000);
      },
    },
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal
        {...otherArgs}
        open={open}
        onClose={handleClose}
        loading={loading}
        buttonDefs={buttonDefs}
      >
        {children}
      </Modal>
      <Modal
        type="feedback"
        open={infoModalOpen}
        messages={[
          {
            type: 'success',
            message: 'Donec vitae sapien ut libero.',
          },
        ]}
        onClose={() => {
          action('onClose')();
          setInfoModalOpen(false);
        }}
      />
    </>
  );
};

const loadingTemplateArgTypes = {
  ...hideAttributes(['open', 'onClose', 'loading', 'buttonDefs', 'type', 'title', 'children']),
};

const loadingTemplatePlay: PlayFunction<ReactRenderer, ModalProps> = async ({ canvasElement }) => {
  setTimeout(() => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: 'Demo' });
    fireEvent.click(button);

    setTimeout(async () => {
      await waitFor(() => {
        const primaryButton = document.querySelector(
          '.HugoUIModalFooter-root .HugoUIButton-primaryLevel'
        );
        if (primaryButton) {
          fireEvent.click(primaryButton);
        }
      });
    }, 0);
  }, 100);
};

const LoadingWithTertiaryTemplate: StoryFn<typeof Modal> = (args) => {
  const { children, ...otherArgs } = args;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState<'primary' | 'secondary' | ''>('');

  const [infoModalOpen, setInfoModalOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setLoadingButton('');
      setLoading(false);
    }
  }, [open]);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  const buttonDefs: ModalButtonsType = {
    primary: {
      onClick: (e) => {
        action('onClick')(e);
        setLoadingButton('primary');
        setLoading(true);
        setTimeout(() => {
          setOpen(false);
          setInfoModalOpen(true);
        }, 3000);
      },
    },
    secondary: {
      loading: loading && loadingButton === 'secondary',
      onClick: (e) => {
        action('onClick')(e);
        setLoadingButton('secondary');
        setLoading(true);
        setTimeout(() => {
          setOpen(false);
          setInfoModalOpen(true);
        }, 3000);
      },
    },
    tertiary: {
      label: 'Labore et',
      onClick: (e) => {
        action('onClick')(e);
        setOpen(false);
      },
    },
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal
        {...otherArgs}
        open={open}
        onClose={handleClose}
        loading={loading}
        buttonDefs={buttonDefs}
      >
        {children}
      </Modal>
      <Modal
        type="feedback"
        open={infoModalOpen}
        messages={[
          {
            type: 'success',
            message: 'Nullam quis ante etiam sit amet.',
          },
        ]}
        onClose={() => {
          action('onClose')();
          setInfoModalOpen(false);
        }}
      />
    </>
  );
};

const loadingWithTertiaryTemplateArgTypes = {
  ...hideAttributes(['open', 'onClose', 'loading', 'buttonDefs', 'type', 'title', 'children']),
};

const loadingWithTertiaryTemplatePlay: PlayFunction<ReactRenderer, ModalProps> = async ({
  canvasElement,
}) => {
  setTimeout(() => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Demo' });
    fireEvent.click(button);

    setTimeout(async () => {
      await waitFor(() => {
        const primaryButton = document.querySelector(
          '.HugoUIModalFooter-root .HugoUIButton-secondaryLevel'
        );
        if (primaryButton) {
          fireEvent.click(primaryButton);
        }
      });
    }, 0);
  }, 100);
};

export const TransactionalLoading = LoadingTemplate.bind({});
TransactionalLoading.argTypes = loadingTemplateArgTypes;
TransactionalLoading.args = {
  title: 'Loading',
  type: 'transactional',
  children: (
    <ModalContentText>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</ModalContentText>
  ),
};
TransactionalLoading.play = loadingTemplatePlay;

export const TransactionalLoadingWithTertiaryButton = LoadingWithTertiaryTemplate.bind({});
TransactionalLoadingWithTertiaryButton.argTypes = loadingWithTertiaryTemplateArgTypes;
TransactionalLoadingWithTertiaryButton.args = {
  title: 'Loading',
  type: 'transactional',
  children: (
    <ModalContentText>
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ModalContentText>
  ),
};
TransactionalLoadingWithTertiaryButton.play = loadingWithTertiaryTemplatePlay;

export const WarningLoading = LoadingTemplate.bind({});
WarningLoading.argTypes = loadingTemplateArgTypes;
WarningLoading.args = {
  title: 'Warning loading',
  type: 'warning',
  children: (
    <ModalContentText>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</ModalContentText>
  ),
};
WarningLoading.play = loadingTemplatePlay;

export const WarningLoadingWithTertiaryButton = LoadingWithTertiaryTemplate.bind({});
WarningLoadingWithTertiaryButton.argTypes = loadingWithTertiaryTemplateArgTypes;
WarningLoadingWithTertiaryButton.args = {
  title: 'Warning loading',
  type: 'warning',
  children: (
    <ModalContentText>
      Duis aute irure dolor in reprehenderit in voluptate velit esse.
    </ModalContentText>
  ),
};
WarningLoadingWithTertiaryButton.play = loadingWithTertiaryTemplatePlay;

export const DestructiveLoading = LoadingTemplate.bind({});
DestructiveLoading.argTypes = loadingTemplateArgTypes;
DestructiveLoading.args = {
  title: 'Destructive loading',
  type: 'destructive',
  children: (
    <ModalContentText>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa.
    </ModalContentText>
  ),
};
DestructiveLoading.play = loadingTemplatePlay;

export const DestructiveLoadingWithTertiaryButton = LoadingWithTertiaryTemplate.bind({});
DestructiveLoadingWithTertiaryButton.argTypes = loadingWithTertiaryTemplateArgTypes;
DestructiveLoadingWithTertiaryButton.args = {
  title: 'Destructive loading',
  type: 'destructive',
  children: (
    <ModalContentText>
      Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
    </ModalContentText>
  ),
};
DestructiveLoadingWithTertiaryButton.play = loadingWithTertiaryTemplatePlay;

export const InformationalLoading: StoryFn<typeof Modal> = (args) => {
  const { children, ...otherArgs } = args;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [open]);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal {...otherArgs} open={open} onClose={handleClose} loading={loading}>
        {children}
      </Modal>
    </>
  );
};
InformationalLoading.argTypes = {
  ...hideAttributes(['open', 'onClose', 'loading', 'buttonDefs', 'type', 'title', 'children']),
};
InformationalLoading.args = {
  title: 'Informational',
  type: 'informational',
  children: <ModalContentText>Integer in mauris eu nibh euismod gravida.</ModalContentText>,
};
InformationalLoading.play = basicPlay;

export const HideACertainButton: StoryFn<typeof Modal> = (args) => {
  const { children, ...otherArgs } = args;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    action('onClose')();
    setOpen(false);
  };

  const buttonDefs: ModalButtonsType = {
    primary: {
      onClick: (e) => {
        action('onClick')(e);
        setOpen(false);
      },
    },
    secondary: {
      hidden: true,
    },
    tertiary: {
      label: 'Dolore magna',
      onClick: (e) => {
        action('onClick')(e);
        setOpen(false);
      },
    },
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Demo</Button>
      <Modal {...otherArgs} open={open} onClose={handleClose} buttonDefs={buttonDefs}>
        {children}
      </Modal>
    </>
  );
};
HideACertainButton.args = {
  title: ' Destructive',
  type: 'destructive',
  children: <ModalContentText>Donec quis dui at dolor tempor interdum.</ModalContentText>,
};
HideACertainButton.play = basicPlay;
