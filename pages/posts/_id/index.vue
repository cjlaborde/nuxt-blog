<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="text-3xl post-title">{{ loadedPost.title }}</h1>
      <div>
        <div>Last updated on {{ loadedPost.updatedDate }}</div>
        <div>Written by {{ loadedPost.author }}</div>
        <hr class="border my-3" />
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        Let me know what you think about the post, send a mail to
        <a href="mailto:feedback@gmail.com">feedback@gmail.com</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context, callback) {
    setTimeout(() => {
      callback(null, {
        loadedPost: {
          id: "1",
          // context.params.id  since we can't use this.$route.params since it has not been created yet.
          title: "First Post (ID: " + context.params.id + ")",
          previewText: "This is our first post!",
          author: "John",
          updatedDate: new Date(),
          content: "Temporally text which is not yet the preview text",
          thumbnail: "https://img.caixin.com/2019-07-24/1563971044321649.jpg",
        },
      });
    }, 1500);
  },
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>