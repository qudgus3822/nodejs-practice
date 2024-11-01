<script lang="ts">
  import dayjs from "dayjs";

  export let comment;

  import { createEventDispatcher } from "svelte";
  const diapatch = createEventDispatcher();

  function deleteComment(idx: number) {
    diapatch("deleteComment", idx);
  }
</script>

<div style="border:1px solid; margin-bottom:5px; padding :10px">
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
</div>
