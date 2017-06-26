var utils = require('utils');
var fs = require('fs');
var casper = require('casper').create({
  clientScripts: [
    'http://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'
  ],
  verbose: true,
  logLevel: "debug"
});

var commits = null;

var type = casper.cli.args[0];
var name = casper.cli.args[1];

casper
  .start('http://172.16.0.52/caa/' + type + '/' + name + '/commits/master?limit=512')

  .then(function() {
      this.evaluate(function() {
        $('#user_login').val('peck.zeg@gmail.com').trigger('input');
        $('#user_password').val('p1ckz1gdr1am').trigger('input');
        $('input.btn.btn-save[type="submit"][name="commit"]').click();
      });
  })

  .then(function() {
    commits = this.evaluate(function() {
      return $('div[id*="project_"] .commits-row .commit-list .commit').map(function() {
        var commit = $('.commit-actions .commit-short-id.btn.btn-transparent', this).text();
        var datetime = $('.commit-content .commiter time', this).attr('datetime');
        var author = $('.commit-author-link', this).text();
        var link = $('.commit-row-message', this).attr('href');

        return {
          commit: commit,
          datetime: +new Date(datetime),
          author: author,
          link: 'http://172.16.0.52' + link + '?w=1'
        };
      }).toArray();
    });

    this.each(commits, function(self, commit) {
      this.thenOpen(commit.link, function() {
        var info = this.evaluate(function() {
          var info = { };

          __utils__.echo($('.files-changed .commit-stat-summary strong').text());

          $('.files-changed .commit-stat-summary strong').each(function() {
            var txt = $(this).text();
            var changedFiles = /^(\d+)\s+changed files$/.exec(txt);
            var additions = /^(\d+)\s+additions$/.exec(txt);
            var deletions = /^(\d+)\s+deletions$/.exec(txt);

            if (changedFiles) {
              info.changedFiles = +changedFiles[1];
            }

            else if (additions) {
              info.additions = +additions[1];
            }

            else {
              info.deletions = +deletions[1];
            }
          });

          return JSON.stringify(info);
        });

        this.echo(info)

        if (info) {
          utils.mergeObjects(commit, JSON.parse(info));
        }

        utils.mergeObjects(commit, { project: type + '-' + name });
        // this.echo(typeof Object.assign)
      });
    });

    this.then(function() {
      this.echo(JSON.stringify(commits, null, 2));
      fs.write('/tmp/commits-data/' + type + '-' + name + '.json', JSON.stringify(commits));
    });
  })

  .run();
