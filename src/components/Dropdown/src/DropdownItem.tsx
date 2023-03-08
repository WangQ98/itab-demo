import { defineComponent } from "vue";
import { propTypes } from "@/utils/propTypes";

export const DropdownItem = defineComponent({
  props: {
    label: propTypes.string.def(""),
    icon: propTypes.string.def(""),
  },
  setup(props) {
    const { label, icon } = props;
    const hide = inject<(event: MouseEvent) => void>("hide");
    return () => (
      <div class="dropdown-item" onClick={hide}>
        <i class={icon}></i>
        <span>{label}</span>
      </div>
    );
  },
});
