import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dtos/edit-restaurant.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dtos/delete-restaurant.dto';
import { Category } from './entities/category.entitiy';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { RestaurantsInput, RestaurantsOutput } from './dtos/restaurnats.dto';
import { RestaurantInput, RestaurantOutput } from './dtos/restaurant.dto';
import {
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dtos/search-restaurant.dto';
import { Dish } from './entities/dish.entity';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish-dto';
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';
import { MyRestaurantsOutput } from './dtos/my-restaurants.dto';
import { MyRestaurantInput, MyRestaurantOutput } from './dtos/my-restaurant';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((returns) => CreateRestaurantOutput)
  @Role(['Owner'])
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input') createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return this.restaurantService.createRestaurant(
      authUser,
      createRestaurantInput,
    );
  }

  @Query((returns) => MyRestaurantsOutput)
  @Role(['Owner'])
  myRestaurants(@AuthUser() owner: User): Promise<MyRestaurantsOutput> {
    return this.restaurantService.myRestaurants(owner);
  }

  @Query((returns) => MyRestaurantOutput)
  @Role(['Owner'])
  myRestaurant(
    @AuthUser() owner: User,
    @Args('input') myRestaurantInput: MyRestaurantInput,
  ): Promise<MyRestaurantOutput> {
    return this.restaurantService.myRestaurant(owner, myRestaurantInput);
  }

  @Mutation((returns) => EditRestaurantOutput)
  @Role(['Owner'])
  editRestaurant(
    @AuthUser() owner: User,
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    return this.restaurantService.editRestaurant(owner, editRestaurantInput);
  }

  @Mutation((returns) => DeleteRestaurantOutput)
  @Role(['Owner'])
  deleteRestaurant(
    @AuthUser() owner: User,
    @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    return this.restaurantService.deleteRestaurant(
      owner,
      deleteRestaurantInput,
    );
  }

  @Query((returns) => RestaurantsOutput)
  restaurants(
    @Args('input') restaurantInput: RestaurantsInput,
  ): Promise<RestaurantsOutput> {
    return this.restaurantService.allRestaurants(restaurantInput);
  }

  @Query((returns) => RestaurantOutput)
  restaurant(
    @Args('input') restaurantInput: RestaurantInput,
  ): Promise<RestaurantOutput> {
    return this.restaurantService.findRestaurantById(restaurantInput);
  }

  @Query((returns) => SearchRestaurantOutput)
  searchRestaurant(
    @Args('input') serachRestaurantInput: SearchRestaurantInput,
  ): Promise<SearchRestaurantOutput> {
    return this.restaurantService.searchRestarantByName(serachRestaurantInput);
  }
}

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField((type) => Number)
  restaurantCount(@Parent() category: Category): Promise<number> {
    console.log(category);
    return this.restaurantService.countRestaurants(category);
  }

  @Query((type) => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.restaurantService.allCategories();
  }

  @Query((type) => CategoryOutput)
  category(
    @Args('input') categoryInput: CategoryInput,
  ): Promise<CategoryOutput> {
    return this.restaurantService.findCategoryBySlug(categoryInput);
  }
}

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((type) => CreateDishOutput)
  @Role(['Owner'])
  createDish(
    @AuthUser() owner: User,
    @Args('input') createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    return this.restaurantService.createDish(owner, createDishInput);
  }

  @Mutation((type) => EditDishOutput)
  @Role(['Owner'])
  editDish(
    @AuthUser() owner: User,
    @Args('input') editDistInput: EditDishInput,
  ): Promise<EditDishOutput> {
    return this.restaurantService.editDish(owner, editDistInput);
  }

  @Mutation((type) => DeleteDishOutput)
  @Role(['Owner'])
  deleteDish(
    @AuthUser() owner: User,
    @Args('input') deleteDishInput: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    return this.restaurantService.deleteDish(owner, deleteDishInput);
  }
}
