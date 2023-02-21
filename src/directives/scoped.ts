import type { App, Directive } from "vue";

function ScopedDirective(el, binding): Directive {
  const scopeId = binding.value.$options.__scopeId;
  console.info("🚀 ~ log:el ----->", el);
  if (scopeId) {
    return;
  }
  el.children[0].setAttribute("scoped", "true");
}

export function setupScopedDirective(app: App) {
  app.directive("scoped", ScopedDirective);
}
