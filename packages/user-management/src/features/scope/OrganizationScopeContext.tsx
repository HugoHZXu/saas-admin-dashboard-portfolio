import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DemoOrganizationScope } from '@/api/types';
import { useDemoSession } from '@/features/demoSession/DemoSessionContext';
import {
  ScopeField,
  ScopeHint,
  ScopeLabel,
  ScopeSelect,
  ScopeSelectorRoot,
} from './OrganizationScopeSelector.styles';

type OrganizationScopeContextValue = {
  organizations: DemoOrganizationScope[];
  selectedOrganization?: DemoOrganizationScope;
  selectedOrganizationId?: string;
  loading: boolean;
  errorMessage: string | null;
  setSelectedOrganizationId: (organizationId: string) => void;
};

const OrganizationScopeContext = createContext<OrganizationScopeContextValue | null>(null);

export function OrganizationScopeProvider({ children }: { children: React.ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const demoSession = useDemoSession();
  const selectedOrganizationId = searchParams.get('organizationId') ?? undefined;

  const organizations = useMemo(
    () => demoSession.userManagementOrganizations,
    [demoSession.userManagementOrganizations]
  );

  const selectedOrganization = useMemo(
    () => organizations.find((organization) => organization.id === selectedOrganizationId),
    [organizations, selectedOrganizationId]
  );

  const setSelectedOrganizationId = useCallback(
    (organizationId: string) => {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('organizationId', organizationId);
      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    if (demoSession.loading) {
      return;
    }

    if (organizations.length === 0) {
      if (!selectedOrganizationId) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('organizationId');
      setSearchParams(nextParams, { replace: true });
      return;
    }

    if (selectedOrganizationId && selectedOrganization) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('organizationId', organizations[0].id);
    setSearchParams(nextParams, { replace: true });
  }, [
    demoSession.loading,
    organizations,
    searchParams,
    selectedOrganization,
    selectedOrganizationId,
    setSearchParams,
  ]);

  const value = useMemo<OrganizationScopeContextValue>(
    () => ({
      organizations,
      selectedOrganization,
      selectedOrganizationId: selectedOrganization?.id,
      loading: demoSession.loading,
      errorMessage: demoSession.errorMessage,
      setSelectedOrganizationId,
    }),
    [
      demoSession.errorMessage,
      demoSession.loading,
      organizations,
      selectedOrganization,
      setSelectedOrganizationId,
    ]
  );

  return (
    <OrganizationScopeContext.Provider value={value}>{children}</OrganizationScopeContext.Provider>
  );
}

export const useOrganizationScope = () => {
  const context = useContext(OrganizationScopeContext);

  if (!context) {
    throw new Error('useOrganizationScope must be used inside OrganizationScopeProvider.');
  }

  return context;
};

const organizationKindLabels: Record<DemoOrganizationScope['kind'], string> = {
  internal: 'Internal organization',
  tenant: 'Tenant organization',
  public: 'Public organization',
};

const formatKindLabel = (organization: DemoOrganizationScope) =>
  organizationKindLabels[organization.kind];

export function OrganizationScopeSelector() {
  const {
    organizations,
    selectedOrganizationId,
    loading,
    errorMessage,
    setSelectedOrganizationId,
  } = useOrganizationScope();

  return (
    <ScopeSelectorRoot aria-label="Organization scope">
      <ScopeField>
        <ScopeLabel htmlFor="organization-scope">Organization scope</ScopeLabel>
        <ScopeSelect
          id="organization-scope"
          value={selectedOrganizationId ?? ''}
          disabled={loading || organizations.length === 0}
          onChange={(event) => setSelectedOrganizationId(event.target.value)}
        >
          {loading && <option value="">Loading organizations</option>}
          {!loading &&
            organizations.map((organization) => (
              <option key={organization.id} value={organization.id ?? ''}>
                {organization.name} ({formatKindLabel(organization)})
              </option>
            ))}
          {!loading && organizations.length === 0 && <option value="">No organizations</option>}
        </ScopeSelect>
      </ScopeField>
      {errorMessage && <ScopeHint role="status">Scope unavailable</ScopeHint>}
    </ScopeSelectorRoot>
  );
}
