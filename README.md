Zype Mobile Parallax Challenge
------------------------------
**Files**

 - dist
   - built code
 - src
   - scripts
     - apiHandler.js - handles api request and building of HTML elements with data received
     - app.js - initializes the app
     - parallax.js - handles parallax functions
   - styles
     - base
       - bootstrap-grid.less
       - globals.less - global styles
       - normalize.less
       - variables.less - reusable variables
     - components
       - video.less - styles for video component
     - main.less - imports all LESS
   - gulpfile.js 
     - commands available:
       - 'gulp' - runs browser-sync, watch, and compiles all html, scripts, and styles
       - 'watch' - watches for changes
       - 'styles' - compiles css
       - 'scripts' - compiles scripts
       - 'html' - migrates html
  

**Tech Used**

 - Bootstrap grid
 - Normalize.css
 - jQuery

**Dev Tech used:**

 - ES6/ES5
 - Babel-core
 - Browser-sync
 - Gulp
 - Gulp-autoprefixer
 - Gulp-babel
 - Gulp-concat
 - LESS
 - Gulp-less
 - Gulp-plumber
 - Gulp-rename