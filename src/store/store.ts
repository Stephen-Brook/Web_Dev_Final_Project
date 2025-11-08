export const useStore = defineStore("store", () => {
  // State  
  const recentlyVisited = ref(new Set(["Denver", "Bozeman", "Telluride"]));

  const selectedLocation = ref("Denver");

  //light / dark mode switch
  const isDark = ref(true);
  watch(
    isDark,
    (on) => {
      document.documentElement.classList.toggle("app-dark", on);
    },
    { immediate : true }
  );

  const latitude = ref<number | null>(null);
  const longitude = ref<number | null>(null);

  const currentWeather = ref<any>(null);

  const dayHourWeather = ref<any>(null);

  // Actions
  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  function setSelectedLocation(location: string) {
    selectedLocation.value = location;
  }


  function addNewPlace(place: string) {
    if (!place.trim()) return;
    // 1. Remove the place if it already exists. This is done so
    //    that when we add it back, it becomes the "newest" item.
    recentlyVisited.value.delete(place);

    // 2. Add the place. This adds it to the end of the set's
    //    insertion order, effectively making it the most recent.
    recentlyVisited.value.add(place);

    // 3. If the Set has grown too large, remove the oldest item,
    //    which is the *first* item in the Set's insertion order.
    if (recentlyVisited.value.size > 5) {
      const oldestPlace = recentlyVisited.value.values().next().value;
      recentlyVisited.value.delete(oldestPlace);
    }
    selectedLocation.value = place;
  }

  function setCoordinates(lat: number, lon: number) {
    latitude.value = lat;
    longitude.value = lon;
  }
  // Getters

  return {
    //state
    isDark,
    recentlyVisited,
    selectedLocation,
    latitude,
    longitude,
    currentWeather,
    dayHourWeather,

    //actions
    toggleTheme,
    addNewPlace,
    setSelectedLocation,
    setCoordinates,
  };
});
