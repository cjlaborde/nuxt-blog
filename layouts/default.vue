<template>
  <div>
    <TheHeader @sideNavToggle="displaySideNav = !displaySideNav" />
    <TheSideNav :show="displaySideNav" @close="displaySideNav = false" />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSideNav from "@/components/Navigation/TheSideNav";

export default {
  // individual page middleware
  // middleware: "log",
  components: {
    TheHeader,
    TheSideNav,
  },
  data() {
    return {
      displaySideNav: false,
    };
  },
};
</script>

<style>
html {
  font-family: "Open Sans", sans-serif;
}

body {
  margin: 0;
}
</style>
