import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import classnames from 'classnames';
import { ContentTemplateRoot } from './templateStyles';
import { CONTENT_TEMPLATE_ROOT_PREFIX } from './templateTokens';

export type HugoUIContentTemplateType = 'card' | 'table' | 'error' | 'full';

export type HugoUIContentTemplateProps = React.HTMLAttributes<HTMLDivElement> & {
  type: HugoUIContentTemplateType;
  pageTitle?: React.ReactNode;
  titleInfo?: React.ReactNode;
  actionItems?: React.ReactNode;
  onBack?: () => void;
  children?: React.ReactNode;
  errorMessage?: React.ReactNode;
};

const ROOT_PREFIX = CONTENT_TEMPLATE_ROOT_PREFIX;

export function HugoUIContentTemplate({
  type,
  pageTitle,
  titleInfo,
  actionItems,
  onBack,
  children,
  errorMessage,
  className,
  ...rest
}: HugoUIContentTemplateProps) {
  return (
    <ContentTemplateRoot
      {...rest}
      className={classnames(`${ROOT_PREFIX}-root`, `${ROOT_PREFIX}-${type}`, className)}
    >
      {(pageTitle || titleInfo || actionItems || onBack) && (
        <header className={`${ROOT_PREFIX}-header`}>
          <Box className={`${ROOT_PREFIX}-headingGroup`}>
            <Box className={`${ROOT_PREFIX}-titleRow`}>
              {onBack && (
                <IconButton
                  className={`${ROOT_PREFIX}-backButton`}
                  aria-label="Back"
                  size="small"
                  onClick={onBack}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              )}
              {pageTitle && <h2 className={`${ROOT_PREFIX}-pageTitle`}>{pageTitle}</h2>}
            </Box>
            {titleInfo && <p className={`${ROOT_PREFIX}-titleInfo`}>{titleInfo}</p>}
          </Box>
          {actionItems && <div className={`${ROOT_PREFIX}-actions`}>{actionItems}</div>}
        </header>
      )}
      <section className={`${ROOT_PREFIX}-body`}>
        {type === 'error' ? (
          <div className={`${ROOT_PREFIX}-errorContent`}>
            {children}
            {errorMessage && <p className={`${ROOT_PREFIX}-errorMessage`}>{errorMessage}</p>}
          </div>
        ) : (
          children
        )}
      </section>
    </ContentTemplateRoot>
  );
}
