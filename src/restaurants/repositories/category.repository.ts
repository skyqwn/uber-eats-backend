// import { CustomRepository } from 'src/typeorm-ex.decorator';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entitiy';
import { Injectable } from '@nestjs/common';

// @CustomRepository(Category)
// export class CategoryRepository extends Repository<Category> {
//   async getOrCreate(name: string): Promise<Category> {
//     const categoryName = name.trim().toLowerCase();
//     const categorySlug = categoryName.replace(/ /g, '-');
//     let category = await this.findOne({ where: { slug: categorySlug } });
//     if (!category) {
//       category = await this.save(
//         this.create({ slug: categorySlug, name: categoryName }),
//       );
//     }
//     return category;
//   }
// }

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.findOne({ where: { slug: categorySlug } });
    if (!category) {
      category = await this.save(
        this.create({ slug: categorySlug, name: categoryName }),
      );
    }
    return category;
  }
}
