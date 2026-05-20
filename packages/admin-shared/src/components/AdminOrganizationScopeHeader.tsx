import { useId, type ReactNode } from 'react';
import type { DemoOrganizationScope } from '../session/types';
import { formatDemoOrganizationKind } from './AdminAccountMenu';
import {
  ScopeField,
  ScopeHeaderRoot,
  ScopeHint,
  ScopeLabel,
  ScopeSelect,
} from './AdminOrganizationScopeHeader.styles';

export type AdminOrganizationScopeHeaderProps = {
  organizations: DemoOrganizationScope[];
  selectedOrganizationId?: string | null;
  loading?: boolean;
  errorMessage?: string | null;
  label?: ReactNode;
  unavailableLabel?: ReactNode;
  onSelectOrganization: (organizationId: string) => void;
};

export function AdminOrganizationScopeHeader({
  organizations,
  selectedOrganizationId = null,
  loading = false,
  errorMessage = null,
  label = 'Organization scope',
  unavailableLabel = 'Scope unavailable',
  onSelectOrganization,
}: AdminOrganizationScopeHeaderProps) {
  const generatedId = useId();
  const selectId = `admin-organization-scope-${generatedId}`;

  return (
    <ScopeHeaderRoot aria-label="Organization scope">
      <ScopeField>
        <ScopeLabel htmlFor={selectId}>{label}</ScopeLabel>
        <ScopeSelect
          id={selectId}
          value={selectedOrganizationId ?? ''}
          disabled={loading || organizations.length === 0}
          onChange={(event) => onSelectOrganization(event.target.value)}
        >
          {loading && <option value="">Loading organizations</option>}
          {!loading &&
            organizations.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.name} ({formatDemoOrganizationKind(organization)})
              </option>
            ))}
          {!loading && organizations.length === 0 && <option value="">No organizations</option>}
        </ScopeSelect>
      </ScopeField>
      {errorMessage && <ScopeHint role="status">{unavailableLabel}</ScopeHint>}
    </ScopeHeaderRoot>
  );
}
