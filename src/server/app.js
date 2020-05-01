require('svelte/register');
const path = require('path');
const express = require('express');
const app = express();
const compression = require('compression');
const AppComponent = require('../App.svelte').default;

app.disable('x-powered-by');

if (process.env.NODE_ENV === 'production') {
  app.use(compression({ level: 6 }));
}

app.use(express.static('public', { index: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res, next) => {
  const { html, head } = AppComponent.render({
    name: 'world',
  });

  res.render(
    'index',
    {
      lang: 'zh-TW',
      html,
      head,
    },
    (err, html) => {
      if (err) {
        next(err);
        return;
      }
      res.send(html).end();
    }
  );
});

app.listen(8080, () => {
  console.log(`now listening on 8080`);
});
