<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // layout: "admin",
  methods: {
    onSubmitted(postData) {
      axios
        .post("https://nuxt-blog-bee7d.firebaseio.com/posts.json", {
          // submited form data comming from form
          ...postData,
          // Add the updated date
          updatedDate: new Date(),
        })
        .then((result) => this.$router.push("/admin"))
        .catch((e) => console.log(e));
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>