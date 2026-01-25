import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StoryFn, Meta } from '@storybook/react';
import { addons } from '@storybook/addons';
import { waitFor } from '@storybook/test';
import { UPDATE_GLOBALS, STORY_ARGS_UPDATED } from '@storybook/core-events';
import {
  Button,
  HugoUIButtonCommonProps,
  HugoUIPrimaryButtonProps,
  HugoUISecondaryButtonProps,
  HugoUITertiaryButtonProps,
  HugoUIDestructButtonProps,
  HugoUIButtonProps,
} from 'hugo-ui';
import { hideAttributes, groupArgs } from './utils';
import { StyledColumn, StyledRow } from './assets/styles';

const channel = addons.getChannel();

const backgroundColors = {
  light: { name: 'light', value: '#FFF' },
  dark: { name: 'dark', value: '#444' },
};

// const lightBG = { default: 'light', values: [backgroundColors.light] }
const darkBG = { default: 'dark', values: [backgroundColors.dark] };

type StoryArgsUpdate = {
  storyId: string;
  args: Partial<HugoUIButtonProps>;
};

// dynamically set the background according to button args
const storyArgsListener = (args: StoryArgsUpdate) => {
  if (args.args.level && (args.storyId.includes('default') || args.storyId.includes('sizes'))) {
    const level = args.args.level;
    const style = args.args.drawingStyle;
    const color = args.args.colorTheme;
    let backgrounds = backgroundColors.light;
    if (
      (level === 'primary' && style === 'filled' && color === 'white') ||
      (level === 'secondary' && style === 'outlined' && color === 'white') ||
      (level === 'tertiary' && style === 'text' && color === 'white')
    ) {
      backgrounds = backgroundColors.dark;
    }

    channel.emit(UPDATE_GLOBALS, {
      globals: {
        backgrounds,
      },
    });
  }
};

const setupBackgroundListener = () => {
  channel.removeListener(STORY_ARGS_UPDATED, storyArgsListener);
  channel.addListener(STORY_ARGS_UPDATED, storyArgsListener);
};

setupBackgroundListener();

const hiddenKeys = [
  'classes',
  'action',
  'centerRipple',
  'disableRipple',
  'disableTouchRipple',
  'disableFocusRipple',
  'disableElevation',
  'focusRipple',
  'focusVisibleClassName',
  'onFocusVisible',
  'LinkComponent',
  'TouchRippleProps',
  'touchRippleRef',
  'sx',
  'ref',
];

