import { h, ref } from "vue";
import DefaultTheme from "vitepress/theme";
import ImagePreview from "./components/ImagePreview.vue";
import CustomImage from "./components/CustomImage.vue";

// 创建一个简单的事件总线
const eventBus = {
  listeners: new Map(),
  emit(event: string, data: any) {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach((callback: Function) => callback(data));
  },
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  },
};

const imagePreviewService = {
  openPreview: (src: string) => {
    eventBus.emit("preview-image", src);
  },
};

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("CustomImage", CustomImage);
    app.provide("imagePreview", imagePreviewService);
    app.provide("eventBus", eventBus);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(ImagePreview),
    });
  },
};
