<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
<!--  <router-view/>-->
  <div class="wrapper">
    <TableSheet></TableSheet>
  </div>
</template>
<script lang="ts" setup>
import TableSheet from './components/TableSheet.vue'
</script>
<style>
.wrapper{
  height: 500px;
}

</style>
