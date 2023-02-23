import type { App, Directive } from "vue";

function ScopedDirective(el, binding): Directive {
  const scopeId = binding.value.$options.__scopeId;
  if (scopeId) {
    return;
  }
  el.children[0].setAttribute("scoped", "true");
}

export function setupScopedDirective(app: App) {
  app.directive("scoped", ScopedDirective);
}
