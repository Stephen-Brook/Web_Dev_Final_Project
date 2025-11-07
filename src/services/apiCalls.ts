import { useStore } from "@/store/store.js";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useTranslateLocation() {
  const store = useStore();
  const { selectedLocation } = storeToRefs(store);

  const debouncedLocation = refDebounced(selectedLocation, 1000);

  const responseLimit = 5;
  // the locationUrl is reactive to selectedLocation updates
  const locationUrl = computed(
    () =>
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        debouncedLocation.value || ""
      )}&limit=${responseLimit}&appid=${API_KEY}`
  );

  const request = useFetch(locationUrl, {
    refetch: true, // rerun whenever locationUrl changes
  })
    .get()
    .json<any[]>();

  // when the fetch successfully finishes, update coordinates in the store
  request.onFetchResponse((response) => {
    if (!response.ok) {
      return;
    }
    // get the data from the request
    const list = request.data.value;
    // make sure the data is an array and has length
    if (Array.isArray(list) && list.length > 0) {
      // get the latitude and longitude and update the coords of the store
      // this will cause the store to update the currentWeather and dayHourWeather stuff through reactivity
      const { lat, lon } = list[0];
      store.setCoordinates(lat, lon);
    }
  });

  return {
    isFetching: request.isFetching,
    error: request.error,
  };
}