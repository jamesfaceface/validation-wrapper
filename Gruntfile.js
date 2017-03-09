module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
		
        // Metadata.
		version: process.env.APPVEYOR_BUILD_VERSION || '1.0.0',
        pkg: grunt.file.readJSON('package.json'),
		bannerContent:
			' <%= pkg.name %> v<%= version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> (<%= pkg.repository %>)\n' +
			'Licenses: <%= _.pluck(pkg.licenses, "type").join(", ") %>\n',
        scriptBanner: '/*<%= bannerContent %>*/\n\n',
        markupBanner: '<!--<%= bannerContent %>-->\n\n',
		
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
			productionScript: {
				options: {
					banner: '<%= scriptBanner %>'
				},
				files: {
					'dist/<%= pkg.name %>.min.js': 'obj/<%= pkg.name %>.min.js',
					'dist/<%= pkg.name %>-template.min.js': 'obj/<%= pkg.name %>-template.min.js',
					'dist/<%= pkg.name %>.min.css': 'obj/<%= pkg.name %>.min.css',
					'dist/<%= pkg.name %>.js': 'src/<%= pkg.name %>.js',
					'dist/<%= pkg.name %>-template.js': 'src/<%= pkg.name %>-template.js',
					'dist/<%= pkg.name %>.css': 'src/<%= pkg.name %>.css'
				}
			},
			productionMarkup: {
				options: {
					banner: '<%= markupBanner %>'
				},
				files: {
					'dist/<%= pkg.name %>-template.html': 'src/<%= pkg.name %>-template.html'
				}
			}
		},
		clean: {
			obj: ['obj']
		}
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task.
    grunt.registerTask('production', [
		'uglify:production',
		'cssmin:production',
		'concat:productionScript',
		'concat:productionMarkup',
		'clean'
	]);
};
