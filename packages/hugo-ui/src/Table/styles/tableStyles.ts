import Box from '@mui/material/Box';
import { createTheme, styled } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';
import { createTableTokens, ROOT_PREFIX } from './tableTokens';

export const createTableThemeOverrides = (): ThemeOptions => ({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            borderBottom: `1px solid ${tokens.colors.borderDefault}`,
            boxSizing: 'border-box',
          };
        },
        head: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            ...theme.hugoUITypography.smallText.uppercase,
            height: tokens.sizing.headCellHeight,
            padding: `0 ${tokens.sizing.cellPaddingX}px`,
            color: tokens.colors.textSubtle,
            background: tokens.colors.surfaceHeader,
            whiteSpace: 'nowrap',
          };
        },
        body: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            ...theme.hugoUITypography.body,
            height: tokens.sizing.bodyCellHeight,
            padding: `0 ${tokens.sizing.cellPaddingX}px`,
            color: tokens.colors.textDefault,
          };
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            outline: 'none',
            [`&.${ROOT_PREFIX}-rowInteractive`]: {
              cursor: 'pointer',
              '@media (hover: hover)': {
                [`&:hover .${ROOT_PREFIX}-cell`]: {
                  background: tokens.colors.surfaceHover,
                },
              },
              '&:focus-visible': {
                outline: 'none',
              },
              [`&:focus-visible .${ROOT_PREFIX}-cell`]: {
                boxShadow: [
                  `inset 0 ${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                  `inset 0 -${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                ].join(', '),
              },
              [`&:focus-visible .${ROOT_PREFIX}-cell:first-of-type`]: {
                boxShadow: [
                  `inset ${tokens.sizing.focusRingWidth}px 0 0 ${tokens.colors.focusRing}`,
                  `inset 0 ${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                  `inset 0 -${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                ].join(', '),
              },
              [`&:focus-visible .${ROOT_PREFIX}-cell:last-of-type`]: {
                boxShadow: [
                  `inset -${tokens.sizing.focusRingWidth}px 0 0 ${tokens.colors.focusRing}`,
                  `inset 0 ${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                  `inset 0 -${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                ].join(', '),
              },
              [`&:focus-visible .${ROOT_PREFIX}-cell:only-of-type`]: {
                boxShadow: [
                  `inset ${tokens.sizing.focusRingWidth}px 0 0 ${tokens.colors.focusRing}`,
                  `inset -${tokens.sizing.focusRingWidth}px 0 0 ${tokens.colors.focusRing}`,
                  `inset 0 ${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                  `inset 0 -${tokens.sizing.focusRingWidth}px 0 ${tokens.colors.focusRing}`,
                ].join(', '),
              },
            },
            [`&.${ROOT_PREFIX}-rowSelected .${ROOT_PREFIX}-cell`]: {
              background: tokens.colors.surfaceSelected,
            },
            [`&.${ROOT_PREFIX}-rowSelected.${ROOT_PREFIX}-rowInteractive:hover .${ROOT_PREFIX}-cell`]:
              {
                background: tokens.colors.surfaceSelectedHover,
              },
            [`&.${ROOT_PREFIX}-loadingRow .${ROOT_PREFIX}-cell`]: {
              background: tokens.colors.surface,
            },
            [`&:last-child .${ROOT_PREFIX}-cell`]: {
              borderBottom: 0,
            },
          };
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            color: tokens.colors.textSubtle,
            '&:hover': {
              color: tokens.colors.textPrimary,
            },
            '&.Mui-active': {
              color: tokens.colors.textPrimary,
              '.MuiTableSortLabel-icon': {
                color: tokens.colors.textPrimary,
              },
            },
            '&.Mui-focusVisible': {
              borderRadius: 4,
              boxShadow: `0 0 0 2px ${tokens.colors.focusRing}`,
            },
            '&.Mui-disabled': {
              color: tokens.colors.textSubtle,
              opacity: 0.7,
            },
          };
        },
        icon: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            color: tokens.colors.textSubtle,
          };
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          const paginationSelectFocusSelector = [
            '.MuiTablePagination-input.Mui-focused',
            '.MuiTablePagination-input:focus-within',
            '.MuiTablePagination-input:has(.MuiTablePagination-select[aria-expanded="true"])',
          ].join(', ');
          return {
            ...theme.hugoUITypography.smallText.base,
            color: tokens.colors.textSubtle,
            borderTop: `1px solid ${tokens.colors.borderDefault}`,
            background: tokens.colors.surface,
            '.MuiTablePagination-toolbar': {
              minHeight: 48,
              paddingLeft: tokens.sizing.cellPaddingX,
              paddingRight: tokens.sizing.cellPaddingX,
            },
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
              margin: 0,
            },
            '.MuiTablePagination-input': {
              ...theme.hugoUITypography.smallText.base,
              alignItems: 'center',
              borderRadius: tokens.sizing.paginationControlRadius,
              color: tokens.colors.textDefault,
              display: 'inline-flex',
              height: tokens.sizing.paginationControlHeight,
              marginLeft: 8,
              marginRight: 24,
              minWidth: 48,
              transition: 'background-color 0.16s ease, box-shadow 0.16s ease',
            },
            [paginationSelectFocusSelector]: {
              background: tokens.colors.surfaceSelected,
              boxShadow: `0 0 0 ${tokens.sizing.focusRingWidth}px ${tokens.colors.focusRing}`,
            },
            '.MuiTablePagination-select': {
              ...theme.hugoUITypography.smallText.base,
              borderRadius: tokens.sizing.paginationControlRadius,
              color: tokens.colors.textDefault,
            },
            '.MuiTablePagination-select.MuiSelect-select.MuiInputBase-input': {
              ...theme.hugoUITypography.smallText.base,
              background: 'transparent',
              minHeight: 0,
              padding: '8px 26px 8px 10px',
            },
            '.MuiTablePagination-selectIcon': {
              color: tokens.colors.textSubtle,
              right: 6,
            },
            '.MuiTablePagination-actions': {
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: 16,
              columnGap: 4,
            },
            '.MuiTablePagination-actions .MuiIconButton-root': {
              width: tokens.sizing.paginationIconButtonSize,
              height: tokens.sizing.paginationIconButtonSize,
              color: tokens.colors.textSubtle,
              borderRadius: '50%',
              '@media (hover: hover)': {
                '&:hover': {
                  background: tokens.colors.surfaceHover,
                  color: tokens.colors.textPrimary,
                },
              },
              '&.Mui-focusVisible': {
                background: tokens.colors.surfaceSelected,
                boxShadow: `inset 0 0 0 ${tokens.sizing.focusRingWidth}px ${tokens.colors.focusRing}`,
                color: tokens.colors.textPrimary,
              },
              '&.Mui-disabled': {
                color: tokens.colors.textSubtle,
                opacity: 0.4,
              },
            },
          };
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            ...theme.hugoUITypography.smallText.base,
            color: tokens.colors.textDefault,
            minHeight: tokens.sizing.paginationMenuItemHeight,
            '&.Mui-selected': {
              background: tokens.colors.surfaceSelected,
            },
            '&.Mui-selected.Mui-focusVisible, &.Mui-selected:hover': {
              background: tokens.colors.surfaceSelectedHover,
            },
            '&.Mui-focusVisible': {
              background: tokens.colors.surfaceHover,
            },
          };
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: ({ theme }) => {
          const tokens = createTableTokens(theme as Theme);
          return {
            backgroundColor: tokens.colors.skeletonBase,
            '&::after': {
              background: `linear-gradient(90deg, transparent, ${tokens.colors.skeletonHighlight}, transparent)`,
            },
          };
        },
      },
    },
  },
});

export const createTableTheme = (parentTheme: Theme) =>
  createTheme(parentTheme, createTableThemeOverrides());

export const TableRoot = styled(Box)(({ theme }) => {
  const tokens = createTableTokens(theme as Theme);
  return {
    width: '100%',
    color: tokens.colors.textDefault,
    [`&.${ROOT_PREFIX}-root`]: {
      boxSizing: 'border-box',
    },
    [`.${ROOT_PREFIX}-container`]: {
      border: `1px solid ${tokens.colors.borderDefault}`,
      borderRadius: tokens.sizing.radius,
      background: tokens.colors.surface,
      overflow: 'hidden',
      ...theme.hugoUIShadows.NO_SHADOW,
    },
    [`.${ROOT_PREFIX}-table`]: {
      minWidth: tokens.sizing.minWidth,
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    [`.${ROOT_PREFIX}-headCell`]: {
      borderBottomColor: tokens.colors.borderStrong,
    },
    [`.${ROOT_PREFIX}-stateCell`]: {
      minHeight: tokens.sizing.stateMinHeight,
      padding: tokens.sizing.statePadding,
      textAlign: 'center',
      color: tokens.colors.textSubtle,
      background: tokens.colors.surface,
    },
    [`.${ROOT_PREFIX}-stateContent`]: {
      minHeight: tokens.sizing.stateMinHeight - tokens.sizing.statePadding * 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  };
});
