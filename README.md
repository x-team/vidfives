video-fives
====

Install
----

Clone the repo, then:

- install dependencies: `npm install`

- configure:
 - `cp sample-env my-env`
 - edit `my-env` with environment variables for your site

- run: `source my-env && npm start`

Uploaded video/audio
----

When you upload a video it goes to the `user-data/` directory. You can use the basename of that file (the part before the `.webm` extension) as an ID and open `http://$HOST:$PORT/play/<ID>` to view.

License
----

MIT
