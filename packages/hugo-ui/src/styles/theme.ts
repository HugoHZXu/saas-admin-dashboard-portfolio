import { createTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
import {
  ALERT,
  BLUE,
  DARK_PURPLE,
  DESTRUCT_STATE_1,
  DESTRUCT_STATE_2,
  ERROR_BG,
  ERROR_OR_DESTRUCT,
  LAVENDER,
  LIGHT_PURPLE,
  MID_PURPLE,
  NEUTRAL_DARK_GREY,
  NEUTRAL_DARK_PLUM,
  NEUTRAL_GREY_1100,
  NEUTRAL_GREY_1200,
  NEUTRAL_GREY_200,
  NEUTRAL_GREY_500,
  NEUTRAL_GREY_600,
  NEUTRAL_GREY_800,
  NEUTRAL_LIGHT_GREY,
  NEUTRAL_LIGHT_PLUM,
  NEUTRAL_MID_GREY,
  NEUTRAL_PLUM,
  NEUTRAL_WHITE,
  PLUM_100,
  PURPLE_GRAPE,
  PURPLE_PLUM,
  SUCCESS_GREEN,
  SUCCESS_GREEN_BG,
  TEXT,
  TEXT_HEADER,
} from './color';
import {
  FONT_FAMILY,
  TYPOGRAPHY_BODY,
  TYPOGRAPHY_BODY_LINK,
  TYPOGRAPHY_BUTTON,
  TYPOGRAPHY_BUTTON_UPPERCASE,
  TYPOGRAPHY_EYEBROW,
  TYPOGRAPHY_EYEBROW_UPPERCASE,
  TYPOGRAPHY_H1,
  TYPOGRAPHY_H2,
  TYPOGRAPHY_H3,
  TYPOGRAPHY_H4,
  TYPOGRAPHY_H5,
  TYPOGRAPHY_SMALL_TEXT,
  TYPOGRAPHY_SMALL_TEXT_UPPERCASE,
  TYPOGRAPHY_SUBTITLE_01,
  TYPOGRAPHY_SUBTITLE_02,
  TYPOGRAPHY_SUBTITLE_03,
  TYPOGRAPHY_SUBTITLE_04,
} from './typography';
import { hugoUIColorRoles, HugoUIColorRoles } from './colorRoles';
import {
  HEAVY_SHADOW,
  HEAVY_SHADOW_UP,
  INNER_SHADOW,
  LIGHT_SHADOW,
  MEDIUM_SHADOW,
  NO_SHADOW,
} from './elevation';

export * from './color';
export * from './colorRoles';
export * from './typography';
export * from './elevation';

declare module '@mui/material/styles' {
  interface Theme {
    hugoUITypography: {
      h1: CSSProperties;
      h2: CSSProperties;
      h3: CSSProperties;
      h4: CSSProperties;
      h5: CSSProperties;
      subtitle1: CSSProperties;
      subtitle2: CSSProperties;
      subtitle3: CSSProperties;
      subtitle4: CSSProperties;
      body: CSSProperties;
      bodyLink: CSSProperties;
      button: {
        base: CSSProperties;
        uppercase: CSSProperties;
        small: CSSProperties;
      };
      smallText: {
        base: CSSProperties;
        uppercase: CSSProperties;
      };
      eyebrow: {
        base: CSSProperties;
        uppercase: CSSProperties;
      };
    };
    hugoUIColors: {
      DARK_PURPLE: string;
      MID_PURPLE: string;
      PURPLE_GRAPE: string;
      PURPLE_PLUM: string;
      LAVENDER: string;
      LIGHT_PURPLE: string;
      SUCCESS_GREEN: string;
      SUCCESS_GREEN_BG: string;
      ERROR_OR_DESTRUCT: string;
      DESTRUCT_STATE_1: string;
      DESTRUCT_STATE_2: string;
      ERROR_BG: string;
      BLUE: string;
      ALERT: string;
      NEUTRAL_PLUM: string;
      NEUTRAL_LIGHT_PLUM: string;
      NEUTRAL_DARK_PLUM: string;
      NEUTRAL_DARK_GREY: string;
      NEUTRAL_MID_GREY: string;
      NEUTRAL_LIGHT_GREY: string;
      NEUTRAL_WHITE: string;
      TEXT_HEADER: string;
      TEXT: string;
      NEUTRAL_GREY_200: string;
      NEUTRAL_GREY_500: string;
      NEUTRAL_GREY_600: string;
      NEUTRAL_GREY_800: string;
      NEUTRAL_GREY_1100: string;
      NEUTRAL_GREY_1200: string;
      PLUM_100: string;
    };
    hugoUISpacer: {
      SPACER_XS: string;
      SPACER_SM: string;
      SPACER_MD: string;
      SPACER_LG: string;
      SPACER_XL: string;
      SPACER_2XL: string;
      SPACER_3XL: string;
      SPACER_4XL: string;
      SPACER_5XL: string;
      SPACER_6XL: string;
    };
    hugoUIShadows: {
      NO_SHADOW: { boxShadow: string };
      INNER_SHADOW: { boxShadow: string };
      LIGHT_SHADOW: { boxShadow: string };
      MEDIUM_SHADOW: { boxShadow: string };
      HEAVY_SHADOW: { boxShadow: string };
      HEAVY_SHADOW_UP: { boxShadow: string };
    };
    hugoUIColorRoles: HugoUIColorRoles;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    hugoUITypography?: {
      h1?: CSSProperties;
      h2?: CSSProperties;
      h3?: CSSProperties;
      h4?: CSSProperties;
      h5?: CSSProperties;
      subtitle1?: CSSProperties;
      subtitle2?: CSSProperties;
      subtitle3?: CSSProperties;
      subtitle4?: CSSProperties;
      body?: CSSProperties;
      bodyLink?: CSSProperties;
      button?: {
        base?: CSSProperties;
        uppercase?: CSSProperties;
        small?: CSSProperties;
      };
      smallText?: {
        base?: CSSProperties;
        uppercase?: CSSProperties;
      };
      eyebrow?: {
        base?: CSSProperties;
        uppercase?: CSSProperties;
      };
    };
    hugoUIColors?: {
      DARK_PURPLE?: string;
      MID_PURPLE?: string;
      PURPLE_GRAPE?: string;
      PURPLE_PLUM?: string;
      LAVENDER?: string;
      LIGHT_PURPLE?: string;
      SUCCESS_GREEN?: string;
      SUCCESS_GREEN_BG?: string;
      ERROR_OR_DESTRUCT?: string;
      DESTRUCT_STATE_1?: string;
      DESTRUCT_STATE_2?: string;
      ERROR_BG?: string;
      BLUE?: string;
      ALERT?: string;
      NEUTRAL_PLUM?: string;
      NEUTRAL_LIGHT_PLUM?: string;
      NEUTRAL_DARK_PLUM?: string;
      NEUTRAL_DARK_GREY?: string;
      NEUTRAL_MID_GREY?: string;
      NEUTRAL_LIGHT_GREY?: string;
      NEUTRAL_WHITE?: string;
      TEXT_HEADER?: string;
      TEXT?: string;
      NEUTRAL_GREY_200?: string;
      NEUTRAL_GREY_500?: string;
      NEUTRAL_GREY_600?: string;
      NEUTRAL_GREY_800?: string;
      NEUTRAL_GREY_1100?: string;
      NEUTRAL_GREY_1200?: string;
      PLUM_100?: string;
    };
    hugoUISpacer?: {
      SPACER_XS?: string;
      SPACER_SM?: string;
      SPACER_MD?: string;
      SPACER_LG?: string;
      SPACER_XL?: string;
      SPACER_2XL?: string;
      SPACER_3XL?: string;
      SPACER_4XL?: string;
      SPACER_5XL?: string;
      SPACER_6XL?: string;
    };
    hugoUIShadows?: {
      NO_SHADOW?: { boxShadow: string };
      INNER_SHADOW?: { boxShadow: string };
      LIGHT_SHADOW?: { boxShadow: string };
      MEDIUM_SHADOW?: { boxShadow: string };
      HEAVY_SHADOW?: { boxShadow: string };
      HEAVY_SHADOW_UP?: { boxShadow: string };
    };
    hugoUIColorRoles?: HugoUIColorRoles;
  }
}

export const hugoUITheme = createTheme({
  hugoUITypography: {
    h1: TYPOGRAPHY_H1,
    h2: TYPOGRAPHY_H2,
    h3: TYPOGRAPHY_H3,
    h4: TYPOGRAPHY_H4,
    h5: TYPOGRAPHY_H5,
    subtitle1: TYPOGRAPHY_SUBTITLE_01,
    subtitle2: TYPOGRAPHY_SUBTITLE_02,
    subtitle3: TYPOGRAPHY_SUBTITLE_03,
    subtitle4: TYPOGRAPHY_SUBTITLE_04,
    body: TYPOGRAPHY_BODY,
    bodyLink: TYPOGRAPHY_BODY_LINK,
    button: {
      base: {
        ...TYPOGRAPHY_BUTTON,
        whiteSpace: 'nowrap',
      },
      uppercase: TYPOGRAPHY_BUTTON_UPPERCASE,
      small: {
        fontSize: 12,
        lineHeight: '16px',
        fontWeight: 600,
        letterSpacing: 'normal',
        fontFamily: FONT_FAMILY,
        color: TEXT,
      },
    },
    smallText: {
      base: TYPOGRAPHY_SMALL_TEXT,
      uppercase: TYPOGRAPHY_SMALL_TEXT_UPPERCASE,
    },
    eyebrow: {
      base: TYPOGRAPHY_EYEBROW,
      uppercase: TYPOGRAPHY_EYEBROW_UPPERCASE,
    },
  },
  hugoUIColors: {
    /** Primary Colors */
    DARK_PURPLE,
    MID_PURPLE,
    PURPLE_GRAPE,
    PURPLE_PLUM,
    LAVENDER,
    LIGHT_PURPLE,
    /** ADDITIONAL COLORS */
    SUCCESS_GREEN,
    SUCCESS_GREEN_BG,
    ERROR_OR_DESTRUCT,
    DESTRUCT_STATE_1,
    DESTRUCT_STATE_2,
    ERROR_BG,
    BLUE,
    ALERT,
    /** NEUTRAL COLORS */
    NEUTRAL_PLUM,
    NEUTRAL_LIGHT_PLUM,
    NEUTRAL_DARK_PLUM,
    NEUTRAL_DARK_GREY,
    NEUTRAL_MID_GREY,
    NEUTRAL_LIGHT_GREY,
    NEUTRAL_WHITE,
    /** TEXT COLORS */
    TEXT_HEADER,
    TEXT,
    NEUTRAL_GREY_200,
    NEUTRAL_GREY_500,
    NEUTRAL_GREY_600,
    NEUTRAL_GREY_800,
    NEUTRAL_GREY_1100,
    NEUTRAL_GREY_1200,
    PLUM_100,
  },
  hugoUISpacer: {
    SPACER_XS: '4px',
    SPACER_SM: '8px',
    SPACER_MD: '16px',
    SPACER_LG: '24px',
    SPACER_XL: '32px',
    SPACER_2XL: '40px',
    SPACER_3XL: '48px',
    SPACER_4XL: '56px',
    SPACER_5XL: '64px',
    SPACER_6XL: '80px',
  },
  hugoUIShadows: {
    NO_SHADOW,
    INNER_SHADOW,
    LIGHT_SHADOW,
    MEDIUM_SHADOW,
    HEAVY_SHADOW,
    HEAVY_SHADOW_UP,
  },
  hugoUIColorRoles,
});
