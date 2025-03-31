
/*global module:false*/
module.exports = function(grunt) {
    var sourceFiles = [
        'js/game.js',
        'js/entities/entities.js',
        'js/entities/HUD.js',
        'js/screens/title.js',
        'js/screens/play.js',
        'js/screens/gameover.js',
    ];
    // Project configuration.
    grunt.initConfig({
        uglify: {
            options: {
                report: 'min',
                preserveComments: 'some'
            },
            dist: {
                files: {
                    'build/clumsy-min.js': [
                        sourceFiles
                    ]
                }
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            beforeConcat: {
                files: {
                    src: sourceFiles
                }
            },
            afterConcat: {
                files: {
                    src: [ sourceFiles ]
                }
            }
        },
        connect : {
            root : {
                options : {
                    port : process.env.PORT || 8001,
                    keepalive : true,
                    host: '*'
                }
            }
        },
        clean: {
            dist: [
                'build/clumsy-min.js',
                'build/images'
            ],
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'data/img/',
                        src: ['**/*.png'],
                        dest: 'build/img/'
                    }
                ]
            }
        },  
        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        src: ['index.html'],
                        dest: 'build/'
                    }
                ]
            }
        } 

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-copy');


    // Default task.
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('lint', ['jshint:beforeConcat', 'concat', 'jshint:afterConcat']);
    grunt.registerTask('build', ['clean', 'uglify', 'copy:html', 'copy:images']);
    grunt.registerTask('server', ['connect:root']);
    
};
