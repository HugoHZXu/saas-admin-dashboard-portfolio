import { styled as muiStyled, type CreateMUIStyled, type Theme } from '@mui/material/styles';
import type { HugoUIColorRoles } from '@hugo-ui/mui/styles/theme';

type HugoUISpacer = {
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

type HugoUIShadows = {
  NO_SHADOW: { boxShadow: string };
  INNER_SHADOW: { boxShadow: string };
  LIGHT_SHADOW: { boxShadow: string };
  MEDIUM_SHADOW: { boxShadow: string };
  HEAVY_SHADOW: { boxShadow: string };
  HEAVY_SHADOW_UP: { boxShadow: string };
};

export type HugoDashboardTheme = Theme & {
  hugoUISpacer: HugoUISpacer;
  hugoUIShadows: HugoUIShadows;
  hugoUIColorRoles: HugoUIColorRoles;
};

export const asHugoTheme = (theme: Theme) => theme as HugoDashboardTheme;

export const styled = muiStyled as unknown as CreateMUIStyled<HugoDashboardTheme>;
