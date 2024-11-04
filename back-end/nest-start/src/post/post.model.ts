import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostType {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  title: string;
  @Field(() => String)
  content: string;
  @Field(() => String)
  writer: string;
  @Field(() => String)
  password: string;
  @Field(() => Date)
  createdDt: Date;
  @Field(() => Date, { nullable: true })
  updatedDt?: Date;
}

@InputType()
export class PostInput {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field(() => String)
  title: string;
  @Field(() => String)
  content: string;
  @Field(() => String)
  writer: string;
  @Field(() => String)
  password: string;
}
