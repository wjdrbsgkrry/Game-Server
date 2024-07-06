import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);

const dirName = path.dirname(fileName);

const basePath = path.join(dirName, '../../assets');

let gameAssets = {};
const readFileAsync = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(basePath, fileName), 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

export const loadGameAssets = async () => {
  try {
    const [stages, items, itemUnlocks] = await Promise.all([
      readFileAsync('stage.json'),
      readFileAsync('item.json'),
      readFileAsync('item_unlock.json'),
    ]);
    gameAssets = { stages, items, itemUnlocks };
    return gameAssets;
  } catch (error) {
    throw new Error('Failed to load game assets: ' + error.message);
  }
};

export const getGameAssets = () => {
  return gameAssets;
};
