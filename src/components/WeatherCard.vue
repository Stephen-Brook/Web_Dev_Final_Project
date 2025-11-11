<template>
  <div class="flex-row">
    <div>
      <h2>{{ selectedLocation }}</h2>
      <h5 v-if="latitude != null && longitude != null">
        ({{ latitude }}, {{ longitude }})
      </h5>

      <div v-if="geoLoading">
        <p>"Translating into coordinates..."</p>
      </div>
      <div v-else-if="geoError !== null">
        <p>Could not translate location. Try another city.</p>
      </div>
      <div class="flex">
        <Tabs value="0">
          <TabList>
            <Tab value="0"> Current </Tab>
            <Tab value="1"> 5 Day / 3 Hour </Tab>
          </TabList>

          <TabPanels>
            <!-- current -->
            <TabPanel value="0">
              <div v-if="currentWeatherLoading">
                <h3>Loading current weather…</h3>
              </div>
              <div v-else-if="currentWeatherError">
                <h3>Couldn’t load current weather.</h3>
                <p>{{ currentWeatherError }}</p>
              </div>
              <div
                v-else
                class="flex-auto flex gap-2 align-content-between"
              >
                <Card class="flex-auto flex m-2 px-5 border-solid">
                  <template #content>
                    <CurrentTemp />
                  </template>
                </Card>
                <Card class="flex-auto flex m-2 px-5 border-solid">
                  <template #content>
                    <CurrentWind />
                  </template>
                </Card>
                <Card class="flex-auto flex m-2 px-5 border-solid">
                  <template #content>
                    <SunInformation />
                  </template>
                </Card>
              </div>
            </TabPanel>

            <!-- 5 Day / 3 Hour -->
            <TabPanel value="1">
                <div v-if="dayHourWeatherLoading">
                  <h4>Loading day hour weather</h4>
                </div>
                <div v-else-if="dayHourWeatherError">
                  <h4>Couldn't load day hour weather</h4>
                  <p>{{ dayHourWeatherError }}</p>
                </div>
                <div v-else>
                  <p>{{ dayHourWeather }}</p>
                </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';

const store = useStore()
const { selectedLocation, latitude, longitude, dayHourWeather } = storeToRefs(store);

const { error: geoError, isFetching: geoLoading } = useTranslateLocation();

const { isFetching: currentWeatherLoading, error: currentWeatherError } =
  useCurrentWeather();

const { isFetching: dayHourWeatherLoading, error: dayHourWeatherError } =
  useFiveDayThreeHour();
</script>
