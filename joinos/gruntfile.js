var toml = require("toml");
var S = require("string");

module.exports = function(grunt) {
	grunt.initConfig({
		// running `grunt less` will compile once
 		sass: {
			development: {
				options: {
					//paths: ["./css"],
					//yuicompress: true
				},
			files: {
				"static/css/website.css": "src/scss/pebble.scss"
			}
		}
	},
	// running `grunt watch` will watch for changes
	watch: {
		css: {
			files: "src/scss/modules/*.scss",
			tasks: ["sass"],
		}
	}
});
	//grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

};
