import { AriaAttributes, AriaRole, CSSProperties, KeyboardEventHandler } from 'react';

export interface HugoUIBaseProps {
  /**
   * The direction of the component
   */
  isRtl?: boolean;
  /**
   * The id of the component
   */
  id?: string;
  /**
   * The class name of the component
   */
  className?: string;
  /**
   * The style of the component
   */
  style?: CSSProperties;
}

export interface HugoUIAccessProps {
  /**
   * The aria role of the root element
   */
  role?: AriaRole;
  /**
   * The tabIndex of the root element
   */
  tabIndex?: number;
  /**
   * The aria-label of the root element
   */
  label?: string;
  /**
   * Individually set aria props of the root element
   */
  ariaProps?: AriaAttributes;
  /**
   * Custom overrides of keypress callbacks
   */
  keypressProps?: {
    onKeyDown?: KeyboardEventHandler;
    onKeyUp?: KeyboardEventHandler;
  };
}
