const vFocus = {
  mounted(el) {
    el.focus();

    el.placeholder = "Enter a random name";
  },
};

export default vFocus;
