# MyFirstApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.

## HttpTransferCache security alert

The update for GHSA-39pv-4j6c-2g6v (CVE-2026-54266) is blocked, not resolved.
The oldest listed patch is Angular 20.3.25, but the advisory check also flags a
related cache-key ambiguity vulnerability fixed in 20.3.27. A normal npm
lockfile-only install with `@angular/common` set to `~20.3.27` failed with
`ERESOLVE`: npm selected common 20.3.33, which requires core 20.3.33, while this
project uses core 11.2.14. The attempted constraint was reverted; the lockfile
still resolves common 11.2.14. No forced or legacy-peer-dependency install was used.
A reviewer must coordinate an Angular framework/toolchain migration; Angular
20.3.27 requires matching core, compiler-cli requires TypeScript >=5.8 <6.0,
and core requires zone.js ~0.15.0.

### Reachability Assessment

**Not reachable in this application (high confidence).** `src/main.ts` bootstraps
`AppModule` in the browser; `src/app/app.module.ts` imports only `BrowserModule`
and `FormsModule`. `angular.json` has no SSR/server target. The project has no
HTTP client calls, `HttpTransferCache`, `TransferState`, hydration providers,
server transfer-state modules, or Angular Universal/platform-server dependency.
It is not actively exposed to the described SSR cache-collision path; an update
would primarily satisfy vulnerability scanners. The advisory's `transferCache:
false` and `withNoHttpTransferCache()` workarounds cannot be applied here: there
are no HTTP calls to configure, and those APIs are not available in Angular 11.
Do not add SSR/hydration without first upgrading to a patched framework.

### Validation

Two missing commas in `package.json` were repaired to permit npm to parse it.
The manifest now parses and its dependency declarations match the unchanged
lockfile. Before the repair, build, test, and lint failed with `EJSONPARSE`.
Afterward, `npm run build`, `npm test -- --watch=false --browsers=ChromeHeadless`,
and `npm run lint` stop at `ng: not found` because dependencies are not installed.
No passing build, test, or lint result is claimed.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
