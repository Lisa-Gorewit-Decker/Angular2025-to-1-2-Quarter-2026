# MyFirstApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## Hydration and HttpTransferCache security alerts

Angular framework and CLI packages are pinned to 20.3.32, resolving
GHSA-rgjc-h3x7-9mwg (CVE-2026-54267) and the previously blocked
GHSA-39pv-4j6c-2g6v (CVE-2026-54266) update. The oldest listed hydration
patch is 20.3.25, but advisory checks flag related i18n and HTTP cache issues
fixed in 20.3.27 and a router issue fixed in 20.3.32.
The coordinated update uses TypeScript 5.9 and zone.js 0.15.1.
Codelyzer pulled in Angular 9, so linting was migrated from TSLint to ESLint
without converting the application to standalone components.

Use Node.js 20.19+, 22.12+, or 24+ as required by Angular 20.

### Reachability Assessment

**Not reachable in this application (high confidence).** `src/main.ts` bootstraps
`AppModule` in the browser; `src/app/app.module.ts` imports only `BrowserModule`
and `FormsModule`. `angular.json` has no SSR/server target. The project has no
HTTP client calls, `HttpTransferCache`, `TransferState`, hydration providers,
server transfer-state modules, or Angular Universal/platform-server dependency.
`src/app/app.component.html` also has no dynamic/user-controlled IDs or state
container. It is not actively exposed to the described hydration DOM-clobbering
or HTTP response-cache poisoning paths; this update primarily satisfies
vulnerability scanners rather than addressing an active risk.

### Validation

Validated with a clean `npm ci --ignore-scripts`, `npm run build`,
`npm run build -- --configuration production`, `npm run lint`, and
`CHROME_BIN=/usr/bin/chromium npm test -- --watch=false --browsers=ChromeHeadlessCI`
(three passing tests). Application and spec TypeScript checks also pass.
The stale unit tests referenced a nonexistent title and heading; they now
verify the actual detail toggle, click log, and fifth-entry styling.
A headless Chromium smoke check confirmed that the served app renders.
The existing Protractor e2e test still expects a nonexistent welcome heading;
that pre-existing test is unchanged and was not run.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `--configuration production` for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Start the development server with `npm start`, then run `npm run e2e` in a
separate terminal to execute the existing tests via [Protractor](http://www.protractortest.org/).
Angular 20 no longer runs Protractor through `ng e2e`; the npm script invokes
the installed runner directly. Protractor requires a compatible ChromeDriver.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
