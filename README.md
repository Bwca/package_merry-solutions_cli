# Cast

## Well, what is it?

**@merry-solutions/cli** is a cli-tool designed to do the heavylifting when developing components requiring alot of boilerplate. It is originally intended for use with React, but can also be used for generating basically any set of files based on `moustache` templates.

Use existing presets or create your own with `moustache` templates.

## How to use it

Install as dev dependency

```node
npm i -D @merry-solutions/cli
```

Add to scripts in the `package.json`.

```ts
"cast": "cast"
```

Or simply run from command line without installation:

```node
npx @merry-solutions/cli {some arguments here}
```

i.e.

```node
npx @merry-solutions/cli cool-stuff/CoolHook --itemType=hook
```

Generate an item using one of the preset templates, currently component and hook creating is supported.

Example to generate a hook:

```node
npm run cast -- shared/hooks/MyAwesomeHook --itemType=hook
```

Would generate a hook in `src/shared/hooks/MyAwesomeHook` based on the preset template.

Example to generate a component:

```node
npm run cast -- components/MyAwesomeComponent --itemType=component
```

Would generate a component in `src/components/MyAwesomeComponent` based on the preset template.

## Full list of params

**itemType** = required, should correspond to the name of a subfolder in the provided `templatesRoot` directory.

**templatesRoot** = optional, relative path to your custom folder with tempaltes, see below how to create your own templates.

**nameCase** = optional, name case for the entity name inside the template file, can be either set to `camelCase` or `PascalCase`. Defaults to `PascalCase`, is used to convert file name to entity name if the file name contains dashes or underscores.

**folderPrefix** = optional, prepend item folder with a string, i.e. `--folderPrefix=use-` for a hook.

Also can add any additional amount of `--key=value` pairs for replacements. I.e. if your template looks like:

```mustache
// ./templates/random/random.txt.mustache
Hello, {{ name }}! I am {{ reaction }} to {{ verb }} you!
```

You can generate a file from it using the following command (yes, it is included in the default templates folder for demo purposes):

```node
npx @merry-solutions/cli --itemType=random  some-random-stuff/happy-to-see-bob-file --name=Bob --reaction=happy --verb=see
```

## Creating your own templates

Is pretty easy. You need a folder for templates, which would hold a collection of subfolders, each named same as the eitity you are attempting to create, i.e. the default templates folder has 2 subfolders: `component` and `hook`, so you can only create these two if you're using defaults.

Let's assume you want to create your own template for component, you would have to create a directory with a subfolder named after the type of the item you plan to create, i.e. `my-templates/component`.

```txt
project
└───src
│
└───my-templates
│   └───component
│       │   component.model.ts.mustache
│       │   component.tsx.mustache
│       │   ...
```

Place some `moustache` templates inside, note that if file name contains the subdirectory name in it, it will be swapped for the item name during file generation, i.e. `component.tsx.mustache` => `SomeComponent.tsx`.

The variable used in templates should hold same name as the subfolder, i.e. for the `component` we'd have:

```ts
// component.tsx.mustache
import { FC } from "react";

import { {{ component }}Props } from "./{{ component }}.model";
import style from "./{{ component }}.module.scss";

export const {{ component }}: FC<{{ component }}Props> = ({}: {{ component }}Props) => {
    return <div className={style.{{ component }}}>{{ component }} works!</div>;
};
```

Now simply invoke `cast` to create new files based on the provided templates by passing the template root as the `templatesRoot` param, i.e.:

```ts
npm run cast -- shared/components/MyComponent --itemType=component --templatesRoot=./templates/
```

See sample templates in the templates folder of this repo or check the [demo react repo](https://github.com/Bwca/demo__cast) for templates folder and commands for generating files in `package.json`.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/bwca)
