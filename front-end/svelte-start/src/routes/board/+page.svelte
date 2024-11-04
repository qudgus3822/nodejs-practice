<script lang="ts">
  import { apiFetch } from "$lib/api";
  import { loginInfo } from "$lib/store";
  import dayjs from "dayjs";
  export let data;

  loginInfo.set({
    email: "test",
    password: "테스트",
    token: "토큰",
  });
  debugger;
  // $: currentPage = 1;
  // $: getPageData(currentPage);
  const getPageData = async (targetPage: number, search: string) => {
    const response = await apiFetch(`/graphql`, {
      method: "POST",
      body: JSON.stringify({
        query: `
        {
          posts (page:${targetPage}, search:"${search}") {
            posts {
              _id
              title
              writer
              content
              createdDt
              hits,
            }
            paginator {
              pageList
              startPage
              lastPage
              hasPrev
              hasNext
              isFirstPage
              isLastPage
            }
          }
        }  
        `,
      }),
    });
  };
</script>

<h1>게시판</h1>
<!-- ❶ 타이틀 영역 -->

<!-- ❷ 검색어 영역  -->
<!-- <input
  type="text"
  name="search"
  id="search"
  value=""
  size="50"
  placeholder="검색어를 입력하세요."
/>
<button on:click={() => {}}>검색</button> -->
<br />

<!-- ❸ 글쓰기 페이지 이동 링크  -->
<a href="/board/write">글쓰기</a>
<br />

<!-- ❹ 리스트 테이블  -->
<div>
  <table>
    <thead>
      <tr>
        <th>제목</th>
        <th>작성자</th>
        <th>조회수</th>
        <th>등록일</th>
      </tr>
    </thead>
    <tbody>
      {#if Array.isArray(data.posts)}
        {#each data.posts as item}
          <tr>
            <td><a href="/board/detail/{item.id}">{item.title}</a></td>
            <td>{item.writer}</td>
            <td>{item.hits}</td>
            <td>{dayjs(item.createdDt).format("YY.MM.DD HH시mm분")}</td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td colspan="4">No data available</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
