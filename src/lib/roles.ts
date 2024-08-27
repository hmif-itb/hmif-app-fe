import { UserWithRoles } from '~/api/generated';

export function isInRoles(user: UserWithRoles, roles: UserWithRoles['roles']) {
  return user.roles && roles.some((role) => user.roles.includes(role));
}