export default {
  title: 'HugoUI/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    pseudo: {
      hover: ['#hover'],
      active: ['#active'],
    },
    backgrounds: {
      default: 'light',
      values: [backgroundColors.light, backgroundColors.dark],
    },
    jest: ['button.test.js'],
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            // selector: '*:not(.HugoUILink-disabled)',
            // Background changing delays and is causing this to fail
            reviewOnFail: true,
          },
        ],
      },
    },
  },
  argTypes: {
    ...groupArgs(['children', 'labelHidden'], 'Content'),
    ...groupArgs(['fullWidth'], 'Style'),
    ...groupArgs(['loading', 'disabled'], 'Status'),
    children: {
      description: 'The button label content.',
      table: {
        category: 'Content',
      },
    },
    labelHidden: {
      description:
        'Hide the visible label (icon-only button). When true, the label is used for aria-label.',
      control: 'boolean',
      table: {
        category: 'Content',
      },
    },
    loading: {
      description:
        'Show loading indicator and mark the button as busy; click is disabled while loading.',
      control: 'boolean',
      table: {
        category: 'Status',
      },
    },
    disabled: {
      description: 'Disable the button and remove it from the tab order.',
      control: 'boolean',
      table: {
        category: 'Status',
      },
    },
    fullWidth: {
      description: 'Stretch the button to fill its container width.',
      control: 'boolean',
      table: {
        category: 'Style',
      },
    },
    className: {
      description: 'The CSS class name of the root element',
      control: 'text',
      table: {
        category: 'Basic',
      },
    },
    level: {
      description: 'Visual hierarchy of the button.',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      table: {
        category: 'Style',
      },
    },
    drawingStyle: {
      description: 'Visual style of the button surface.',
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      table: {
        category: 'Style',
      },
    },
    colorTheme: {
      description: 'Color scheme of the button.',
      control: 'select',
      options: ['purple', 'white', 'red', 'grey'],
      table: {
        category: 'Style',
      },
    },
    size: {
      description: 'Size variant of the button.',
      control: 'select',
      options: ['small', 'medium', 'large'],
      table: {
        category: 'Style',
      },
    },
    type: {
      description:
        'The type of the button; the default button type is for a basic clickable button that does an interaction, a submit type submits form data, a reset type resets form data',
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: {
        category: 'Basic',
      },
    },
    startIcon: {
      description: 'Icon displayed before the label.',
      control: {
        disable: true,
      },
      table: {
        category: 'Content',
      },
    },
    endIcon: {
      description: 'Icon displayed after the label.',
      control: {
        disable: true,
      },
      table: {
        category: 'Content',
      },
    },
    href: {
      description: 'When provided, renders the button as a link.',
      control: 'text',
      table: {
        category: 'Link',
      },
    },
    target: {
      description: 'Specifies where to open the linked document.',
      control: 'text',
      table: {
        category: 'Link',
      },
    },
    rel: {
      description:
        'Specifies the relationship between the current document and the linked document.',
      control: 'text',
      table: {
        category: 'Link',
      },
    },
    onClick: {
      description: 'The click handler of the button',
      action: 'clicked',
      table: {
        category: 'Basic',
      },
    },
    id: {
      description: 'The id attribute of the root element.',
      control: 'text',
      table: {
        category: 'Basic',
      },
    },
    style: {
      description: 'Inline styles applied to the root element.',
      control: 'object',
      table: {
        category: 'Basic',
      },
    },
    component: {
      description: 'Override the root element type.',
      control: {
        disable: true,
      },
      table: {
        category: 'Basic',
      },
    },
    tabIndex: {
      description:
        'Number indicating the tab order of the component; set to -1 to remove from tab order',
      control: 'number',
      table: {
        category: 'Basic',
      },
    },
    loadingPosition: {
      description: 'Position of the loading indicator when loading is true.',
      control: 'select',
      options: ['start', 'center'],
      table: {
        category: 'Content',
      },
    },
    ...hideAttributes(hiddenKeys),
  },
} as Meta<typeof Button>;

const StateTemplate: StoryFn<typeof Button> = (args) => (
  <div style={StyledColumn}>
    <div style={StyledRow}>
      <Button {...args}>Rest</Button>
      <Button {...args} id="hover">
        Hover
      </Button>
      <Button {...args} id="focus">
        Focus
      </Button>
      <Button {...args} id="active">
        Pressed
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
  </div>
);

const buttonGrid = { display: 'flex', flexGrow: 1, justifyContent: 'center' };

const ButtonTemplate = (args: HugoUIButtonProps) => (
  <div>
    <Button {...args}>{args.children || 'Button'}</Button>
  </div>
);

