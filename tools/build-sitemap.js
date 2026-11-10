// Rebuilds sitemap.xml from js/songs-data.js.
// Run from the repository folder after adding or removing songs:
//   node tools/build-sitemap.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const SITE = 'https://laginadavislyrics.com/';

const source = fs.readFileSync(path.join(root, 'js', 'songs-data.js'), 'utf8');
const context = {};
vm.runInNewContext(source + '\nthis.SONGS = SONGS;', context);
const songs = context.SONGS;

const urls = [SITE, SITE + 'songs.html']
  .concat(songs.map(song => SITE + 'song.html?id=' + encodeURIComponent(song.id)));

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => '  <url><loc>' + u.replace(/&/g, '&amp;') + '</loc></url>').join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log('sitemap.xml written with ' + urls.length + ' pages (' + songs.length + ' songs).');
