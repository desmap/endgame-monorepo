import 'reflect-metadata'

import { ObjectType, Field } from 'type-graphql'

@ObjectType()
class Something {
  @Field()
  name: string = 'Tom'

  tell() {
    return this.name
  }
}

export default Something
