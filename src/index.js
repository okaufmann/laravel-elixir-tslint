import Elixir from 'laravel-elixir';
import TslintTask from './TslintTask';
import path from "path";

Elixir.config.typescript = {
    folder: path.join(Elixir.config.assetsPath, "typescript")
};

/*
 |----------------------------------------------------------------
 | Typescript
 |----------------------------------------------------------------
 |
 | TypeScript is a typed superset of JavaScript that
 | compiles to plain JavaScript. Any browser. Any host.
 | Any OS. Open source.
 |
 */

Elixir.extend('tslint', function (scripts, options) {
    new TslintTask(
        'tslint', getPaths(scripts), options
    );
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|Array} src
 * @param  {string|null}  output
 * @return {GulpPaths}
 */
var getPaths = function (src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || Elixir.config.typescript.folder)
        .output(output || Elixir.config.get('public.js.outputFolder'), 'all.js');
};