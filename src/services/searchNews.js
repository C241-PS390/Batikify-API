const cheerio = require('cheerio');
const axios = require('axios');

function getNewsInfo(page, searchQuery = 'batik') {
  const searchString = searchQuery;
  const encodedString = encodeURIComponent(searchString);
  console.log(encodedString);

  const AXIOS_OPTIONS = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    },
    params: {
      q: encodedString,
      tbm: 'nws',
      hl: 'id',
      gl: 'id',
      start: page * 10 - 10 || 0,
    },
  };

  return axios.get(`http://google.com/search`, AXIOS_OPTIONS).then(function ({ data }) {
    let $ = cheerio.load(data);

    const pattern = /s='(?<img>[^']+)';\w+\s\w+=\['(?<id>\w+_\d+)'];/gm;
    const images = [...data.matchAll(pattern)].map(({ groups }) => ({
      id: groups.id,
      img: groups.img.replace('\\x3d', ''),
    }));

    const allNewsInfo = Array.from($('.WlydOe')).map((el) => {
      return {
        link: $(el).attr('href'),
        source: $(el).find('.MgUUmf span').text().trim(),
        title: $(el).find('.n0jPhd').text().trim().replace('\n', ''),
        snippet: $(el).find('.GI74Re').text().trim().replace('\n', ''),
        date: $(el).find('.OSrXXb span').text().trim(),
        image:
          images.find(({ id, img }) => id === $(el).find('.uhHOwf img').attr('id'))?.img ||
          'No image',
      };
    });

    return allNewsInfo;
  });
}

module.exports = getNewsInfo;
