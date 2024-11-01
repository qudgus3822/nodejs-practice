<script lang="ts">
  import { goto } from "$app/navigation";
  import { apiFetch } from "$lib/api";

  export let data: any;
  const isWrite = data.detail.id ? false : true;

  const handleSubmit = async (e: Event) => {
    debugger;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const res = await apiFetch(`/post`, {
      method: isWrite ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.isSuccess) {
      alert("저장되었습니다.");
      goto("/board");
    } else {
      alert("저장에 실패했습니다.");
    }
  };
</script>

<!-- ❶ mode에 따라 문구 변경 -->
<h1>글 작성 수정</h1>
<div>
  <!-- ❷ mode에 따라 폼이 반영되는 URL 변경 -->
  <form
    id="boardForm"
    name="boardForm"
    method={isWrite ? "POST" : "PUT"}
    on:submit={handleSubmit}
  >
    <!-- ❸ 수정 모드인 때는 id값을 폼통해 전송  -->
    <input type="hidden" name="id" value={isWrite ? 0 : data.detail.id} />

    <!-- ❹ 수정 모드인 경우 제목을 넣어줍니다.  -->
    <div>
      <label>제목</label>
      <input
        type="text"
        name="title"
        placeholder="제목을 넣어주세요"
        value={isWrite ? "" : data.detail.title}
      />
    </div>
    <!-- ❺ 수정 모드인 경우 이름을 넣어줍니다.  -->
    <div>
      <label>이름</label>
      <input
        type="text"
        name="writer"
        placeholder="이름을 넣어주세요"
        value={isWrite ? "" : data.detail.writer}
      />
    </div>

    <div>
      <label>비밀번호</label>
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 넣어주세요"
      />
    </div>

    <!-- ❻ 수정 모드 인 경우 본문에 내용을 채워줍니다. -->
    <div>
      <label>본문을 입력하세요</label><br />
      <textarea
        placeholder="본문"
        name="content"
        cols="50"
        rows="10"
        value={isWrite ? "" : data.detail.content}
      ></textarea>

      <br />
      <!-- 버튼영역 -->
      <div>
        <button id="saveButton">저장</button>
        <button
          type="button"
          on:click={() => {
            goto("/board");
          }}>취소</button
        >
      </div>
    </div>
  </form>
</div>
