# Right Travel

An iPhone-friendly progressive web app for a first independent trip to Peru. Built with plain JavaScript and CSS, with no production dependencies or account requirement.

## Try it

https://eldar0904.github.io/right-travel/

On iPhone, open the link in Safari, tap Share, then **Add to Home Screen**. Enable **Open as Web App** if offered. Open the Home Screen icon while online and tap **Prepare offline pack** before testing in airplane mode.

## Included in this test version

- Lima and Cusco destination briefings.
- Searchable, categorized guidance with sources and review dates.
- Saved guidance cards and city selection.
- Three interactive scam-awareness practice situations.
- Trip dates, accommodation details, trusted contact, notes and custom checklist items.
- JSON backup export and an explicit local-data reset.
- Peru emergency phone links, useful Spanish phrases and official resources.
- A service worker that caches the app and entire bundled guidance library, plus an offline pack check.
- Install manifest, iOS touch icon, safe-area layout and standalone display mode.

## Data and limits

Trip data is stored in localStorage on the current device. Saving details requires tapping Save; checklist and bookmark changes save immediately. There is no backend, syncing, analytics, live incident feed, or emergency dispatch. A browser tab and an installed iOS app can have separate storage. Export backups before clearing site data. The current build exports backups but does not import them.

The bundled guidance is a dated test dataset, reviewed November 25, 2026. Sources are linked in the app. Customs suggestions and illustrative practice scenarios are explicitly labeled. It is not comprehensive legal or medical advice. External source pages are not cached; calls require telephone service. Offline storage can be evicted by the device.

## Local development

Node 20 or later; no install step.

```sh
npm test
npm start
```

Open http://127.0.0.1:4174/right-travel/. All deployed assets use relative paths so GitHub Pages project hosting works without rewriting paths.

PNG app icons are checked in. To regenerate: `node scripts/generate-icons.mjs`.

## Publishing

GitHub Pages serves `docs/` from `main`. Push updated files to main to republish. When changing cached application files, increment the cache version consistently in `docs/sw.js` and `docs/app.js`.

## Manual acceptance test

1. Switch to Cusco and open altitude guidance; follow a source link.
2. Save two cards, reload and check the Saved filter.
3. Save a trip, tick checklist items and add a personal reminder. Reload and verify persistence.
4. Try a practice situation and review feedback.
5. Prepare the offline pack; disconnect and reload. Reopen guidance, trip details and help.
6. On iPhone, add to Home Screen and repeat from the installed app. Verify standalone display, touch icon, keyboard, date inputs, dialog scrolling and bottom navigation safe area.
7. Export a JSON backup; inspect it locally. Reset data only after confirming the reset dialog.

Do not place private trip data, tokens or credentials in this repository. Nothing entered in the app is sent to GitHub as a record; GitHub hosts the static files and receives normal hosting requests.