const SizeTemplate: StoryFn<typeof Button> = (args) => {
  return (
    <div style={StyledColumn}>
      <div style={StyledRow}>
        <div style={buttonGrid}>
          <Button {...args} size="large">
            Button Large
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="medium">
            Button Medium
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="small">
            Button Small
          </Button>
        </div>
      </div>
      <div style={StyledRow}>
        <div style={buttonGrid}>
          <Button {...args} size="large" loading={true}>
            Start Loading Large
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="medium" loading={true}>
            Start Loading Medium
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="small" loading={true}>
            Start Loading Small
          </Button>
        </div>
      </div>
      <div style={StyledRow}>
        <div style={buttonGrid}>
          <Button {...args} size="large" loading={true} loadingPosition="center">
            Center Loading Large
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="medium" loading={true} loadingPosition="center">
            Center Loading Medium
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="small" loading={true} loadingPosition="center">
            Center Loading Small
          </Button>
        </div>
      </div>
      <div style={StyledRow}>
        <div style={buttonGrid}>
          <Button {...args} size="large" startIcon={<CheckCircleIcon fontSize="large" />}>
            Left Icon Large
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="medium" startIcon={<CheckCircleIcon fontSize="medium" />}>
            Left Icon Medium
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="small" startIcon={<CheckCircleIcon fontSize="small" />}>
            Left Icon Small
          </Button>
        </div>
      </div>
      <div style={StyledRow}>
        <div style={buttonGrid}>
          <Button {...args} size="large" endIcon={<CloseIcon fontSize="large" />}>
            Right Icon Large
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="medium" endIcon={<CloseIcon fontSize="medium" />}>
            Right Icon Medium
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button {...args} size="small" endIcon={<CloseIcon fontSize="small" />}>
            Right Icon Small
          </Button>
        </div>
      </div>
      <div style={StyledRow}>
        <div style={buttonGrid}>
          <Button
            {...args}
            size="large"
            startIcon={<CheckCircleIcon fontSize="large" />}
            labelHidden
          >
            Completed
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button
            {...args}
            size="medium"
            startIcon={<CheckCircleIcon fontSize="large" />}
            labelHidden
          >
            Completed
          </Button>
        </div>
        <div style={buttonGrid}>
          <Button
            {...args}
            size="small"
            startIcon={<CheckCircleIcon fontSize="large" />}
            labelHidden
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

const defaultCommonArgs: HugoUIButtonCommonProps = {
  size: 'medium',
  type: 'button',
  loading: false,
  disabled: false,
  labelHidden: false,
  tabIndex: 0,
  fullWidth: false,
};

// disabled argTypes for size and state stories
const disabledArgTypes = hideAttributes(['children']);

/** Primary Buttons */
const primaryArgTypes = {
  level: {
    table: {
      disable: true,
    },
  },
  drawingStyle: {
    control: 'select',
    options: ['filled'],
  },
  colorTheme: {
    control: 'select',
    options: ['purple', 'white'],
  },
};

const primaryDefaultArgs: HugoUIPrimaryButtonProps = {
  level: 'primary',
  drawingStyle: 'filled',
  colorTheme: 'purple',
  ...defaultCommonArgs,
};

export const PrimaryDefault: StoryFn<HugoUIPrimaryButtonProps> = (args) => {
  return <ButtonTemplate {...args} />;
};
PrimaryDefault.argTypes = primaryArgTypes;
PrimaryDefault.args = {
  ...primaryDefaultArgs,
};
PrimaryDefault.parameters = {
  chromatic: { disableSnapshot: true },
};

export const PrimaryAllSizes = SizeTemplate.bind({});
PrimaryAllSizes.argTypes = { ...primaryArgTypes, ...disabledArgTypes, ...hideAttributes(['size']) };
PrimaryAllSizes.args = {
  ...primaryDefaultArgs,
};

export const PrimaryLight = StateTemplate.bind({});
PrimaryLight.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['primary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['filled'],
  },
  colorTheme: {
    control: 'select',
    options: ['purple'],
  },
};
PrimaryLight.args = {
  ...primaryDefaultArgs,
};
PrimaryLight.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

export const PrimaryDark = StateTemplate.bind({});
PrimaryDark.parameters = {
  backgrounds: darkBG,
};
PrimaryDark.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['primary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['filled'],
  },
  colorTheme: {
    control: 'select',
    options: ['white'],
  },
};
PrimaryDark.args = {
  ...primaryDefaultArgs,
  colorTheme: 'white',
};
PrimaryDark.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

/** Secondary Buttons */
const secondaryArgTypes = {
  level: {
    table: {
      disable: true,
    },
  },
  drawingStyle: {
    control: 'select',
    options: ['outlined'],
  },
  colorTheme: {
    control: 'select',
    options: ['purple', 'grey', 'white'],
  },
};

