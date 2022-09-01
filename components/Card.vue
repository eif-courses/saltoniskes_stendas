<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  image?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No title',
  description: 'No description',
  image: 'https://cdn.quasar.dev/img/parallax2.jpg',
})
</script>

<template>
  <q-card class="my-card">
    <q-img :src="image">
      <div class="absolute-bottom text-h6">
        {{ title }}
      </div>
    </q-img>
    <q-card-section>
      {{ description }}
    </q-card-section>
  </q-card>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
