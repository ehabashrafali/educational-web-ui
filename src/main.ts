/// <reference types="@angular/localize" />

import { isDevMode } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "app/app.component";
import { appConfig } from "app/app.config";
import { environment } from "environments/environment";

const configureProduction = () => {
  fetch("assets/settings.json")
    .then((response) => response.json())
    .then((config) => {
      console.log("configuring production");
      // if (window) window.console.log = function () {};
      Object.assign(environment.Config, config);
      environment.Config.Production = true;
      console.log("environment", environment);
      bootstrap();
    });
};

const configureDevelopment = () => {
  fetch("assets/settings.development.json")
    .then((response) => response.json())
    .then((config) => {
      console.log("configuring development");
      Object.assign(environment.Config, config);
      environment.Config.Production = false;
      console.log("environment", environment);
      bootstrap();
    });
};

const bootstrap = () => {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
};

isDevMode() ? configureDevelopment() : configureProduction();
