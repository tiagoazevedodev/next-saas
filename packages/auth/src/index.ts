import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ForcedSubject,
  MongoAbility,
} from '@casl/ability'

import type { User } from './models/user'
import { permissions } from './permissions'
import type { ProjectSubject } from './subjects/project'
import type { UserSubject } from './subjects/user'

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`No permissions defined for role "${user.role}."`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build()

  return ability
}
