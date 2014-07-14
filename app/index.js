'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var ncp = require('ncp').ncp;
var yeoman = require('yeoman-generator');

var JoeyHtmlGenerator = module.exports = function JoeyHtmlGenerator() {
    yeoman.generators.Base.apply(this, arguments);

  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JoeyHtmlGenerator, yeoman.generators.Base);

// JoeyHtmlGenerator.prototype.askFor = function askFor() {
//   var cb = this.async();

//   // have Yeoman greet the user.
//   console.log(this.yeoman);

//   var prompts = [{
//     type: 'confirm',
//     name: 'someOption',
//     message: 'Would you like to enable this option?',
//     default: true
//   }];

//   this.prompt(prompts, function (props) {
//     this.someOption = props.someOption;

//     cb();
//   }.bind(this));
// };

// JoeyHtmlGenerator.prototype.app = function app() {
//   this.mkdir('app');
//   this.mkdir('app/templates');

//   this.copy('_package.json', 'package.json');
//   this.copy('_bower.json', 'bower.json');
// };

JoeyHtmlGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('_gitignore', '.gitignore');
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('index.html', 'index.html');

    this.mkdir('src');
    this.mkdir('src/css');
    this.mkdir('src/js');
    this.mkdir('src/images');
    this.directory('src/css', 'src/css');
    this.directory('src/js', 'src/js');

    if (fs.existsSync('css')) {
        ncp('css', 'src/css', function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }
    else {
        this.mkdir('css');
    }

    if (fs.existsSync('images')) {
    }
    else {
        this.mkdir('images');
    }

    if (fs.existsSync('js')) {
        ncp('js', 'src/js', function (err) {
            if (err) {
                return console.error(err);
            }
        });
    }
    else {
        this.mkdir('js');
    }

    fs.symlink('/Users/joeynguyen/Dropbox/Coding/yeoman/node_modules', 'node_modules');
};
