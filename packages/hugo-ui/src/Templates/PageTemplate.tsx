import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import classnames from 'classnames';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PageTemplateRoot } from './templateStyles';
import { PAGE_TEMPLATE_ROOT_PREFIX } from './templateTokens';

export type HugoUIPageTemplateNavItem = {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  path?: string;
  children?: HugoUIPageTemplateNavItem[];
};

export type HugoUIPageTemplateNavProps = {
  navItems: HugoUIPageTemplateNavItem[];
  defaultSelected?: string;
  defaultExpanded?: string[];
  hidden?: boolean;
  onBeforeSelection?: (selection: string, onSelection: () => void) => void;
};

export type HugoUIPageTemplateProps = {
  appTitle?: React.ReactNode;
  appIcon?: React.ReactNode;
  titleSlot?: React.ReactNode;
  navProps?: HugoUIPageTemplateNavProps;
  children?: React.ReactNode;
  hidden?: boolean;
  className?: string;
};

const ROOT_PREFIX = PAGE_TEMPLATE_ROOT_PREFIX;

const hasChildren = (item: HugoUIPageTemplateNavItem) => Boolean(item.children?.length);

export function HugoUIPageTemplate({
  appTitle,
  appIcon,
  titleSlot,
  navProps,
  children,
  hidden,
  className,
}: HugoUIPageTemplateProps) {
  const [selectedId, setSelectedId] = useState(navProps?.defaultSelected);
  const [expandedIds, setExpandedIds] = useState<string[]>(navProps?.defaultExpanded ?? []);
  const hasVisibleNav = Boolean(navProps && !navProps.hidden);

  useEffect(() => {
    setSelectedId(navProps?.defaultSelected);
  }, [navProps?.defaultSelected]);

  useEffect(() => {
    setExpandedIds(navProps?.defaultExpanded ?? []);
  }, [navProps?.defaultExpanded]);

  const expandedSet = useMemo(() => new Set(expandedIds), [expandedIds]);

  const toggleExpanded = (itemId: string) => {
    setExpandedIds((currentIds) =>
      currentIds.includes(itemId)
        ? currentIds.filter((currentId) => currentId !== itemId)
        : [...currentIds, itemId]
    );
  };

  const selectItem = (item: HugoUIPageTemplateNavItem) => {
    const runSelection = () => {
      setSelectedId(item.id);
      if (hasChildren(item) && !expandedSet.has(item.id)) {
        setExpandedIds((currentIds) => [...currentIds, item.id]);
      }
    };

    if (navProps?.onBeforeSelection) {
      navProps.onBeforeSelection(item.id, runSelection);
      return;
    }

    runSelection();
  };

  const renderNavItem = (item: HugoUIPageTemplateNavItem, depth = 0) => {
    const selected = selectedId === item.id;
    const expanded = expandedSet.has(item.id);
    const childItems = item.children ?? [];
    const itemHasChildren = childItems.length > 0;

    return (
      <Box key={item.id} className={`${ROOT_PREFIX}-navGroup`}>
        <Box className={`${ROOT_PREFIX}-navItemShell`} sx={{ '--nav-depth': depth }}>
          <button
            type="button"
            className={classnames(`${ROOT_PREFIX}-navItem`, {
              [`${ROOT_PREFIX}-navItemSelected`]: selected,
            })}
            aria-current={selected ? 'page' : undefined}
            onClick={() => selectItem(item)}
          >
            {item.icon && <span className={`${ROOT_PREFIX}-navIcon`}>{item.icon}</span>}
            <span className={`${ROOT_PREFIX}-navLabel`}>{item.label}</span>
          </button>
          {itemHasChildren && (
            <IconButton
              className={`${ROOT_PREFIX}-navToggle`}
              size="small"
              aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
              aria-expanded={expanded}
              onClick={() => toggleExpanded(item.id)}
            >
              {expanded ? (
                <ExpandMoreIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
        {itemHasChildren && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Stack className={`${ROOT_PREFIX}-navChildren`} role="group">
              {childItems.map((childItem) => renderNavItem(childItem, depth + 1))}
            </Stack>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <PageTemplateRoot className={classnames(`${ROOT_PREFIX}-root`, className)}>
      <header className={`${ROOT_PREFIX}-appHeader`}>
        {appIcon && <div className={`${ROOT_PREFIX}-appIcon`}>{appIcon}</div>}
        {appTitle && <h1 className={`${ROOT_PREFIX}-appTitle`}>{appTitle}</h1>}
        {titleSlot && <div className={`${ROOT_PREFIX}-titleSlot`}>{titleSlot}</div>}
      </header>
      <div
        className={classnames(`${ROOT_PREFIX}-body`, {
          [`${ROOT_PREFIX}-bodyNoNav`]: !hasVisibleNav,
        })}
      >
        {hasVisibleNav && (
          <aside className={`${ROOT_PREFIX}-nav`} aria-label="Primary navigation">
            <Stack className={`${ROOT_PREFIX}-navList`}>
              {navProps?.navItems.map((item) => renderNavItem(item))}
            </Stack>
          </aside>
        )}
        {!hidden && <div className={`${ROOT_PREFIX}-content`}>{children}</div>}
      </div>
    </PageTemplateRoot>
  );
}
