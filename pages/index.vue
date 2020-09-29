<template>
  <div class="home-page">
    <section class="featured-posts">
      <PostList :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
export default {
  // helps with SEO since it will not load page till data is loaded from server.
  // executes on server.
  // .this does not work here since asyncData works before this component actually created
  asyncData(context) {
    return new Promise((resolve, reject) => {
      // console.log(context);
      setTimeout(() =>
        resolve(
          {
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
          },
          1500
        )
      );
    });
  },
  // this one one execute on the client
  // data() {
  //   return {
  //     loadedPosts: [],
  //   };
  // },
  created() {},
};
</script>

<style scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url("~assets/images/main-page-background.jpg");
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
