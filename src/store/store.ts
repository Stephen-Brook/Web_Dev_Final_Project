export const useStore = defineStore("store", () => {
  // State
  
  //light / dark mode switch
  const isDark = ref(true);
  watch(
    isDark,
    (on) => {
      document.documentElement.classList.toggle("app-dark", on);
    },
    { immediate : true }
  );
  // Actions
  function toggleTheme() {
    isDark.value = !isDark.value;
  }
  // Getters

  return {
    //state
    isDark,

    //actions
    toggleTheme,
  };
});
