import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestItemsInput {
  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  sku: string;

  @Field({ nullable: true })
  unit: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  quantity?: number;
}