const secondaryDefaultArgs: HugoUISecondaryButtonProps = {
  level: 'secondary',
  drawingStyle: 'outlined',
  colorTheme: 'purple',
  ...defaultCommonArgs,
};

export const SecondaryDefault: StoryFn<HugoUISecondaryButtonProps> = (args) => {
  return <ButtonTemplate {...args} />;
};
SecondaryDefault.argTypes = secondaryArgTypes;
SecondaryDefault.args = {
  ...secondaryDefaultArgs,
};
SecondaryDefault.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SecondaryAllSizes = SizeTemplate.bind({});
SecondaryAllSizes.argTypes = {
  ...secondaryArgTypes,
  ...disabledArgTypes,
  ...hideAttributes(['size']),
};
SecondaryAllSizes.args = {
  ...secondaryDefaultArgs,
};

export const SecondaryPurpleOutlined = StateTemplate.bind({});
SecondaryPurpleOutlined.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['secondary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['outlined'],
  },
  colorTheme: {
    control: 'select',
    options: ['purple'],
  },
};
SecondaryPurpleOutlined.args = {
  ...secondaryDefaultArgs,
};
SecondaryPurpleOutlined.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

export const SecondaryGreyOutlined = StateTemplate.bind({});
SecondaryGreyOutlined.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['secondary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['outlined'],
  },
  colorTheme: {
    control: 'select',
    options: ['grey'],
  },
};
SecondaryGreyOutlined.args = {
  ...secondaryDefaultArgs,
  colorTheme: 'grey',
};
SecondaryGreyOutlined.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

export const SecondaryWhiteOutlined = StateTemplate.bind({});
SecondaryWhiteOutlined.parameters = {
  backgrounds: darkBG,
};
SecondaryWhiteOutlined.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['secondary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['outlined'],
  },
  colorTheme: {
    control: 'select',
    options: ['white'],
  },
};
SecondaryWhiteOutlined.args = {
  ...secondaryDefaultArgs,
  colorTheme: 'white',
};
SecondaryWhiteOutlined.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

/** Tertiary Buttons */
const tertiaryArgTypes = {
  level: {
    table: {
      disable: true,
    },
  },
  drawingStyle: {
    control: 'select',
    options: ['text'],
  },
  colorTheme: {
    control: 'select',
    options: ['purple', 'grey', 'white'],
  },
};

const tertiaryDefaultArgs: HugoUITertiaryButtonProps = {
  level: 'tertiary',
  drawingStyle: 'text',
  colorTheme: 'purple',
  ...defaultCommonArgs,
};

export const TertiaryDefault: StoryFn<HugoUITertiaryButtonProps> = (args) => {
  return <ButtonTemplate {...args} />;
};
TertiaryDefault.argTypes = tertiaryArgTypes;
TertiaryDefault.args = {
  ...tertiaryDefaultArgs,
};
TertiaryDefault.parameters = {
  chromatic: { disableSnapshot: true },
};

export const TertiaryAllSizes = SizeTemplate.bind({});
TertiaryAllSizes.argTypes = {
  ...tertiaryArgTypes,
  ...disabledArgTypes,
  ...hideAttributes(['size']),
};
TertiaryAllSizes.args = {
  ...tertiaryDefaultArgs,
};

export const TertiaryPurple = StateTemplate.bind({});
TertiaryPurple.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['tertiary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['text'],
  },
  colorTheme: {
    control: 'select',
    options: ['purple'],
  },
};
TertiaryPurple.args = {
  ...tertiaryDefaultArgs,
};
TertiaryPurple.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

export const TertiaryGrey = StateTemplate.bind({});
TertiaryGrey.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['tertiary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['text'],
  },
  colorTheme: {
    control: 'select',
    options: ['grey'],
  },
};
TertiaryGrey.args = {
  ...tertiaryDefaultArgs,
  colorTheme: 'grey',
};
TertiaryGrey.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

