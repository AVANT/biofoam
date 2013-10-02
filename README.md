Avant Documentation
===================

TODOS
-----
- stub out auth sub app

- abstract main app navigate functionality to another level up (see book)

- add a full wysiwyg editor for the about page (later abstract the about app to be static page serving app?)

- figure out how to cancel defer/promise actions once 'other' actions have been made in the app. e.g. navigate to posts/id/edit then press the browsers back button twice

- add a base view type for moonrakr, which includes animation abilities

Coccyx Documentation
====================

v0.0.1
----

DEV OPS Todos
----
- concerning jshint gutter sublime package, the package doesnt seem to respect the .jshintrc file!
- .html templates inside app/apps/** /*.html dont seem to get watched
- check if styles living in app/styles is a dependency
- dry up grunt copy tasks (need to learn more grunt-fu to do this)


* * *

Getting Started
===============

If you'd like to develop a project using this template be sure to git clone the repo, remove the .git file, and start a new git repositiory.

1. `git clone git@git-lab.evolvingmedia.org:sacrum.git` clones the repo down to your box
2. `cd sacrum && rm -rf .git` deletes the folder '.git' with flags -r for recursive and -f for force (a lot of files in .git don't like to be deleted)
3. `mv ../sacrum ../new-name` essentially renames the folder to "new-name"
4. `git init` creates a new git repo (you can also follow the git-lab instructions)

Running the Builder - First Steps - Advanced
--------------------------------------------
After you have renamed the project for your own uses or if you wanna just try it out as is:

1.`npm install`
2.`grunt dev:server`

The second command should automatically open up a tab in your default browser to the port that is servering the app.

Running the Builder - Very First Steps - Beginner Mac OS
--------------------------------------------------------
- do you have XCode installed?
- do you have homebrew installed?
- do you have git installed?
- do you have npm (with node) installed globally?
- do you have grunt-cli installed globally?

Once you can answer yes to every item move on to 'First Steps - Advanced'

Running the Builder - Very First Steps - Beginner Linux OS
----------------------------------------------------------
If you are cool enough to be running a distro of Linux then you don't need me to hold your hand through this. One thing, are you using nvm? Might want to get that tho it is not a strict requirement.

Grunt Tasks
-----------
`grunt dev`
`grunt dev:server`
`grunt test`
`grunt test:server`
`grunt build`
`grunt build:server`

All of the grunt tasks are run in the terminal when you are sitting at the root of the project's dirctory.

### grunt dev
  This task compiles all the coffee, stylus, and compass files from app and places then in a folder called ".tmp" along with vendor scripts, vendor styles, and any files you've written in JavaScript inside "app/".  This task also automatically runs the `grunt test` command.

### grunt dev:server
  This task compiles the app and launches a server to view the project on. This task also automatically runs the `grunt test` command.

### grunt test
  This task compiles the app and runs the jasmine test specs written in "test/spec/" via a headless server, phantom.

### grunt test:server
  This tasks compiles the app and runs the jasmine test specs in your default browser.

### grunt build
  This task compiles the app for a production environment including minification and requirejs optmization and places the files in a folder called "dist".  All the static files have a unqiue hash added to their names - this allows for infinite caching on the browser. The "usemin" task in the Gruntfile should automatically replace references to the new static file names in the index.html and main.css files.  This task also automatically runs the `grunt test` command.

### grunt build:server
  This task compiles the app for a production environment and creates a server for you to via the built project in your browser. This task also automatically runs the `grunt test` command.

* * *

Sacrum's Structure
==================

Main File
---------
The main file is located at the root, named *Gruntfile.js*.

Directory Structure
-------------------
.tmp/
app/
dist/
node_modules/
test/
vendor/

### .tmp/
  The .tmp folder is constructed by the builder when running the developer and testing tasks. This folder is not tracked in the git repo.

### app/
  The app folder is where you writing all your application code.  The builder only has one opinion on the folder topography of this directory.  The "app" folder must contain the index.html file in an assets, namely "app/assets/". you should also organize all your static assets in a reasonable way within this folder - images, fonts, etc.

### dist/
  The dist folder is where the built app is placed. This folder can be rsync'ed to the server where this app is hosted.  A bash script "deploy.sh" has been added to this project to template what your rsync script might look like. This folder is not tracked in the git repo.

### node_modules/
  The node_modules folder contains all the node modules used by the builder (grunt).  This folder and its contents are added once you run `npm install'.  This folder is not tracked in the git repo.

### test/
  The test folder is set up to conduct jasmine tests and the Gruntfile is also configured to support this.  All the test suites are written in files named "*Spec.js" and should be kept in the "test/spec/" folder.  You can create whatever folder structure you would like in there.  The builder will reach recursively down and pull out all files that match the node glob pattern "*Spec.js".

### vendor/
  The vendor folder contains all the vendor scripts and styles you want to use.  The "vendor/js/" folder is already filled with many useful libraries. This folder gets copied into ".tmp/js/vendor/" during developement.  And during the dist build process these files are momentarily placed in "dist/js/vendor/" for requirejs to concatenate afterwhich the files are removed.

* * *

Packages and Libraries Used
===========================

JavaScript Libraries
--------------------
- jQuery 1.10.2
- jQuery 2.0.3
- Underscore 1.4.4
- Backbone 1.0.0
- Backbone.Marionette 1.0.3
- Handlebars 1.0.0
- Handlebars.Runtime 1.0.0
- RequireJS 2.1.8
- RequireJS.Text 2.0.7
- Almond 0.2.5

Node Modules
------------
- grunt
- grunt-concurrent
- grunt-contrib-clean
- grunt-contrib-coffee
- grunt-contrib-compass
- grunt-contrib-connect
- grunt-contrib-copy
- grunt-contrib-cssmin
- grunt-contrib-handlebars
- grunt-contrib-htmlmin
- grunt-contrib-imagemin
- grunt-contrib-jasmine
- grunt-contrib-jshint
- grunt-contrib-livereload
- grunt-contrib-requirejs
- grunt-contrib-stylus
- grunt-contrib-uglify
- grunt-contrib-watch
- grunt-open
- grunt-rev
- grunt-template-jasmine-requirejs
- grunt-usemin
- matchdep

VERSION
=======

0.0.1 - fixes depreciated livereload, problems with coffee compiling distination, and a number of other issues
      - coffee now compiles with the correct dest structure on `grunt dev` tasks
      - coffee now compiles with the correct dest structure on `grunt build` tasks (note: coffee with r.js untested)
      - fixes compass compaining when there there is no main.scss file
      - wires up handlebars.runtime in require config (note: compiled templates and runtime library untested)
      - wires up imagemin to convert non-progressive jpegs to progressive format
      - auto removes the livereload script from the index file when running the `grunt build` tasks
      - breaks down watch tasks into more modular support
      - renames connect:livereload task to more aptly connect:tmp
0.0.0 - shared with team to test use in the wild
