import { useDictStore } from "@/stores/dict";
import { computed, type App } from "vue";

export const dictData = (type: string) => {

  const dictStore = useDictStore()
  return computed(() => {
    return dictStore.dictData(type)
  })
}


export const dictDataLabel = (type: string, value: string | number | boolean) => {

  const dictStore = useDictStore()
  return computed(() => dictStore.dictDataLabel(type, value))
}



const DictInstall = {

  install: (app: App): App<any> => {

    app.config.globalProperties.dictData = dictData
    app.config.globalProperties.dictDataLabel = dictDataLabel

    return app;
  },
};

export default DictInstall;
