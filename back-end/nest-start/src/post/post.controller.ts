import { Controller } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Get()
  // async getAllPost() {
  //   try {
  //     // postService.list에서 글리스트와 페이지네이터를 가져옴
  //     const posts = await this.postService.getAllPost();

  //     // 리스트 페이지 렌더링
  //     console.log(posts);
  //     return posts;
  //   } catch (error) {
  //     console.error(error);
  //     return []; // 에러가 나는 경우는 빈값으로 렌더링
  //   }
  // }

  // @Post()
  // async writePost(@Body() postDto: PostType) {
  //   const { title, writer, password, content } = postDto;

  //   const post = {
  //     title,
  //     writer,
  //     password,
  //     content,
  //     createdDt: new Date().toISOString(),
  //   };
  //   // 업데이트 결과
  //   const result = this.postService.createPost(post);
  //   return { isSuccess: true, id: result };
  // }

  // @Get('/:id')
  // async getPostDetail(@Param() params) {
  //   const postId = params.id; // 게시글 id
  //   try {
  //     // postService.list에서 글리스트와 페이지네이터를 가져옴
  //     const data = await this.postService.getPost(postId);

  //     // 리스트 페이지 렌더링
  //     return data;
  //   } catch (error) {
  //     console.error(error);
  //     return {}; // 에러가 나는 경우는 빈값으로 렌더링
  //   }
  // }

  // @Put()
  // async modifyPost(@Body() postDto: PostType) {
  //   const { _id, title, writer, password, content } = postDto;

  //   const post = {
  //     title,
  //     writer,
  //     password,
  //     content,
  //     createdDt: new Date().toISOString(),
  //   };
  //   // 업데이트 결과
  //   const result = this.postService.updatePost(id, post);
  //   return { isSuccess: true, id: result };
  // }

  // @Delete('/id:')
  // async removePost(@Body() postDto: PostType) {
  //   const { _id } = postDto;
  //   try {
  //     // collection의 deleteOne을 사용해 게시글 하나를 삭제
  //     await this.postService.deletePost(_id);
  //     // 삭제 결과가 잘 못된 경우의 처리

  //     return { isSuccess: true };
  //   } catch (error) {
  //     // 에러가 난 경우의 처리
  //     console.error(error);
  //     return { isSuccess: false };
  //   }
  // }

  //   @Post('/write-comment')
  //   async writeComment(req, res) {
  //     const { id, name, password, comment } = req.body; // body에서 데이터를 가지고 오기
  //     const post = await this.postService.getPostById(collection, id); // id로 게시글의 정보를 가져오기
  //     // 게시글에 기존 댓글 리스트가 있으면 추가
  //     if (post.comments) {
  //       post.comments.push({
  //         idx: post.comments.length + 1,
  //         name,
  //         password,
  //         comment,
  //         createdDt: new Date().toISOString(),
  //       });
  //     } else {
  //       // 게시글에 댓글 정보가 없으면 리스트에 댓글 정보 추가
  //       post.comments = [
  //         {
  //           idx: 1,
  //           name,
  //           password,
  //           comment,
  //           createdDt: new Date().toISOString(),
  //         },
  //       ];
  //     }

  //     postService.updatePost(collection, id, post);
  //     return res.json({ isSuccess: true, id: id });
  //   }

  //   @Delete('/delete-comment')
  //   async removeComment(req, res) {
  //     const { id, idx, password } = req.body;
  //     // 게시글(post)의 comments 안에 있는 특정 댓글 데이터를 찾기
  //     const post = await collection.findOne(
  //       {
  //         _id: ObjectId(id),
  //         comments: { $elemMatch: { idx: parseInt(idx), password } },
  //       },
  //       postService.projectionOption,
  //     );
  //     // 데이터가 없으면 isSuccess : false를 주면서 종료
  //     if (!post) {
  //       return res.json({ isSuccess: false });
  //     }

  //     // 댓글 번호가 idx 이외인 것만 comments에 다시 할당 후 저장
  //     post.comments = post.comments.filter((comment) => comment.idx != idx);
  //     postService.updatePost(collection, id, post);
  //     return res.json({ isSuccess: true });
  //   }

  //   @Post('/check-password')
  //   async checkPassword(req, res) {
  //     // id, password 값을 가져옴
  //     const { id, password } = req.body;

  //     // postService의 getPostByIdAndPassword() 함수를 사용해 게시글 데이터 확인
  //     const post = this.postService.getPostByIdAndPassword(collection, {
  //       id,
  //       password,
  //     });

  //     // 데이터가 있으면 isExist true, 없으면 isExist false
  //     if (!post) {
  //       return res.status(404).json({ isExist: false });
  //     } else {
  //       return res.json({ isExist: true });
  //     }
  //   }
}
