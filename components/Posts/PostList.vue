<template>
  <div>
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://img.caixin.com/2019-07-24/1563971044321649.jpg"
      title="Hello there!"
      previewText="This is my first post"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://img.caixin.com/2019-07-24/1563971044321649.jpg"
      title="Hello there! - the second time!"
      previewText="This is my second post"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://img.caixin.com/2019-07-24/1563971044321649.jpg"
      title="Hi!"
      previewText="This is my third post"
    />
  </div>
</template>


<script>
export default {
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style scoped>
.posts-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>