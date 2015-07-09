video-fives
====

Install
----

Clone the repo, then:

```
npm install
npm start
```

and open a browser to <http://localhost:8000>

When you upload a video it goes to the `user-data/` directory. You can use the basename of that file (the part before the `.webm` extension) as an ID and open `http://localhost:8000/play/<ID>` to view.
