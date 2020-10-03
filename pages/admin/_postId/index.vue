<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["check-auth", "auth"],
  async asyncData(context) {
    try {
      const post = await context.app.$axios.$get(
        "/posts/" + context.params.postId + ".json"
      );
      // console.log(post);
      return {
        loadedPost: { ...post, id: context.params.postId },
      };
    } catch (e) {
      context.error(e);
    }
  },
  methods: {
    onSubmitted(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    },
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