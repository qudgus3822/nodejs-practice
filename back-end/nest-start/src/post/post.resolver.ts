import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostInput, PostType } from './post.model';

@Resolver(() => PostType)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => [PostType])
  async findAll() {
    return await this.postService.getAllPost();
  }

  @Query(() => PostType)
  async findById(@Args('id') id: string) {
    return await this.postService.getPost(id);
  }

  @Mutation(() => PostType)
  async createPost(@Args('postInput') postInput: PostInput) {
    const result = await this.postService.createPost(postInput);
    console.log(result);
    return result;
  }

  @Mutation(() => PostType)
  async modifyPost(@Args('postInput') postInput: PostInput) {
    const result = await this.postService.updatePost(postInput);
    console.log(result);
    return result;
  }

  @Mutation(() => Int)
  async removePost(@Args('postInput') postInput: PostInput) {
    const result = await this.postService.deletePost(postInput.id);
    console.log(result);
    return result;
  }
}
