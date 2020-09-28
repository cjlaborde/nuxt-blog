<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadedPost: {
        author: "John",
        title: "My awesome Post",
        content: "Super amazing, thanks for that!",
        thumbnailLink: "https://img.caixin.com/2019-07-24/1563971044321649.jpg",
      },
    };
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>