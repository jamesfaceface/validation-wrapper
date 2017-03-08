/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n',
        // Task configuration.
        uglify: {
            production: {
                files: {
                    'obj/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js',
					'obj/<%= pkg.name %>-template.min.js': 'src/<%= pkg.name %>-template.js'
                }
            }
        },
        cssmin: {
            production: {
                files: {
                    'obj/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.css'
                }
            }
        },
		concat: {
            options: {
                banner: '<%= banner %>'
            },
			production: {
				files: {
					'<%= pkg.name %>/<%= pkg.name %>.min.js': 'obj/<%= pkg.name %>.min.js',
					'<%= pkg.name %>/<%= pkg.name %>-template.min.js': 'obj/<%= pkg.name %>-template.min.js',
					'<%= pkg.name %>/<%= pkg.name %>.min.css': 'obj/<%= pkg.name %>.min.css',
					'<%= pkg.name %>/<%= pkg.name %>.js': 'src/<%= pkg.name %>.js',
					'<%= pkg.name %>/<%= pkg.name %>-template.js': 'src/<%= pkg.name %>-template.js',
					'<%= pkg.name %>/<%= pkg.name %>.css': 'src/<%= pkg.name %>.css'
				}
			}
		},
		copy: {
			production: {
				files: [
					{src: ['src/<%= pkg.name %>*.html'], dest: '<%= pkg.name %>/'}
				]
			}
		},
		clean: {
			obj: ['obj']
		}
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task.
    grunt.registerTask('production', ['uglify:production', 'cssmin:production', 'concat:production', 'copy:production', 'clean']);

};
