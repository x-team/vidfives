/vidfive
====

Install
----

Clone the repo, then:

- install dependencies: `npm install`

- configure:
 - `cp sample-env my-env`
 - edit `my-env` with environment variables for your site
 - see the **Config** section below for more details

- run: `source my-env && npm start`

Config
----

- `PORT`: Port that the http server will listen on.
- `HOST`: This is the full hostname used to construct share links.
- `SLACK_TOKEN`: API token for slack integration. This is optional, if you leave it out everything will work except for sending the slack notification. To find out your API token view this page (when logged into slack): <https://api.slack.com/web>

Uploaded video/audio
----

When you upload a video it goes to the `user-data/` directory. You can use the basename of that file (the part before the `.webm` extension) as an ID and open `http://$HOST:$PORT/play/<ID>` to view.

Frontend updates
----

### Templates

Page templates can be found in `routes/home.js` and `routes/play.js`.

### Modifying static assets

When you `npm run build` the `dist/` directory is populated from `src/assets/`. So if you want to modify css or images, make the edit in `src/assets/` and not directly in `dist/`.

Static assets are served directly from `dist/`, so if you have an image `src/assets/foo.png`, your html would link to it as `<img src="/foo.png" />`.

License
----

MIT
