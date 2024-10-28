<script setup></script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-y-10">
    <h1 class="text-foreground text-6xl font-Abril">Bienvenue!</h1>
    <p class="text-xl w-[50%] leading-10 font-Work">
      Explorez un univers cinématographique varié, de tous genres et horizons.
      Que vous soyez fan d’action, de drame ou de comédies, Webflix a ce qu’il
      vous faut pour une immersion totale, votre destination ultime pour le
      cinéma à portée de clic !
    </p>
    <div class="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-16 w-auto"
          src="./../assets/webflix_logo.svg"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-Abril leading-9 tracking-tight text-foreground"
        >
          Connectez-vous
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm text-foreground">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="email"
              class="block text-base font-Work font-bold leading-6"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 text-background py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-base font-Work font-bold leading-6"
                >Password</label
              >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-chart- 4 hover:text-primary"
                  >Mot de passe oublié ?</a
                >
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-base font-Work font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-chart-4">
          Devenir membre?
          <a
            href="#"
            class="font-bold font-Work leading-6 text-chart-4 hover:text-primary"
            >Créez-vous un compte !</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
