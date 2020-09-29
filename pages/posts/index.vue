<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: "1",
              title: "First Post",
              previewText: "This is our first post!",
              thumbnail:
                "https://img.caixin.com/2019-07-24/1563971044321649.jpg",
            },
            {
              id: "2",
              title: "Second Post",
              previewText: "This is our second post!",
              thumbnail:
                "https://img.caixin.com/2019-07-24/1563971044321649.jpg",
            },
          ],
        });
      }, 1000);
      // comment setTimeout and uncomment reject() to see error
      // reject(new Error());
    })
      .then((data) => {
        // return data that should be merge with the other component
        return data;
      })
      .catch((e) => {
        context.error(e);
      });
  },
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>