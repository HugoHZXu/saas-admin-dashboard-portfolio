import React, { KeyboardEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';
import classnames from 'classnames';
import { HugoUILoading } from '../Loading/Loading';
import { SearchBoxRoot } from './styles/searchBoxStyles';
import { SEARCH_BOX_ROOT_PREFIX } from './styles/searchBoxTokens';

export interface HugoUISearchBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  loading?: boolean;
  clearLabel?: string;
  searchLabel?: string;
}

export const HugoUISearchBox = React.forwardRef<HTMLInputElement, HugoUISearchBoxProps>(
  (
    {
      value,
      onChange,
      onSearch,
      loading = false,
      disabled = false,
      placeholder = 'Search',
      clearLabel = 'Clear search',
      searchLabel = 'Search',
      className,
      onKeyDown,
      ...inputProps
    },
    ref
  ) => {
    const trimmedValue = value.trim();
    const canSearch = Boolean(trimmedValue) && !disabled && !loading;

    const submitSearch = (nextValue = value) => {
      const nextSearch = nextValue.trim();
      if (nextSearch || nextValue === '') {
        onSearch?.(nextSearch);
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Enter' && canSearch) {
        submitSearch();
      }
    };

    const handleClear = () => {
      onChange('');
      onSearch?.('');
    };

    return (
      <SearchBoxRoot
        className={classnames(`${SEARCH_BOX_ROOT_PREFIX}-root`, className, {
          [`${SEARCH_BOX_ROOT_PREFIX}-disabled`]: disabled,
          [`${SEARCH_BOX_ROOT_PREFIX}-loading`]: loading,
        })}
      >
        <input
          ref={ref}
          className={`${SEARCH_BOX_ROOT_PREFIX}-input`}
          type="search"
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          {...inputProps}
        />
        {value && !disabled ? (
          <button
            type="button"
            className={classnames(`${SEARCH_BOX_ROOT_PREFIX}-button`, `${SEARCH_BOX_ROOT_PREFIX}-clearButton`)}
            aria-label={clearLabel}
            disabled={loading}
            onClick={handleClear}
          >
            <CloseIcon aria-hidden fontSize="small" />
          </button>
        ) : null}
        {loading ? (
          <span className={`${SEARCH_BOX_ROOT_PREFIX}-loadingIndicator`} aria-hidden>
            <HugoUILoading size="x-small" />
          </span>
        ) : (
          <button
            type="button"
            className={classnames(`${SEARCH_BOX_ROOT_PREFIX}-button`, {
              [`${SEARCH_BOX_ROOT_PREFIX}-searchButtonActive`]: canSearch,
            })}
            aria-label={searchLabel}
            disabled={!canSearch}
            tabIndex={canSearch ? 0 : -1}
            onClick={() => submitSearch()}
          >
            <SearchIcon aria-hidden fontSize="small" />
          </button>
        )}
        <span role="status" aria-live="polite" style={visuallyHidden}>
          {loading ? 'Searching' : ''}
        </span>
      </SearchBoxRoot>
    );
  }
);

HugoUISearchBox.displayName = 'HugoUISearchBox';
