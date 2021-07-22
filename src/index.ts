import { readDir, readFile } from './file-utils';
import { render } from 'mustache';
import { join } from 'path';

const filePath = `${__dirname}/../templates/component/index.ts.mustache`;
const dir = `${__dirname}/../templates/component/`;

const x = async () => {
  const file = await readFile(filePath);
  console.log(render(file.toString(), { component: 'LOL' }));

  const files = await readDir(dir);
  console.log(files);
  files.forEach((i) => console.log(join(dir, i)));
};

x();
