export type OrganizationStatus = 'Active' | 'Paused' | 'Archived';

export type Organization = {
  id: string;
  name: string;
  status: OrganizationStatus;
  plan: 'Enterprise' | 'Business' | 'Starter';
  users: number;
  admins: number;
  domains: number;
  primaryDomain: string;
  lastActivity: string;
};

export const organizations: Organization[] = [
  {
    id: 'org-001',
    name: 'Acme Cloud',
    status: 'Active',
    plan: 'Enterprise',
    users: 48,
    admins: 5,
    domains: 6,
    primaryDomain: 'acme.example',
    lastActivity: '2 hours ago',
  },
  {
    id: 'org-002',
    name: 'Northstar Labs',
    status: 'Paused',
    plan: 'Business',
    users: 24,
    admins: 3,
    domains: 3,
    primaryDomain: 'northstar.example',
    lastActivity: 'Yesterday',
  },
  {
    id: 'org-003',
    name: 'Vertex Systems',
    status: 'Active',
    plan: 'Enterprise',
    users: 72,
    admins: 8,
    domains: 9,
    primaryDomain: 'vertex.example',
    lastActivity: '15 minutes ago',
  },
  {
    id: 'org-004',
    name: 'Summit Works',
    status: 'Archived',
    plan: 'Starter',
    users: 8,
    admins: 1,
    domains: 1,
    primaryDomain: 'summit.example',
    lastActivity: '12 days ago',
  },
  {
    id: 'org-005',
    name: 'Brightlane Studio',
    status: 'Active',
    plan: 'Business',
    users: 19,
    admins: 2,
    domains: 2,
    primaryDomain: 'brightlane.example',
    lastActivity: '3 days ago',
  },
];
