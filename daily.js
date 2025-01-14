import csvToJson from "convert-csv-to-json";
import { createWriteStream } from "fs";
import fs from "fs/promises";
import path from "path";
import { Readable } from "stream";

const URLS = [
  "https://wahapedia.ru/wh40k10ed/Last_update.csv",
  "https://wahapedia.ru/wh40k10ed/Detachment_abilities.csv",
  "https://wahapedia.ru/wh40k10ed/Enhancements.csv",
  "https://wahapedia.ru/wh40k10ed/Abilities.csv",
  "https://wahapedia.ru/wh40k10ed/Stratagems.csv",
  "https://wahapedia.ru/wh40k10ed/Datasheets_abilities.csv",
  "https://wahapedia.ru/wh40k10ed/Datasheets.csv",
  "https://wahapedia.ru/wh40k10ed/Factions.csv",
];

const fetchDataAndWriteToFS = async (dirname, url) => {
  const lastUpdateURL = url;
  const filename = lastUpdateURL.split("/").pop();
  console.log(dirname, url);
  const response = await fetch(lastUpdateURL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from WAHAPEDIA - ${response.statusText}`
    );
  }

  if (response.body) {
    let writer = createWriteStream(`${dirname}/${filename}`);
    Readable.fromWeb(response.body).pipe(writer);
  }
};

const convertCSVtoJSON = async () => {
  const files = await fs.readdir("csv/");
  files.forEach(async (file) => {
    console.log(file);
    const parsedPath = path.parse(file);
    // await fs.writeFile(`data/${parsedPath.name}.json`, "");
    csvToJson
      .fieldDelimiter("|")
      .formatValueByType(true)
      .generateJsonFileFromCsv(`csv/${file}`, `data/${parsedPath.name}.json`);
  });
};

// URLS.forEach(async (url) => {
//   await fetchDataAndWriteToFS("csv/", url);
// });
await convertCSVtoJSON();
