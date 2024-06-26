import { ref } from "vue";
import {
  createGlobalState,
  useIntervalFn,
  useLocalStorage,
} from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { invoke } from "@tauri-apps/api";

const baseURL = 'https://led.baud-dance.com/api';

async function getOnline(userId) {
    return await axios.get(`${baseURL}/online/serial/${userId}`, {
      params: {},
    });
  }

export default createGlobalState(() => {
  const uuid = useLocalStorage("uuid", uuidv4());
  const online = ref({ led: "n" });
  const getMode = async () => {await invoke('is_component_enabled').then((ret) => {return ret}).catch((e) => {return false})}
  const isWebMode  = getMode();
  if (isWebMode) {
    useIntervalFn(
      async () => {
        console.log("uuid:", uuid.value);
        const res = await getOnline(uuid.value);
        console.log("res:", res);
        online.value = res.data.data;
      },
      1000 * 60,
      { immediate: true, immediateCallback: true }
    );  
  }
  return { online };
});
