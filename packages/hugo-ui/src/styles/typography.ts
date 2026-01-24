import { TEXT } from './color';

export const FONT_FAMILY = "'Noto Sans', sans-serif, BlinkMacSystemFont, system-ui, -apple-system";

export const TYPOGRAPHY_BODY = {
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 400,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_BUTTON = {
  fontSize: 14,
  lineHeight: '19px',
  fontWeight: 600,
  letterSpacing: '0.02em',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_BUTTON_SMALL = {
  fontSize: 12,
  lineHeight: '16px',
  fontWeight: 600,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_SMALL_TEXT = {
  fontSize: 12,
  lineHeight: '20px',
  fontWeight: 400,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_BODY_LINK = {
  ...TYPOGRAPHY_BODY,
  textDecoration: 'underline',
  cursor: 'pointer',
};

export const TYPOGRAPHY_SMALL_TEXT_LINK = {
  ...TYPOGRAPHY_SMALL_TEXT,
  textDecoration: 'underline',
  cursor: 'pointer',
};

export const TYPOGRAPHY_EYEBROW = {
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '16px',
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_H1 = {
  fontSize: 72,
  lineHeight: '88px',
  fontWeight: 300,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_H2 = {
  fontSize: 48,
  lineHeight: '56px',
  fontWeight: 300,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_H3 = {
  fontSize: 32,
  lineHeight: '40px',
  fontWeight: 400,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_H4 = {
  fontSize: 24,
  lineHeight: '32px',
  fontWeight: 400,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_H5 = {
  fontSize: 20,
  lineHeight: '24px',
  fontWeight: 400,
  letterSpacing: '0.02em',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_SUBTITLE_01 = {
  fontSize: 18,
  lineHeight: '24px',
  fontWeight: 400,
  letterSpacing: '0.02em',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_SUBTITLE_02 = {
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 400,
  letterSpacing: '0.02em',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_SUBTITLE_03 = {
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_SUBTITLE_04 = {
  fontSize: 14,
  lineHeight: '24px',
  fontWeight: 400,
  letterSpacing: '0.01em',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const TYPOGRAPHY_BUTTON_UPPERCASE = {
  ...TYPOGRAPHY_BUTTON,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
};

export const TYPOGRAPHY_SMALL_TEXT_UPPERCASE = {
  ...TYPOGRAPHY_SMALL_TEXT,
  letterSpacing: '0.02em',
  textTransform: 'uppercase',
};

export const TYPOGRAPHY_EYEBROW_UPPERCASE = {
  ...TYPOGRAPHY_EYEBROW,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
};
