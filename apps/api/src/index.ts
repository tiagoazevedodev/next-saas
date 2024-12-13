import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'ADMIN' })

const userCanInvite = ability.can('invite', 'User')
const userCanDelete = ability.can('delete', 'User')

const useCannoyDeleteOtherUsers = ability.cannot('delete', 'User')

console.log(userCanInvite)
console.log(userCanDelete)
console.log(useCannoyDeleteOtherUsers)
