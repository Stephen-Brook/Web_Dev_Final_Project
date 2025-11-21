# Vue Weather Application
## Stephen Brook & Aleksandr Means
This is a simple weahter application designed to show off the Vue framework, and relavent third party libraries that are helpful.
The cool technologies in this project include:
- [VueUse](https://vueuse.org) for fetching api data
- [PrimeVue](https://primevue.org) for excelent third party components such as accordians and datatables
- [PrimeFlex](https://primeflex.org) a tailwind like styling library
- [FormKit](https://formkit.com) a library for creating highly customizable forms

# Getting Started
## API Key
 - Create an account here: https://home.openweathermap.org/users/sign_in
 - Get an api key
 - Create a ```.env``` file at the root of your directory
 - Pase this in your ```.env``` file, be sure to put your actual API Key
   ```bash
    VITE_WEATHER_API_KEY=apikey
   ```

## Install Dependencies
```bash
npm i
```

## Run
To run the application in development mode, run
```bash
npm run dev
```

## Modify Port
 - I configured the app to run on port ```3005``` by default, if you want to reconfigure it you can edit the ```vite.config.ts``` file

