var request = require('request');
var cheerio = require('cheerio');

request('http://www.chattanoogapulse.com/', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('a.event_title').each(function(i, element){
      var a = $(this);
      var title = a.text();
      var url = a.attr('href');
      // Our parsed meta data object
      var metadata = {
        title: title,
        url: url,
      };
      console.log(metadata);
    });
  }
});
