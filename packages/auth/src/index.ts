import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  ForcedSubject,
  MongoAbility,
} from '@casl/ability'

const actions = ['manage', 'invite', 'delete'] as const
const subject = ['User', 'all'] as const

type AppAbilities = [
  (typeof actions)[number],
  (
    | (typeof subject)[number]
    | ForcedSubject<Exclude<(typeof subject)[number], 'all'>>
  ),
]

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

const { can, cannot, build } = new AbilityBuilder(createAppAbility)

can('invite', 'User')
cannot('delete', 'User')

export const ability = build()
