import type { Theme } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUITable';

export const createTableTokens = (theme: Theme) => ({
  colors: {
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    textSubtle: theme.hugoUIColorRoles.text.subtle,
    surface: theme.hugoUIColorRoles.surface.default,
    surfaceHeader: theme.hugoUIColorRoles.surface.subtle,
    surfaceHover: theme.hugoUIColorRoles.surface.tinted,
    surfaceSelected: theme.hugoUIColorRoles.surface.tinted,
    surfaceSelectedHover: theme.hugoUIColorRoles.surface.tinted,
    borderDefault: theme.hugoUIColorRoles.border.default,
    borderStrong: theme.hugoUIColorRoles.border.strong,
    focusRing: theme.hugoUIColorRoles.focus.ring,
    skeletonBase: theme.hugoUIColors.NEUTRAL_GREY_200,
    skeletonHighlight: theme.hugoUIColorRoles.surface.default,
  },
  sizing: {
    radius: 8,
    minWidth: 640,
    headCellHeight: 44,
    bodyCellHeight: 52,
    cellPaddingX: 16,
    focusRingWidth: 2,
    paginationControlRadius: 6,
    paginationControlHeight: 36,
    paginationIconButtonSize: 40,
    paginationMenuItemHeight: 40,
    stateMinHeight: 128,
    statePadding: 24,
  },
});
