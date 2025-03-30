
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
                        cwd: 'images/',
                        src: ['**/*.png'],
                        dest: 'build/images/'
                    }
                ]
            }
        },
        
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.png'],
                    dest: 'build/images/'
                }]
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task.
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('lint', ['jshint:beforeConcat', 'concat', 'jshint:afterConcat']);
    // Clean build directory.
    grunt.registerTask('clean-build', ['clean:dist']);
    // Copy PNG files to build directory.
    grunt.registerTask('copy-images', ['copy:images']);
    // Optimize PNG files and copy to build directory.
    grunt.registerTask('optimize-images', ['imagemin']);
    
};
