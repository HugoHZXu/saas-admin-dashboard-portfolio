import React, { useState, useRef, ChangeEvent } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { StoryFn, Meta } from '@storybook/react';
import { fireEvent, userEvent, within, expect } from '@storybook/test';
import { Input, Button } from 'hugo-ui';
import { StyledColumn, StyledRow } from './assets/styles';
import { withHugoUIBackgroundTheme, backgrounds } from './decorators/withHugoUIBackgroundTheme';
import { onEnterKeyPress } from 'hugo-ui/utils/wcagUtils';

export default {
  title: 'HugoUI/Atoms/Input',
  decorators: [withHugoUIBackgroundTheme],
  component: Input,
  tags: ['autodocs'],
  parameters: {
    backgrounds,
  },
  argTypes: {
    disabled: {
      description: 'If `true`, the component is disabled.',
      control: 'boolean',
      table: {
        category: 'Basic',
      },
    },
    fullWidth: {
      description: 'If true, the input will take up the full width of its container.',
      control: 'boolean',
      table: {
        category: 'Others',
      },
    },
    helperText: {
      description: 'The helper text content. \n\nType: `node` (supports `React.ReactNode`)',
      control: 'text',
      table: {
        category: 'Basic',
      },
    },
    InputLabelProps: {
      description:
        'Props applied to the `InputLabel` element. Pointer events like `onClick` are enabled if and only if `shrink` is `true`. Details see <a href="https://mui.com/material-ui/api/input-label/">MUI\'s docs</a>.',
      control: 'object',
      table: {
        category: 'Others',
      },
    },
    inputProps: {
      description:
        '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">Attributes</a> applied to the <code>input</code> element.',
      control: 'object',
      table: {
        category: 'Others',
      },
    },
    InputProps: {
      description: 'Props applied to the Input element.',
      control: 'object',
      table: {
        category: 'Others',
      },
    },
    inputRef: {
      description: 'Pass a ref to the `input` element.\n\nType: `ref`',
      table: {
        category: 'Others',
      },
    },
    label: {
      description: 'The label content. \n\nType: `node` (supports `React.ReactNode`)',
      control: 'text',
      table: {
        category: 'Basic',
      },
    },
    multiline: {
      description: 'If `true`, a `textarea` element is rendered instead of an input.',
      control: 'boolean',
      table: {
        category: 'Multiline',
      },
    },
    name: {
      description:
        '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#name">Name</a> attribute of the `input` element.',
      control: 'text',
      table: {
        category: 'Basic',
      },
    },
    onChange: {
      description:
        'Callback fired when the value is changed.\n\nType: `func`\n\nSignature: `function(event: object) => void`\n\n - `event`: The event source of the callback. You can pull out the new value by accessing\n\n - `event.target.value`: (string).',
      table: {
        category: 'Basic',
      },
    },
    required: {
      description:
        'If `true`, the label is displayed as required and the `input` element is required.',
      control: 'boolean',
      table: {
        category: 'Basic',
      },
    },
    type: {
      description:
        'Type of the <code>input</code> element. It should be <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types">a valid HTML5 input type</a>.',
      control: 'text',
      table: {
        category: 'Others',
      },
    },
    value: {
      table: {
        category: 'Basic',
      },
    },
    extraMessage: {
      control: 'text',
      table: {
        category: 'Status',
      },
      if: { arg: 'color', neq: 'primary' },
    },
    color: {
      description:
        'Only used for the color of success/error. If neither success status nor error status, can just leave it `undefined` or assign `"primary"` to it.',
      control: 'radio',
      options: ['primary', 'success', 'error'],
      table: {
        category: 'Status',
      },
    },
    theme: {
      table: {
        category: 'Basic',
      },
    },
    mini: {
      table: {
        category: 'Mini',
      },
    },
    loading: {
      table: {
        category: 'Status',
      },
    },
    showCount: {
      if: { arg: 'multiline', eq: true },
      table: {
        category: 'Multiline',
      },
    },
    icon: {
      control: 'none',
      table: {
        category: 'Status',
      },
    },
    id: {
      description: 'The unique id (HTML attribute)',
      control: 'text',
      table: {
        category: 'Basic',
      },
    },
    margin: {
      table: {
        disable: true,
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
    focused: {
      table: {
        disable: true,
      },
    },
    hiddenLabel: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    label: 'label',
    value: '',
  },
} as Meta<typeof Input>;

export const BasicInput: StoryFn<typeof Input> = (args) => <Input {...args} />;
BasicInput.args = {
  id: 'BasicInput',
  label: 'Default input',
  helperText: 'Helper text',
};

const SingleTemplate: StoryFn<typeof Input> = (args) => (
  <div style={StyledColumn}>
    <div style={{ ...StyledRow, justifyContent: 'space-evenly' }}>
      <div style={{ width: 200 }}>
        <Input inputProps={{ 'aria-label': 'Input aria label' }} {...args} />
      </div>
    </div>
  </div>
);

const StatusTemplate: StoryFn<typeof Input> = (args) => (
  <div style={StyledColumn}>
    <div style={{ ...StyledRow, justifyContent: 'space-evenly' }}>
      <div style={{ width: 200 }}>
        <Input
          {...args}
          id={`${args.id}-1`}
          color="success"
          label="Success"
          extraMessage="Success message"
        />
        <Input
          {...args}
          id={`${args.id}-2`}
          color="error"
          label="Error"
          extraMessage="Error message"
        />
        <Input {...args} id={`${args.id}-3`} label="Loading" loading />
        <Input {...args} id={`${args.id}-4`} label="Disabled" disabled />
        <Input {...args} id={`${args.id}-5`} label="Active" />
      </div>
    </div>
  </div>
);

export const InputStatus = StatusTemplate.bind({});
InputStatus.args = {
  id: 'InputStatus',
};
InputStatus.play = async () => {
  const focusVisibleElem = document.querySelectorAll('.MuiOutlinedInput-input')[4] as HTMLElement;
  if (focusVisibleElem) {
    fireEvent.mouseDown(focusVisibleElem);
    await focusVisibleElem.focus();
  }
};

export const InputTabFocus = SingleTemplate.bind({});
InputTabFocus.args = {
  id: 'InputTabFocus',
  label: 'Tab focus',
};
InputTabFocus.play = async () => {
  const focusedElem = document.querySelector('.MuiOutlinedInput-input') as HTMLElement;
  focusedElem?.focus();
};

export const MiniInput = SingleTemplate.bind({});
MiniInput.args = {
  mini: true,
  id: 'MiniInput',
  label: 'Mini Input',
};

export const MiniInputStatus: StoryFn<typeof Input> = (args) => (
  <div style={StyledColumn}>
    <div style={{ ...StyledRow, justifyContent: 'space-evenly' }}>
      <div style={{ width: 200 }}>
        <Input {...args} id={`${args.id}-1`} color="success" label="Success Input" />
        <Input {...args} id={`${args.id}-2`} color="error" label="Error Input" />
        <Input {...args} id={`${args.id}-3`} label="Loading" loading />
        <Input {...args} id={`${args.id}-4`} label="Disabled" disabled />
        <Input {...args} id={`${args.id}-5`} label="Active" />
      </div>
    </div>
  </div>
);
MiniInputStatus.args = {
  mini: true,
  style: { marginBottom: 10 },
  id: 'MiniInputStatus',
};
MiniInputStatus.play = async () => {
  const focusVisibleElem = document.querySelectorAll('.MuiOutlinedInput-input')[4] as HTMLElement;
  if (focusVisibleElem) {
    fireEvent.mouseDown(focusVisibleElem);
    await focusVisibleElem.focus();
  }
};

export const MiniInputTabFocus = SingleTemplate.bind({});
MiniInputTabFocus.args = {
  mini: true,
  id: 'MiniInputTabFocus',
  label: 'Tab focus',
};
MiniInputTabFocus.play = async () => {
  const focusedElem = document.querySelector('.MuiOutlinedInput-input') as HTMLElement;
  focusedElem?.focus();
};

export const Placeholder: StoryFn<typeof Input> = () => (
  <div style={StyledColumn}>
    <div style={{ ...StyledRow, justifyContent: 'space-evenly' }}>
      <div style={{ width: 200 }}>
        <Input
          inputProps={{ 'aria-label': 'Input aria label' }}
          label="Label"
          placeholder="Placeholder"
        />
      </div>
    </div>
  </div>
);
Placeholder.play = async () => {
  const focusedElem = document.querySelector('.MuiOutlinedInput-input') as HTMLElement;
  focusedElem?.focus();
};

export const CustomIcon = SingleTemplate.bind({});
CustomIcon.args = {
  icon: <StarIcon fontSize="small" />,
  id: 'CustomIcon',
};

export const MultilineInput = SingleTemplate.bind({});
MultilineInput.args = {
  multiline: true,
  id: 'MultilineInput',
};

export const MultilineInputStatus = StatusTemplate.bind({});
MultilineInputStatus.args = {
  multiline: true,
  id: 'MultilineInputStatus',
};
MultilineInputStatus.play = async () => {
  const focusVisibleElem = document.querySelectorAll('.MuiOutlinedInput-input')[8] as HTMLElement;
  if (focusVisibleElem) {
    fireEvent.mouseDown(focusVisibleElem);
    await focusVisibleElem.focus();
  }
};

export const MultilineInputTabFocus = SingleTemplate.bind({});
MultilineInputTabFocus.args = {
  multiline: true,
  id: 'MultilineInputTabFocus',
  label: 'Tab focus',
};
MultilineInputTabFocus.play = async () => {
  const focusedElem = document.querySelector('.MuiOutlinedInput-input') as HTMLElement;
  focusedElem?.focus();
};

export const RequiredInput = StatusTemplate.bind({});
RequiredInput.args = {
  required: true,
  id: 'required',
};
RequiredInput.play = async () => {
  const focusVisibleElem = document.querySelectorAll('.MuiOutlinedInput-input')[4] as HTMLElement;
  if (focusVisibleElem) {
    fireEvent.mouseDown(focusVisibleElem);
    await focusVisibleElem.focus();
  }
};

export const RequiredInputTabFocus = SingleTemplate.bind({});
RequiredInputTabFocus.args = {
  required: true,
  id: 'RequiredInputTabFocus',
  label: 'Tab focus',
};
RequiredInputTabFocus.play = async () => {
  const focusedElem = document.querySelector('.MuiOutlinedInput-input') as HTMLElement;
  focusedElem?.focus();
};

export const RequiredMultilineInput = StatusTemplate.bind({});
RequiredMultilineInput.args = {
  multiline: true,
  required: true,
  id: 'RequiredMultilineInput',
};
RequiredMultilineInput.play = async () => {
  const focusVisibleElem = document.querySelectorAll('.MuiOutlinedInput-input')[8] as HTMLElement;
  if (focusVisibleElem) {
    fireEvent.mouseDown(focusVisibleElem);
    await focusVisibleElem.focus();
  }
};

export const RequiredMultilineInputTabFocus = SingleTemplate.bind({});
RequiredMultilineInputTabFocus.args = {
  multiline: true,
  required: true,
  id: 'RequiredMultilineInputTabFocus',
  label: 'Tab focus',
};
RequiredMultilineInputTabFocus.play = async () => {
  const focusedElem = document.querySelector('.MuiOutlinedInput-input') as HTMLElement;
  focusedElem?.focus();
};

// UseCase: Press Enter to submit data
const EnterToSubmitTemplate: StoryFn<typeof Input> = (args) => {
  const [enterInputValue, onEnterInputValueChange] = useState<string>('');
  const [showEnterText, setShowEnterText] = useState<boolean>(false);
  const isKeyboardRef = useRef<boolean>(false);

  return (
    <div style={StyledColumn}>
      <p>
        In this case, you can input the value and press Enter to submit data, it is the same
        behavior as click out of Input
      </p>
      <div style={{ ...StyledRow, justifyContent: 'left' }}>
        <div style={{ width: 200 }}>
          {!showEnterText && (
            <Input
              {...args}
              inputProps={{ 'aria-label': 'Input aria label' }}
              autoFocus={!showEnterText}
              autoFocusByKeyboard={isKeyboardRef.current}
              value={enterInputValue}
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onEnterInputValueChange(e.target.value)
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                onEnterInputValueChange(e.target.value);
                setShowEnterText(true);
                setTimeout(() => {
                  const button = document.querySelector('#button-40') as HTMLButtonElement;
                  if (button && isKeyboardRef.current) {
                    button.focus();
                  }
                }, 0);
              }}
            />
          )}
          {showEnterText && (
            <Button
              id="button-40"
              level="tertiary"
              tabIndex={0}
              onClick={() => {
                isKeyboardRef.current = false;
                setShowEnterText(false);
              }}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  isKeyboardRef.current = true;
                  setShowEnterText(false);
                }
              }}
            >
              {enterInputValue || 'Click to Edit'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const UseCaseEnterToSubmit = EnterToSubmitTemplate.bind({});
UseCaseEnterToSubmit.args = {
  id: 'EnterToSubmit',
};
UseCaseEnterToSubmit.parameters = {
  docs: {
    source: {
      code: `
      const EnterToSubmit = (args) => {
        const [enterInputValue, onEnterInputValueChange] = useState<string>('')
        const [showEnterText, setShowEnterText] = useState<boolean>(false)
        const isKeyboardRef = useRef<boolean>(false)
      
        return (
          <div style={StyledColumn}>
            <p>
              In this case, you can input the value and press Enter to submit data, it's the same behavior as click out of
              Input
            </p>
            <div style={{ ...StyledRow, justifyContent: 'left' }}>
              <div style={{ width: 200 }}>
                {!showEnterText && (
                  <Input
                    {...args}
                    inputProps={{ 'aria-label': 'Input aria label' }}
                    autoFocus={!showEnterText}
                    autoFocusByKeyboard={isKeyboardRef.current}
                    value={enterInputValue}
                    autoComplete="off"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onEnterInputValueChange(e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                      onEnterInputValueChange(e.target.value)
                      setShowEnterText(true)
                      setTimeout(() => {
                        const button = document.querySelector('#button-40') as HTMLButtonElement
                        if (button && isKeyboardRef.current) {
                          button.focus()
                        }
                      }, 0)
                    }}
                  />
                )}
                {showEnterText && (
                  <Button
                    id="button-40"
                    level="tertiary"
                    tabIndex={0}
                    onClick={(e) => {
                      isKeyboardRef.current = false
                      setShowEnterText(false)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault()
                        isKeyboardRef.current = true
                        setShowEnterText(false)
                      }
                    }}
                  >
                    {enterInputValue || 'Click to Edit'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      }
      `,
    },
  },
};

// UseCase: Press Enter to submit data
const StatusOnEnterTemplate: StoryFn<typeof Input> = () => {
  const [enterSuccessValue, onEnterSuccessValueChange] = useState<string>('');
  const [enterErrorValue, onEnterErrorValueChange] = useState<string>('');
  const [enterLoadingValue, onEnterLoadingValueChange] = useState<string>('');
  const [hasEnterSuccess, onEnterSuccessChange] = useState<boolean>(false);
  const [hasEnterError, onEnterErrorChange] = useState<boolean>(false);
  const [isEnterLoading, onEnterLoadingChange] = useState<boolean>(false);

  return (
    <div style={StyledColumn}>
      <div style={{ ...StyledRow, justifyContent: 'space-evenly' }}>
        <div style={{ width: 200 }}>
          <Input
            id="enter-loading"
            label="Loading"
            helperText="Helper Text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onEnterLoadingValueChange(e.target.value);
              onEnterLoadingChange(false);
            }}
            inputProps={{
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onEnterKeyPress(e, () => enterLoadingValue && onEnterLoadingChange(true)),
            }}
            loading={isEnterLoading}
          />
          <Input
            id="enter-success"
            label="Success"
            helperText="Helper Text"
            color={hasEnterSuccess ? 'success' : 'primary'}
            extraMessage={hasEnterSuccess ? 'Success message' : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onEnterSuccessValueChange(e.target.value);
              onEnterSuccessChange(false);
            }}
            inputProps={{
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onEnterKeyPress(e, () => enterSuccessValue && onEnterSuccessChange(true)),
            }}
          />
          <Input
            id="enter-error"
            label="Error"
            helperText="Helper Text"
            color={hasEnterError ? 'error' : 'primary'}
            extraMessage={hasEnterError ? 'Error message' : ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onEnterErrorValueChange(e.target.value);
              onEnterErrorChange(false);
            }}
            inputProps={{
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onEnterKeyPress(e, () => enterErrorValue && onEnterErrorChange(true)),
            }}
          />
          <Input id="enter-rest" label="Rest" helperText="Helper Text" />
        </div>
      </div>
    </div>
  );
};

export const StatusOnEnter = StatusOnEnterTemplate.bind({});
StatusOnEnter.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const inputs = document.querySelectorAll('.MuiInputBase-root');
  const loadingInput = inputs[0];
  if (loadingInput) {
    await fireEvent.click(loadingInput);
    await userEvent.type(loadingInput, 't');
    await userEvent.keyboard('[Enter]');
  }
  const successInput = inputs[1];
  if (successInput) {
    await fireEvent.click(successInput);
    await userEvent.type(successInput, 'e');
    await userEvent.keyboard('[Enter]');
  }
  expect(canvas.getByText('Success message')).toBeInTheDocument();
  const errorInput = inputs[2];
  if (errorInput) {
    await fireEvent.click(errorInput);
    await userEvent.type(errorInput, 's');
    await userEvent.keyboard('[Enter]');
  }
  expect(canvas.getByText('Error message')).toBeInTheDocument();
  const restInput = inputs[3];
  if (restInput) {
    await fireEvent.click(restInput);
    await userEvent.type(restInput, 't');
    await userEvent.keyboard('[Enter]');
  }
};
