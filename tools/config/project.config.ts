import { join } from 'path';

import { SeedConfig } from './seed.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'AOS-FLIGHT';
    this.ENABLE_SCSS = true;

    this.mergeObject(this.SYSTEM_CONFIG_DEV['paths'], {
      'immutable': 'node_modules/immutable/dist/immutable.js',
      'optional-js': 'node_modules/optional-js/dist/optional.min.js',
      'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api/index.js',
      '@ngrx/core': 'node_modules/@ngrx/core/bundles/core.min.umd.js',
      '@ngrx/store': 'node_modules/@ngrx/store/bundles/store.min.umd.js',
      '@ngrx/store-devtools': 'node_modules/@ngrx/store-devtools/bundles/store-devtools.min.umd.js',
      // 'traceur': 'node_modules/traceur/dist/'
    });

    this.SYSTEM_BUILDER_CONFIG.packageConfigPaths = [
      ...this.SYSTEM_BUILDER_CONFIG.packageConfigPaths,
      join('node_modules', '@ngrx', '*', 'package.json')
    ];

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      {src: `node_modules/ng2-toasty/style.css`, inject: true, vendor: true},
      {src: `node_modules/ng2-toasty/style-material.css`, inject: true, vendor: true}
    ];

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });


    this.mergeObject(this.SYSTEM_CONFIG_DEV['paths'], {
      'ng2-toasty': 'node_modules/ng2-toasty/index.js'
    });

    this.mergeObject(this.SYSTEM_BUILDER_CONFIG['packages'], {
      'ng2-toasty': {
        main: './index.js',
        defaultExtension: 'js'
      },
    });
  }

}
