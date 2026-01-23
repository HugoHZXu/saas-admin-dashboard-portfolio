import { createTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';

export const TEXT = '#49494C';
export const FONT_FAMILY = "'Noto Sans', sans-serif, BlinkMacSystemFont, system-ui, -apple-system";

export const DARK_PURPLE = '#350B59';
export const MID_PURPLE = '#5D3C7A';
export const PURPLE_GRAPE = '#7D3F98';
export const PURPLE_PLUM = '#9955C6';
export const LAVENDER = '#DA99FF';
export const LIGHT_PURPLE = '#EED3FF';
export const SUCCESS_GREEN = '#008805';
export const SUCCESS_GREEN_BG = '#F2FAF3';
export const ERROR_OR_DESTRUCT = '#CB2A2A';
export const DESTRUCT_STATE_1 = '#982020';
export const DESTRUCT_STATE_2 = '#651515';
export const ERROR_BG = '#FCF4F4';
export const BLUE = '#1573D4';
export const ALERT = '#EB6A00';
export const NEUTRAL_PLUM = '#F6F1FF';
export const NEUTRAL_LIGHT_PLUM = '#F4F2F6';
export const NEUTRAL_DARK_PLUM = '#A19ABA';
export const NEUTRAL_DARK_GREY = '#CCCCCC';
export const NEUTRAL_MID_GREY = '#F2F2F2';
export const NEUTRAL_LIGHT_GREY = '#FAFAFA';
export const NEUTRAL_WHITE = '#FFFFFF';
export const TEXT_HEADER = '#282036';

export const NEUTRAL_GREY_200 = '#F2F2F2';
export const NEUTRAL_GREY_500 = '#E0E0E0';
export const NEUTRAL_GREY_600 = '#C8C8C8';
export const NEUTRAL_GREY_800 = '#9E9E9E';
export const NEUTRAL_GREY_1100 = '#5C5C5C';
export const NEUTRAL_GREY_1200 = '#3D3D3D';
export const PLUM_100 = '#F6F1FF';

const TYPOGRAPHY_BODY = {
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

const TYPOGRAPHY_SMALL_TEXT = {
  fontSize: 12,
  lineHeight: '20px',
  fontWeight: 400,
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

const TYPOGRAPHY_EYEBROW = {
  fontSize: 10,
  fontWeight: 400,
  lineHeight: '16px',
  letterSpacing: 'normal',
  fontFamily: FONT_FAMILY,
  color: TEXT,
};

export const NO_SHADOW = {
  boxShadow: 'none',
};

export const INNER_SHADOW = {
  boxShadow: 'inset 0.5px 0.5px 1px rgba(0, 0, 0, 0.2)',
};

export const LIGHT_SHADOW = {
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
};

export const MEDIUM_SHADOW = {
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
};

export const HEAVY_SHADOW = {
  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.25)',
};

export const HEAVY_SHADOW_UP = {
  boxShadow: '0px -3px 12px rgba(0, 0, 0, 0.25)',
};

// ***** this file appears to be unused

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
  }
}

export const hugoUITheme = createTheme({
  hugoUITypography: {
    h1: {
      fontSize: 72,
      lineHeight: '88px',
      fontWeight: 300,
      letterSpacing: 'normal',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    h2: {
      fontSize: 48,
      lineHeight: '56px',
      fontWeight: 300,
      letterSpacing: 'normal',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    h3: {
      fontSize: 32,
      lineHeight: '40px',
      fontWeight: 400,
      letterSpacing: 'normal',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    h4: {
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: 400,
      letterSpacing: 'normal',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    h5: {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0.02em',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    subtitle1: {
      fontSize: 18,
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0.02em',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    subtitle2: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0.02em',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    subtitle3: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 600,
      letterSpacing: '0.01em',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    subtitle4: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0.01em',
      fontFamily: FONT_FAMILY,
      color: TEXT,
    },
    body: TYPOGRAPHY_BODY,
    bodyLink: {
      ...TYPOGRAPHY_BODY,
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    button: {
      base: {
        ...TYPOGRAPHY_BUTTON,
        whiteSpace: 'nowrap',
      },
      // To avoid error: Type 'string' is not assignable to type 'TextTransform | undefined'.ts(2322)
      uppercase: {
        ...TYPOGRAPHY_BUTTON,
        textTransform: 'uppercase',
        letterSpacing: '0.02em',
      },
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
      // To avoid error: Type 'string' is not assignable to type 'TextTransform | undefined'.ts(2322)
      uppercase: {
        ...TYPOGRAPHY_SMALL_TEXT,
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
      },
    },
    eyebrow: {
      base: TYPOGRAPHY_EYEBROW,
      // To avoid error: Type 'string' is not assignable to type 'TextTransform | undefined'.ts(2322)
      uppercase: {
        ...TYPOGRAPHY_EYEBROW,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
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
});
