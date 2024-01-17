import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entitiy';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((tyep) => [Category], { nullable: true })
  categories?: Category[];
}
