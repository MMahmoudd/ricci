<template>
  <div class="HomePage text-center">
    <div class="headerComponent">
      <headerComponent />
    </div>
    <div class="eventComponent">
      <eventComponent />
    </div>
  </div>
</template>
<script>
import headerComponent from "../../components/global/header.vue";
import eventComponent from "../../components/events/event.vue";

export default {
  components: {
    headerComponent,
    eventComponent,
  },
};
</script>
