import { createVNode, defineComponent, render } from "vue";
import type { PropType, RendererElement, RendererNode, VNode } from "vue";

interface IDropdownOption {
  el: HTMLElement;
  content: () => JSX.Element;
}

const DropdownComponent = defineComponent({
  props: {
    option: {
      type: Object as PropType<IDropdownOption>,
      required: true,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      option: props.option,
      isShow: false,
      top: 0,
      left: 0,
    });

    ctx.expose({
      showDropdown(option: IDropdownOption) {
        state.option = option;
        state.isShow = true;
        const { top, left, height } = option.el.getBoundingClientRect();
        state.top = top + height;
        state.left = left;
      },
    });

    provide("hide", () => (state.isShow = false));

    const classes = computed(() => [
      "dropdown",
      {
        "dropdown-isShow": state.isShow,
      },
    ]);

    const styles = computed(() => ({
      top: `${state.top}px`,
      left: `${state.left}px`,
    }));

    const el = ref<HTMLDivElement | null>(null);

    const onMousedownDocument = (e: MouseEvent) => {
      // 如果点击的是dropdown内部 什么都不做

      if (el.value && !el.value.contains(e.target as Node)) {
        state.isShow = false;
      }
    };

    onMounted(() => {
      // 事件的传递行为是先捕获 在冒泡
      // 之前为了阻止事件传播 给block 都增加了 stopPropagation
      document.body.addEventListener("mousedown", onMousedownDocument, true);
    });

    onBeforeUnmount(() => {
      document.body.removeEventListener("mousedown", onMousedownDocument);
    });

    return () => {
      return (
        <div class={classes.value} style={styles.value} ref={el}>
          {state.option.content()}
        </div>
      );
    };
  },
});

let vnode: VNode<RendererNode, RendererElement, { [key: string]: any }> | null;
export function $dropdown(option: IDropdownOption) {
  if (!vnode) {
    const el = document.createElement("div");
    vnode = createVNode(DropdownComponent, { option });

    document.body.append((render(vnode, el), el));
  }
  // let { showDropdown } = vnode.component.exposed;
  // showDropdown(option);
}
