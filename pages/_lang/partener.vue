<template>
  <div class="HomePage text-center">
    <div class="headerComponent">
      <headerComponent />
    </div>
    <div class="partenerComponent">
      <partenerComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from "../../components/global/header.vue";
import partenerComponent from "../../components/parteners/partener.vue";

export default {
  components: {
    headerComponent,
    partenerComponent,
  },
};
</script>
