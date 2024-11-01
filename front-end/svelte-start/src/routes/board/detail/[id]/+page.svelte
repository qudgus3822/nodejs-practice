<script lang="ts">
  import { goto, invalidate } from "$app/navigation";
  import { apiFetch } from "$lib/api.js";
  import Comment from "$lib/components/Comment.svelte";
  import dayjs from "dayjs";

  export let data: any;
  const postOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function modifyPost() {
    const password = prompt("패스워드를 입력해주세요");
    // ❶ 프롬프트에서 취소를 누른 경우 처리
    if (!password) {
      return;
    }

    // ❷ check-password API 실행
    const result = await apiFetch(`/api/check-password`, {
      ...postOption,
      body: JSON.stringify({ id: data.detail._id, password }),
    });

    // ❸ json 함수를 실행하는 경우도 await를 해줘야 함

    // ❹ 패스워드가 맞는 경우 수정 페이지로 이동
    if (result.isExist) {
      goto(`/board/write/${data.detail._id}`);
    } else {
      alert("패스워드가 올바르지 않습니다.");
    }
  }

  const deleteOption = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  async function deletePost() {
    const password = prompt("삭제하려면 패스워드를 입력해주세요"); // ❶ 프롬프트로 값 입력받기
    // 프롬프트에서 취소를 누른 경우 처리
    if (!password) {
      return;
    }
    const result = await apiFetch(`/api/posts`, {
      // ❷ fetch API를 사용해 delete API를 호출
      ...deleteOption,
      body: JSON.stringify({ id: data.detail._id, password }),
    });

    // ❸ delete API의 결과에 따라 다른 메시지 출력
    if (!result.isSuccess) {
      alert("삭제에 실패했습니다. 패스워드를 확인해주세요.");
      return;
    }

    goto("/board");
  }

  async function deleteComment(event: CustomEvent<{ idx: number }>) {
    const password = prompt("삭제하려면 패스워드를 입력해주세요");
    // 프롬프트에서 취소를 누른 경우 처리
    if (!password) {
      return;
    }
    // /delete-comment API 실행
    const result = await apiFetch("/delete-comment", {
      ...deleteOption,
      body: JSON.stringify({
        id: data.detail._id,
        idx: event.detail,
        password,
      }),
    });

    // 댓글 삭제 실패 시 메시지 띄우고 함수 실행 종료
    if (!result.isSuccess) {
      alert("삭제에 실패했습니다. 패스워드를 확인해주세요.");
      return;
    }
    // 성공 시 메시지를 띄우고 화면 리프레시
    alert("삭제 성공!");
    data.detail = await apiFetch(`/api/posts/${data.detail._id}`);
  }

  const handleCommentSubmit = async (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const commentData = Object.fromEntries(formData);
    const res = await apiFetch(`/api/write-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (res.isSuccess) {
      alert("저장되었습니다.");
      data.detail = await apiFetch(`/api/posts/${data.detail._id}`);
    } else {
      alert("저장에 실패했습니다.");
    }
  };
</script>

<h1>게시판</h1>
<h2 class="text-xl">{data.detail.title}</h2>
<!-- 제목 -->
<div>
  작성자 :<b>{data.detail.writer}</b>
  <!-- 작성자 -->
</div>
<div>
  조회수 : {data.detail.hits} | 작성일시 : {dayjs(data.detail.createdDt).format(
    "YY.MM.DD HH시mm분"
  )}<!-- 조회수 및 작성일 -->
  <button
    on:click={() => {
      modifyPost();
    }}>수정</button
  >
  <button
    on:click={() => {
      deletePost();
    }}>삭제</button
  >
</div>

<div>
  <pre>{data.detail.content}</pre>
  <!-- 본문 내용 -->
</div>
<hr style="width:100%; color:black" />
<section style="margin-top: 20px;">
  <form method="post" on:submit={handleCommentSubmit}>
    <input type="hidden" name="id" value={data.detail._id} />
    <div>
      <div>
        <input type="text" name="name" placeholder="이름" />
        <input type="password" name="password" placeholder="비밀번호" />
      </div>
      <div>
        <textarea
          cols="40"
          rows="3"
          name="comment"
          placeholder="댓글을 입력해주세요."
        ></textarea>
        <button>댓글 쓰기</button>
      </div>
    </div>
  </form>
</section>
<br />
{#if data.detail.comments}
  <h3>{data.detail.comments.length}개의 댓글이 있습니다.</h3>
  <section>
    {#each data.detail.comments as comment}
      <Comment {comment} on:deleteComment={deleteComment} />
      <!-- <div style="border:1px solid; margin-bottom:5px; padding :10px">
        <div>
          작성자 : <b>{comment.name}</b>
        </div>
        <div>
          작성일시 : {dayjs(comment.createdDt).format("YY.MM.DD HH시mm분")}
          <button
            on:click={() => {
              deleteComment(comment.idx);
            }}>삭제</button
          >
        </div>
        <div>
          <pre>{comment.comment}</pre>
        </div>
      </div> -->
    {/each}
  </section>
{/if}

<footer>
  <div>
    <a href="/board">목록으로</a>
  </div>
</footer>