export const TertiaryWhite = StateTemplate.bind({});
TertiaryWhite.parameters = {
  backgrounds: darkBG,
};
TertiaryWhite.argTypes = {
  ...disabledArgTypes,
  level: {
    control: 'select',
    options: ['tertiary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['text'],
  },
  colorTheme: {
    control: 'select',
    options: ['white'],
  },
};
TertiaryWhite.args = {
  ...tertiaryDefaultArgs,
  colorTheme: 'white',
};
TertiaryWhite.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

/** Destruct Button */
const destructArgTypes = {
  level: {
    control: 'select',
    options: ['primary'],
  },
  drawingStyle: {
    control: 'select',
    options: ['filled'],
  },
  colorTheme: {
    control: 'select',
    options: ['red'],
  },
};

const destructDefaultArgs: HugoUIDestructButtonProps = {
  level: 'primary',
  drawingStyle: 'filled',
  colorTheme: 'red',
  ...defaultCommonArgs,
};

export const DestructDefault: StoryFn<HugoUIDestructButtonProps> = (args) => (
  <ButtonTemplate {...args} />
);
DestructDefault.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/pAIJ6tkYEtUPRkxjiiwjd9/DS---Buttons?type=design&node-id=1433%3A4517&mode=design&t=MCz8QEgBM64U1IbX-1',
  },
};
DestructDefault.argTypes = destructArgTypes;
DestructDefault.args = {
  ...destructDefaultArgs,
};
DestructDefault.parameters = {
  chromatic: { disableSnapshot: true },
};

export const DestructAllSizes = SizeTemplate.bind({});
DestructAllSizes.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/pAIJ6tkYEtUPRkxjiiwjd9/DS---Buttons?type=design&node-id=1433%3A4517&mode=design&t=MCz8QEgBM64U1IbX-1',
  },
};
DestructAllSizes.argTypes = {
  ...destructArgTypes,
  ...disabledArgTypes,
  ...hideAttributes(['size']),
};
DestructAllSizes.args = {
  ...destructDefaultArgs,
};

export const DestructStates = StateTemplate.bind({});
DestructStates.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/pAIJ6tkYEtUPRkxjiiwjd9/DS---Buttons?type=design&node-id=1433%3A4517&mode=design&t=MCz8QEgBM64U1IbX-1',
  },
};
DestructStates.argTypes = { ...destructArgTypes, ...disabledArgTypes };
DestructStates.args = {
  ...destructDefaultArgs,
};
DestructStates.play = async () => {
  await waitFor(() => {
    document.getElementById('focus')?.focus();
  });
};

export const ButtonLoading: StoryFn<typeof Button> = (args) => {
  const [startLoading, setStartLoading] = useState(false);
  const [centerLoading, setCenterLoading] = useState(false);

  const StyleLoadingButtonRow = {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    paddingBottom: 10,
  };

  const StyleLoadingButtonRowLabel = {
    width: 150,
  };

  return (
    <div style={StyledColumn}>
      <div style={StyleLoadingButtonRow}>
        <div style={StyleLoadingButtonRowLabel}>Start Loading:</div>
        <Button
          {...args}
          loading={startLoading}
          onClick={() => {
            {
              setStartLoading(true);
              setTimeout(() => {
                setStartLoading(false);
              }, 3000);
            }
          }}
        >
          {startLoading ? 'Loading users' : 'Load users'}
        </Button>
      </div>
      <div style={StyleLoadingButtonRow}>
        <div style={StyleLoadingButtonRowLabel}>Center Loading:</div>
        <Button
          {...args}
          loading={centerLoading}
          loadingPosition="center"
          onClick={() => {
            {
              setCenterLoading(true);
              setTimeout(() => {
                setCenterLoading(false);
              }, 3000);
            }
          }}
        >
          {centerLoading ? 'Loading users' : 'Load users'}
        </Button>
      </div>
    </div>
  );
};
ButtonLoading.argTypes = {
  ...disabledArgTypes,
  ...hideAttributes(['loading', 'loadingPosition']),
};
ButtonLoading.parameters = {
  chromatic: { disableSnapshot: true },
};
