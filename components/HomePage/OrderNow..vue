<template>
  <div class="orderNow-component">
    <img src="../../assets/images/orderNow-bg.png" alt="orderNow-image" />
    <div class="container">
      <div class="content">
        <h2 class="orderNow-name">
          <!-- {{ $t("home.spicyZingerWrap") }} -->
          {{ $t("home.Betefourmix") }}
        </h2>
        <b-button :to="localePath(`/menu?category=60`)">{{
          $t("home.orderNow")
        }}</b-button>
      </div>
    </div>
  </div>
</template>
