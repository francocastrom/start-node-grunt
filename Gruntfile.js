module.exports = function(grunt) {
	var localfolder = 'http://localhost/project_folder/src'
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
		    all: {
		      options:{
		        port: 9000,
		        hostname: 'localhost',
		        //base: 'grunt',
		        //keepalive: true,
		        livereload: true
		      }
		    }
		 },

		 // JS
		jshint: {
	      files: ['src/assets/js/main.js'  ],
	      options: {
	        // options here to override JSHint defaults
	        globals: {
	          jQuery: true,
	          console: true,
	          module: true,
	          document: true
	        }
	      }
	    },
        concat: {   
		    dev: {
		        src: [
		        	'src/assets/js/plugins/*.js',
		            'src/assets/js/main.js'  
		        ],
		        dest: 'src/assets/js/prod.js',
		    },
		    bootstrap: {
		        src: [
		          'src/assets/js/bootstrap/transition.js',
		          'src/assets/js/bootstrap/alert.js',
		          'src/assets/js/bootstrap/button.js',
		          'src/assets/js/bootstrap/carousel.js',
		          'src/assets/js/bootstrap/collapse.js',
		          'src/assets/js/bootstrap/dropdown.js',
		          'src/assets/js/bootstrap/modal.js',
		          'src/assets/js/bootstrap/tooltip.js',
		          'src/assets/js/bootstrap/popover.js',
		          'src/assets/js/bootstrap/scrollspy.js',
		          'src/assets/js/bootstrap/tab.js',
		          'src/assets/js/bootstrap/affix.js'
		        ],
		        dest: 'src/assets/js/bootstrap.js'
		      }
		},
		uglify: {
		    dev: {
		        src:  'src/assets/js/prod.js',
		        dest: 'dist/assets/js/prod.min.js'
		    },
		    bootstrap: {
		        src:  'src/assets/js/bootstrap.js',
		        dest: 'dist/assets/js/bootstrap.min.js'
		    }
		},

		// CSS
		less: {
		      development: {
		        options: {
		          //compress: true,
		          //yuicompress: true,
		          optimization: 2
		        },
		        files: {
		          // target.css file: source.less file
		          "src/assets/css/main.css": "src/assets/less/main.less",
		          "src/assets/css/bootstrap.css": "src/assets/less/bootstrap/bootstrap.less",
		          "src/assets/css/theme.css": "src/assets/less/bootstrap/theme.less"
		        }
		      }
		},
		autoprefixer: {
            dist: {
                files: {
                    'src/assets/css/main.css': 'src/assets/css/main.css'
                }
            }
        },
	    cssmin: {
		  minify: {
		    expand: true,
		    cwd: 'src/assets/css/',
		    src: ['*.css', '!*.min.css'],
		    dest: 'src/assets/css/',
		    ext: '.min.css'
		  },
		  dist: {
		    expand: true,
		    cwd: 'dist/assets/css/',
		    src: ['*.css', '!*.min.css'],
		    dest: 'dist/assets/css/',
		    ext: '.min.css'
		  }
		},
		uncss: {
		  dist: {
		    files: {
		        	'dist/assets/css/compiled.min.css': ['src/*.html']    
		    },
		      options: {
		        report:'min'

		      }
		  }
		},
		criticalcss: {
	        custom_options: {
	            options: {
	                url: localfolder,
	                width: 1400,
	                height: 900,
	                outputfile: "src/assets/css/critical.css",
	                filename: "src/assets/css/"
	            }
	        }
	    },
		htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'style-disabled': true
		        },
		        src: ['*.html']
		    }
		},
		processhtml: {
	      dist: {
	        files: [
		          {
		          expand: true,     
		          cwd: 'src/',   
		          src: ['*.html'],
		          dest: 'dist/',  
		          ext: '.html'
		        },
		     ],
	      }
	    },

		htmlmin: {                                     // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: [
		          {
		          expand: true,     
		          cwd: 'dist/',   
		          src: ['*.html'],
		          dest: 'dist/',  
		          ext: '.html'
		        },
		     ],
		    }
		},
		responsive_images: {
		    build: {
		      options: {
		        sizes: [{
		          width: 320,
		        },{
		          width: 640
		        },{
		          width: 1024,
		        }]
		      },
		      files: [{
		        expand: true,
		        src: ['*.{jpg,gif,png}'],
		        cwd: 'src/assets/img/',
		        dest: 'src/assets/img/responsive/'
		      }]
		    }
	  	},
	  	tinypng: {
		    options: {
		      	apiKey: "Cell4HzU2erOsi2H2XOOvDWCkqI_gkfw",
		       // checkSigs: true,
		       // sigFile: 'build/img/file_sigs.json',
		        summarize: true,
		        showProgress: true,
		        stopOnImageError: true
		    },
		    compress: {
		    		expand: true, 
		      		//cwd: 'build/img/',
		            cwd: 'src/assets/img/',
		            src: ['**/*.png'],
		            dest: 'dist/assets/img/'
		    },
		  },

	  	copy: {
		  main: {
		    files: [
		      {expand: true, cwd: 'src/assets/img/', src: ['**'], dest: 'dist/assets/img/'},
		    ]
		  }
		},


	    
		watch: {
			options: {
		      livereload: true,
		    },
		    scripts: {
		        files: ['src/assets/js/*.js'],
		        tasks: ['jshint','concat','uglify'],
		        options: {
		            spawn: false,
		        },
		    },
		    stylesless:{
		    	files: ['src/assets/less/*.less'],
		    	tasks: ['less','autoprefixer','cssmin'],
		    	options: {
		    		spawn:false,
		    	}
		    },
		    html: {
		        files: ['src/*.html'],
		        tasks: ['htmlhint']
		    }
		},


		devUpdate: {
        main: {
            options: {
                updateType: 'report', //just report outdated packages
                reportUpdated: true, //don't report up-to-date packages
                semver: true, //stay within semver when updating
                packages: {
                    devDependencies: true, //only check for devDependencies
                    dependencies: false
                },
                packageJson: null, //use matchdep default findup to locate package.json
                reportOnlyPkgs: [] //use updateType action on all packages
            }
        }
    }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.



    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-htmlhint');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.loadNpmTasks('grunt-responsive-images');


    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    
    grunt.loadNpmTasks('grunt-criticalcss');

    grunt.loadNpmTasks('grunt-tinypng');

    grunt.loadNpmTasks('grunt-dev-update');
    

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [
    	'jshint',
    	'concat', 
    	'less', 
    	'autoprefixer', 
    	'cssmin:minify', 
    	'htmlhint', 
    	'responsive_images',
    	'connect', 
    	'watch']);

    grunt.registerTask('optcode', [
    	'uglify', 
	    'uncss',
	    'cssmin:dist', 
	    'processhtml',
	   	'htmlmin',
	    'copy'
  	]);

  	grunt.registerTask('optimg', [
	    'responsive_images',
	    'tinypng'
  	]);

  	grunt.registerTask('respimg', [
	    'responsive_images'
  	]);

  	grunt.registerTask('critical', [
	    'criticalcss'
  	]);

  	grunt.registerTask('dev', [
	    'connect',
	    'watch'
  	]);

  	grunt.registerTask('dist', [
  		'jshint',
    	'concat', 
    	'less', 
    	'autoprefixer', 
    	'cssmin:minify', 
    	'htmlhint', 
	    'uglify', 
	    'uncss',
	    'cssmin:dist', 
	    'processhtml',
	   	'htmlmin',
	    'responsive_images',
	    'tinypng'
  	]);

};
