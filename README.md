# Cast

## Well, what is it?

_Cast_ is a cli-tool designed to do the heavylifting when developing components requiring alot of boilerplate. It is as easy as casting figures in a mold.

## How to use it

1. create a folder for templates;
2. populate the template folder with entity subfolders;
3. create moustache templates to process in entity subfolders;
4. invoke _Cast_ to generate files based on the given templates.

## Example with React

Let's assume you have a React app with typescript and every time you create a component you need to generate a component folder with 5 files:

- component.tsx for the component itself;
- component.model.ts to hold the props interface;
- component.module.scss to encapsulate the stylesheet;
- component.spec.tsx for tests;
- index.ts for exporting the component.

That's alot of work, with _Cast_ you first create a folder and populate it with templates with the following naming convention: `template/{entity}`, i.e. `template/component` in our case.

The file structure would roughly look like this:

```txt
project
└───src
│
└───templates
│   └───component
│       │   component.model.ts.mustache
│       │   component.tsx.mustache
│       │   ...
```

Add some `moustache` templates to process, note that filenames need to contain entity name so they will be renamed in the process, i.e.:

```ts
// component.tsx.mustache
import { FC } from "react";

import { {{ component }}Props } from "./{{ component }}.model";
import style from "./{{ component }}.module.scss";

export const {{ component }}: FC<{{ component }}Props> = ({}: {{ component }}Props) => {
    return <div className={style.{{ component }}}>{{ component }} works!</div>;
};
```

Now simply invoke `Cast` to create new files based on the provided templates:

```ts
npx github:bwca/cast shared/components/MyComponent --itemType=component --templatesRoot=./templates/
```

See sample templates in the templates folder of this repo or check the [demo react repo](https://github.com/Bwca/demo__cast) for templates folder and commands for generating files in `package.json`.
