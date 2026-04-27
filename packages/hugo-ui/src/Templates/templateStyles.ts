import { styled } from '@mui/material/styles';
import {
  CONTENT_TEMPLATE_ROOT_PREFIX,
  createContentTemplateTokens,
  createPageTemplateTokens,
  PAGE_TEMPLATE_ROOT_PREFIX,
} from './templateTokens';

export const PageTemplateRoot = styled('div')(({ theme }) => {
  const tokens = createPageTemplateTokens(theme);

  return {
    minHeight: '100vh',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    background: tokens.colors.pageBackground,
    color: tokens.colors.textDefault,

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-appHeader`]: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.headerGap,
      minHeight: tokens.sizing.headerHeight,
      padding: `0 ${tokens.spacing.headerPaddingX}`,
      borderBottom: `1px solid ${tokens.colors.headerBorder}`,
      background: tokens.colors.headerBackground,
      color: tokens.colors.headerText,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-appIcon`]: {
      display: 'grid',
      placeItems: 'center',
      width: tokens.sizing.appIconSize,
      height: tokens.sizing.appIconSize,
      borderRadius: tokens.sizing.appIconRadius,
      background: tokens.colors.appIconBackground,
      color: tokens.colors.appIconText,

      '& svg': {
        fontSize: tokens.sizing.appIconSvgSize,
      },
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-appTitle`]: {
      margin: 0,
      color: tokens.colors.headerText,
      ...tokens.typography.appTitle,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-titleSlot`]: {
      marginLeft: 'auto',
      color: tokens.colors.headerText,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-body`]: {
      flex: '1 1 auto',
      display: 'grid',
      gridTemplateColumns: `${tokens.sizing.desktopNavWidth}px minmax(0, 1fr)`,
      minHeight: 0,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-bodyNoNav`]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-nav`]: {
      minHeight: 0,
      overflowY: 'auto',
      borderRight: `1px solid ${tokens.colors.borderDefault}`,
      background: tokens.colors.navBackground,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navList`]: {
      gap: tokens.spacing.navListGap,
      padding: tokens.spacing.navPadding,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navGroup`]: {
      display: 'grid',
      gap: tokens.spacing.navGroupGap,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navItemShell`]: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1fr) auto',
      alignItems: 'center',
      gap: tokens.spacing.navItemShellGap,
      paddingLeft: `calc(var(--nav-depth, 0) * ${tokens.sizing.navDepthIndent}px)`,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navItem`]: {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.navItemGap,
      width: '100%',
      minHeight: tokens.sizing.navItemHeight,
      padding: `0 ${tokens.spacing.navItemPaddingX}px`,
      border: '1px solid transparent',
      borderRadius: tokens.sizing.navItemRadius,
      background: 'transparent',
      color: tokens.colors.textDefault,
      cursor: 'pointer',
      textAlign: 'left',
      ...tokens.typography.navItem,

      '&:hover': {
        background: tokens.colors.navHover,
      },

      '&:focus-visible': {
        borderColor: tokens.colors.focusRing,
        outline: `${tokens.sizing.focusRingWidth}px solid ${tokens.colors.focusRing}`,
        outlineOffset: 1,
      },
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navItemSelected`]: {
      background: tokens.colors.navSelected,
      color: tokens.colors.textPrimary,
      fontWeight: tokens.typography.navItemSelectedWeight,

      '&:hover': {
        background: tokens.colors.navSelectedHover,
      },
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navIcon`]: {
      display: 'grid',
      placeItems: 'center',
      width: tokens.sizing.navIconSize,
      height: tokens.sizing.navIconSize,
      color: 'inherit',

      '& svg': {
        fontSize: tokens.sizing.navIconSize,
      },
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navLabel`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navToggle`]: {
      width: tokens.sizing.navToggleSize,
      height: tokens.sizing.navToggleSize,
      color: tokens.colors.textSubtle,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navChildren`]: {
      gap: tokens.spacing.navGroupGap,
    },

    [`.${PAGE_TEMPLATE_ROOT_PREFIX}-content`]: {
      minWidth: 0,
      minHeight: 0,
      overflowY: 'auto',
      padding: tokens.spacing.contentPadding,
    },

    '@media (max-width: 900px)': {
      [`.${PAGE_TEMPLATE_ROOT_PREFIX}-appHeader`]: {
        padding: `0 ${tokens.spacing.headerMobilePaddingX}`,
      },

      [`.${PAGE_TEMPLATE_ROOT_PREFIX}-body`]: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto minmax(0, 1fr)',
      },

      [`.${PAGE_TEMPLATE_ROOT_PREFIX}-nav`]: {
        maxHeight: '40vh',
        borderRight: 0,
        borderBottom: `1px solid ${tokens.colors.borderDefault}`,
      },

      [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navList`]: {
        padding: tokens.spacing.navMobilePadding,
      },

      [`.${PAGE_TEMPLATE_ROOT_PREFIX}-navItemShell`]: {
        paddingLeft: 0,
      },

      [`.${PAGE_TEMPLATE_ROOT_PREFIX}-content`]: {
        padding: tokens.spacing.contentMobilePadding,
      },
    },
  };
});

export const ContentTemplateRoot = styled('div')(({ theme }) => {
  const tokens = createContentTemplateTokens(theme);

  return {
    display: 'grid',
    gap: tokens.spacing.rootGap,
    minWidth: 0,

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-header`]: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: tokens.spacing.headerGap,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-headingGroup`]: {
      display: 'grid',
      gap: tokens.spacing.headingGap,
      minWidth: 0,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-titleRow`]: {
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing.titleRowGap,
      minWidth: 0,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-backButton`]: {
      flex: '0 0 auto',
      width: tokens.sizing.backButtonSize,
      height: tokens.sizing.backButtonSize,
      color: tokens.colors.textDefault,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-pageTitle`]: {
      margin: 0,
      color: tokens.colors.textPrimary,
      fontSize: tokens.typography.pageTitle.fontSize,
      fontWeight: tokens.typography.pageTitle.fontWeight,
      lineHeight: tokens.typography.pageTitle.lineHeight,
      letterSpacing: tokens.typography.pageTitle.letterSpacing,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-titleInfo`]: {
      margin: 0,
      color: tokens.colors.textSubtle,
      ...tokens.typography.titleInfo,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-actions`]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      gap: tokens.spacing.actionGap,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-body`]: {
      minWidth: 0,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-card .${CONTENT_TEMPLATE_ROOT_PREFIX}-body, .${CONTENT_TEMPLATE_ROOT_PREFIX}-table .${CONTENT_TEMPLATE_ROOT_PREFIX}-body, .${CONTENT_TEMPLATE_ROOT_PREFIX}-error .${CONTENT_TEMPLATE_ROOT_PREFIX}-body`]:
      {
        border: `1px solid ${tokens.colors.borderDefault}`,
        borderRadius: tokens.sizing.bodyRadius,
        background: tokens.colors.surfaceDefault,
        boxShadow: tokens.shadows.panel,
      },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-card .${CONTENT_TEMPLATE_ROOT_PREFIX}-body`]: {
      padding: tokens.spacing.cardPadding,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-table .${CONTENT_TEMPLATE_ROOT_PREFIX}-body`]: {
      overflow: 'hidden',
      padding: tokens.spacing.tablePadding,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-error .${CONTENT_TEMPLATE_ROOT_PREFIX}-body`]: {
      padding: tokens.spacing.errorPadding,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-errorContent`]: {
      display: 'grid',
      justifyItems: 'start',
      gap: tokens.spacing.errorGap,
      color: tokens.colors.textDefault,
    },

    [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-errorMessage`]: {
      margin: 0,
      color: tokens.colors.textSubtle,
      ...tokens.typography.titleInfo,
    },

    '@media (max-width: 720px)': {
      [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-header`]: {
        display: 'grid',
      },

      [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-actions`]: {
        justifyContent: 'flex-start',
      },

      [`.${CONTENT_TEMPLATE_ROOT_PREFIX}-pageTitle`]: {
        fontSize: tokens.typography.pageTitle.mobileFontSize,
      },
    },
  };
});
