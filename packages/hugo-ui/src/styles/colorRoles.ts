import {
  ALERT,
  BLUE,
  DARK_PURPLE,
  DESTRUCT_STATE_1,
  DESTRUCT_STATE_2,
  ERROR_OR_DESTRUCT,
  LAVENDER,
  NEUTRAL_DARK_GREY,
  NEUTRAL_GREY_800,
  NEUTRAL_LIGHT_GREY,
  NEUTRAL_WHITE,
  PLUM_100,
  PURPLE_GRAPE,
  PURPLE_PLUM,
  SUCCESS_GREEN,
  TEXT,
  TEXT_HEADER,
} from './color';

export const hugoUIColorRoles = {
  brand: {
    primary: PURPLE_PLUM,
    accent: PURPLE_GRAPE,
    deep: DARK_PURPLE,
  },
  text: {
    primary: TEXT_HEADER,
    default: TEXT,
    inverse: NEUTRAL_WHITE,
    subtle: NEUTRAL_GREY_800,
    disabled: NEUTRAL_DARK_GREY,
  },
  surface: {
    default: NEUTRAL_WHITE,
    subtle: NEUTRAL_LIGHT_GREY,
    inverse: DARK_PURPLE,
    tinted: PLUM_100,
    tintedStrong: LAVENDER,
  },
  border: {
    default: NEUTRAL_DARK_GREY,
    strong: NEUTRAL_GREY_800,
  },
  focus: {
    ring: BLUE,
    ringOnDark: NEUTRAL_WHITE,
  },
  status: {
    success: SUCCESS_GREEN,
    warning: ALERT,
    error: ERROR_OR_DESTRUCT,
    destructStrong: DESTRUCT_STATE_1,
    destructActive: DESTRUCT_STATE_2,
  },
  accent: {
    soft: LAVENDER,
  },
};

export type HugoUIColorRoles = typeof hugoUIColorRoles;
