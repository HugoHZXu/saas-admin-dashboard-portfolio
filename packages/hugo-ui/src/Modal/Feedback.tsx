import React from 'react';
import { HugoUIMessage } from '../Message';
import { HugoUIBaseProps } from '../types/base';
import type { ElementType } from 'react';

export interface HugoUIFeedbackMessageType {
  /**
   * The type of the message
   */
  type: 'success' | 'destructiveSuccess' | 'error';
  /**
   * The message to display
   */
  message: React.ReactNode;
  /**
   * The description of the message
   */
  description?: React.ReactNode;
  /**
   * default component type is p, if the description is more complex component, allow user to change the component type
   */
  descriptonComponentType?: ElementType;
}

export interface HugoUIFeedbackProps extends HugoUIBaseProps {
  messages?: HugoUIFeedbackMessageType[];
  fullScreen?: boolean;
}

export const HugoUIFeedback = ({ messages = [], fullScreen }: HugoUIFeedbackProps) => {
  const renderContent = () => {
    const isMixed = messages.length > 1;
    return messages.map((v, i) => {
      return (
        <HugoUIMessage
          style={{ marginBottom: i < messages.length - 1 ? 16 : 0 }}
          key={i}
          type={v.type}
          // multiple message will not have a title
          isHeader={isMixed ? false : true}
          size={isMixed ? 'medium' : 'large'}
          align={!!v.description || isMixed || fullScreen ? 'left' : 'center'}
          extraText={v.description}
          extraTextComponentType={v.descriptonComponentType}
        >
          {v.message}
        </HugoUIMessage>
      );
    });
  };
  return <>{renderContent()}</>;
};
