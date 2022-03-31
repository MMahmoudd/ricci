<template>
  <p class="font-weight-bold mr-3">
    <span class="header-section">{{ $t("checkout.delivery") }}:</span>
    {{ price || 0 }} L.E
  </p>
</template>

<script>
    export default {
        name : 'deliveryPrice',
        props: ['price']
    }
</script>