/*
 * grunt-contrib-rename (unofficial)
 * https://github.com/jasonlam604/grunt-contrib-rename
 *
 * Copyright (c) 2013 Jason Lam
 * Licensed under the MIT license.
 * https://github.com/jasonlam604/grunt-contrib-rename/blob/master/LICENSE-MIT
 */
'use strict';

var fs = require('fs');

module.exports = function(grunt) {

  grunt.registerMultiTask('rename', 'Rename file', function() {

    var options = this.options({
      force: false
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(filePair) {

      filePair.src.forEach(function(src) {

				if (!grunt.file.exists(String(filePair.src))) {
          grunt.log.writeln('Cannot rename non-existent file.');
				} else {

					if (fs.statSync(String(filePair.src)).isDirectory()) {
						grunt.log.writeln('Renaming Directory ' + filePair.src + ' -> ' + filePair.dest);
					} else {
						grunt.log.writeln('Renaming File ' + filePair.src + ' -> ' + filePair.dest);
					}

					fs.renameSync(String(filePair.src), String(filePair.dest), function (err) {
						if (err) {
							grunt.log.error();
							grunt.verbose.error();
							grunt.fail.warn('Rename operation failed.');
						}
					});
				}
      });
    });
  });
};