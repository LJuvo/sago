<template>
  <section class="base-editor-wrapper">
    <button class="" @click="changePreview">
      {{ isPreview ? "编辑" : "回显" }}
    </button>
    <div class="base-editor-wrapper-content">
      <base-preview v-if="isPreview"></base-preview>
      <base-editor v-else></base-editor>
    </div>
  </section>
</template>
<script>
import BaseEditor from "./editor.vue";
import BasePreview from "./preview.vue";
export default {
  components: {
    "base-editor": BaseEditor,
    "base-preview": BasePreview
  },
  data() {
    return {
      isPreview: false
    };
  },
  mounted() {},
  methods: {
    changePreview() {
      this.isPreview = !this.isPreview;
    }
  }
};
</script>
<style lang="less" scoped>
.base-editor-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &-content {
    flex: 1;
    width: 100%;
  }
}
</style>
