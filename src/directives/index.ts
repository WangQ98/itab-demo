import { setupScopedDirective } from "./scoped";
import type { App } from "vue";

export function setupGlobDirectives(app: App) {
  setupScopedDirective(app);
}
