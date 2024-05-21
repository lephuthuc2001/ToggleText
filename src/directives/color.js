const vColor = {
  mounted(el, binding) {
    el.style.outlineColor = binding.value.outlineColor;
  },
  updated(el, binding) {
    el.style.outlineColor = binding.value.outlineColor;
  },
};

export default vColor;
