// import csvToJson from "convert-csv-to-json";
// import { createWriteStream, readFileSync } from "fs";
// import fs, { readFile, writeFile } from "fs/promises";
// import path from "path";
// import { Readable } from "stream";
// import { compareAsc } from "date-fns";

// const URLS = [
//   "https://wahapedia.ru/wh40k10ed/Last_update.csv",
//   "https://wahapedia.ru/wh40k10ed/Detachment_abilities.csv",
//   "https://wahapedia.ru/wh40k10ed/Enhancements.csv",
//   "https://wahapedia.ru/wh40k10ed/Abilities.csv",
//   "https://wahapedia.ru/wh40k10ed/Stratagems.csv",
//   "https://wahapedia.ru/wh40k10ed/Datasheets_abilities.csv",
//   "https://wahapedia.ru/wh40k10ed/Datasheets.csv",
//   "https://wahapedia.ru/wh40k10ed/Factions.csv",
// ];
// const fetchDataAndWriteToFS = async (dirname: string, url: string) => {
//   // const lastUpdateURL = URLS[0];
//   const lastUpdateURL = url;
//   const filename = lastUpdateURL.split("/").pop();
//   const response = await fetch(lastUpdateURL);

//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch data from WAHAPEDIA - ${response.statusText}`
//     );
//   }

//   if (response.body) {
//     let writer = createWriteStream(`${dirname}/${filename}`);
//     Readable.fromWeb(response.body as any).pipe(writer);
//   }
// };

// const convertCSVtoJSON = async () => {
//   const pathNameCSV = "csv/Last_update.csv";
//   const pathNameJSON = "data/Last_update.json";
//   try {
//     const lastUpdateJSON = await readFile(pathNameJSON);
//     const lastUpdate = JSON.parse(lastUpdateJSON.toString("utf-8"))[0]
//       .updated_date;

//       const ping = new Date();

//       const comparation = compareAsc(lastUpdate, ping);
//       if (comparation === -1)
//       URLS.forEach((url) => fetchDataAndWriteToFS("csv/", url));
//     const json = [
//       {
//         last_update: lastUpdate,
//         updated_date: ping,
//       },
//     ];
//     await writeFile(pathNameJSON, JSON.stringify(json))
//     // console.log(compareAsc(lastUpdate, new Date()));
//   } catch (error) {
//     try {
//       await readFile(pathNameCSV);

//       csvToJson
//         .fieldDelimiter("|")
//         .formatValueByType(true)
//         .generateJsonFileFromCsv(pathNameCSV, pathNameJSON);
//       const lastUpdateJSON = await readFile(pathNameJSON);
//       console.log(lastUpdateJSON.toString());
//     } catch (error) {
//       try {
//         await fetchDataAndWriteToFS(
//           "csv/",
//           "https://gist.githubusercontent.com/sysdev-crc-dev/1a8967ad4006b2bbae70ccc64fa358d7/raw/2593361943c0e4455f39bfa26d8943a7c3129976/Last_update.csv"
//         );
//         await readFile(pathNameCSV);
//         csvToJson
//           .fieldDelimiter("|")
//           .formatValueByType(true)
//           .generateJsonFileFromCsv(pathNameCSV, pathNameJSON);

//         const lastUpdateJSON = await readFile(pathNameJSON);
//         console.log(JSON.parse(lastUpdateJSON.toString("utf-8")));
//       } catch (error) {}
//     }
//     // await fetchDataAndWriteToFS(
//     //   "csv/",
//     //   "https://gist.githubusercontent.com/sysdev-crc-dev/1a8967ad4006b2bbae70ccc64fa358d7/raw/2593361943c0e4455f39bfa26d8943a7c3129976/Last_update.csv"
//     // );
//     // csvToJson
//     //   .fieldDelimiter("|")
//     //   .formatValueByType(true)
//     //   .generateJsonFileFromCsv(`csv/Last_update.csv`, `data/Last_update.json`);
//   }

//   // const lastUpdateURL =
//   //   "https://gist.githubusercontent.com/sysdev-crc-dev/1a8967ad4006b2bbae70ccc64fa358d7/raw/2593361943c0e4455f39bfa26d8943a7c3129976/Last_update.csv";
//   // await fetchDataAndWriteToFS("csv/", lastUpdateURL);

//   // const files = await fs.readdir("csv/");
//   // files.forEach(async (file) => {
//   //   const parsedPath = path.parse(file);
//   //   await fs.writeFile(`data/${parsedPath.name}.json`, "");
//   //   csvToJson
//   //     .fieldDelimiter("|")
//   //     .formatValueByType(true)
//   //     .generateJsonFileFromCsv(`csv/${file}`, `data/${parsedPath.name}.json`);
//   // });
// };

// export default convertCSVtoJSON;
