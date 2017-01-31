import Elixir from 'laravel-elixir';
import path from "path";
import filter from 'gulp-filter';
import {assignIn} from 'lodash';

let gulpTslint, concat, fs;

class TslintTask extends Elixir.Task {
    constructor(name, paths, options) {
        super(name, null, paths);

        if (Elixir.isWatching()) {
            options = assignIn(options, {emitError: false});
        }
        this.options = options;
    }

    /**
     * Lazy load the task dependencies.
     */
    loadDependencies() {
        gulpTslint = require('gulp-tslint');
        concat = require('gulp-concat');
        fs = require('fs');
    }

    /**
     * Build the Gulp task.
     */
    gulpTask() {
        return (
            gulp
                .src(this.paths.src.path)
                .pipe(this.tslint())
                .pipe(this.tslintReport())
                .on('error', this.onError())
                .pipe(this.onSuccess())
        )
    }

    tslint() {
        this.recordStep('Linting Typescript');

        return gulpTslint(this.options);
    }

    tslintReport() {
        return gulpTslint.report(this.options);
    }

    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(path.join(this.paths.src.baseDir, "**/*.ts"))
            .ignore(this.paths.output.path);
    }
}

export default TslintTask;