import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const ROOT_PREFIX = 'HugoUITable';

export const createTableTokens = (theme: Theme) => ({
  colors: {
    textDefault: theme.hugoUIColorRoles.text.default,
    textPrimary: theme.hugoUIColorRoles.text.primary,
    textSubtle: theme.hugoUIColorRoles.text.subtle,
    surface: theme.hugoUIColorRoles.surface.default,
    surfaceHeader: theme.hugoUIColorRoles.surface.subtle,
    surfaceHover: alpha(theme.hugoUIColorRoles.surface.tintedStrong, 0.22),
    surfaceSelected: alpha(theme.hugoUIColorRoles.surface.tintedStrong, 0.34),
    surfaceSelectedHover: alpha(theme.hugoUIColorRoles.surface.tintedStrong, 0.48),
    borderDefault: theme.hugoUIColorRoles.border.default,
    borderStrong: theme.hugoUIColorRoles.border.strong,
    focusRing: theme.hugoUIColorRoles.focus.ring,
    skeletonBase: alpha(theme.hugoUIColorRoles.text.subtle, 0.12),
    skeletonHighlight: alpha(theme.hugoUIColorRoles.text.subtle, 0.06),
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
