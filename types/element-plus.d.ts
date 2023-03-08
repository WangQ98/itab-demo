import type { ElMessage } from "element-plus/types/components/message";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $message: ElMessage;
  }
}
