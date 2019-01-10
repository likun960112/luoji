const gulp = require("gulp");
gulp.task("copy-html", function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("lk"))
	.pipe(connect.reload());
})

gulp.task("images", function(){
	return gulp.src("images/**/*")
	.pipe(gulp.dest("lk/images"))
	.pipe(connect.reload());
})

gulp.task("data", function(){
	return gulp.src(["*.json", "*.xml", "!package.json"])
	.pipe(gulp.dest("lk/data"))
	.pipe(connect.reload());
})

gulp.task("build", ["copy-html", "images", "data"], function(){
	console.log("编译成功");
})
gulp.task("watch", function(){
	gulp.watch("*.html", ['copy-html']);
	gulp.watch("images/**/*", ['images']);
	gulp.watch(["*.json", "*.xml", "!package.json"], ['data']);
	gulp.watch("stylesheet/*.scss", ["scss"]);
	gulp.watch("*.js", ['javascript']);	
})

const scss = require("gulp-sass-china");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function(){
	return gulp.src("stylesheet/*.scss")
	.pipe(scss())
	.pipe(gulp.dest("lk/css"))
	.pipe(minifyCSS())
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".css";
	}))
	.pipe(gulp.dest("lk/css"))
	.pipe(connect.reload());
})  

const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
gulp.task("javascript", function(){
	return gulp.src(["*.js", "!gulpfile.js"])
	.pipe(gulp.dest("lk/js"))
	.pipe(uglify())
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".js";
	}))
	.pipe(gulp.dest("lk/js"))
	.pipe(connect.reload());
})

const connect = require("gulp-connect");

gulp.task("server", function(){
	connect.server({
		root: "lk",  //指定服务器的根目录
		port: 6464, //设置一个端口号
		livereload: true
	})
})

gulp.task("default", ["watch", "server"]);