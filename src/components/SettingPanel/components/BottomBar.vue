<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import Menu from "./Menu.vue";
import { invoke } from "@tauri-apps/api";
const isComponentEnabled = ref(false);
onMounted(async () => {
  isComponentEnabled = await invoke('is_component_enabled')
  .then((ret) => {return ret})
  .catch((error) => {
    console.error('Error in using getMode:', error);
    // 在这里处理错误
    return true;}
  );
})

console.log("iscom", isComponentEnabled)
</script>
<template>
  <div>
    <div class="flex gap-x-2">
      <Menu></Menu>
      <div class="flex-1"></div>
        <div v-if="isComponentEnabled">
          <a href="https://github.com/BaudDance/SerialAssistant" target="_blank">
          <label class="btn btn-square btn-ghost">
            <img src="/github.svg" class="w-7 h-7" />
          </label>
        </a>
        <a href="https://space.bilibili.com/6100925" target="_blank">
          <label class="btn btn-square btn-ghost">
            <img src="/bilibili.svg" class="w-7 h-7" />
          </label>
        </a>
        </div>
    </div>
  </div>
</template>
