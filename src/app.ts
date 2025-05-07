import fs from "fs";
import path from "path";
import config from "../config.json";
import { MarkImageCrawler } from "./mark_image_crawler";
import { IMarkImageData } from "./mark_image_crawler.dto";

async function main() {
  const { targetURL, totalPages, limit } = config;

  const imageDatas: Array<IMarkImageData> = [];

  for (let page = 1; page <= totalPages; page += 1) {
    const url = `${targetURL}?totalPages=${totalPages}&page=${page}&limit=${limit}&sort=&sortOrder=&search=`;

    imageDatas.push(...(await MarkImageCrawler.crawling(url)));
  }

  const filePath = path.resolve(__dirname, "../mark_image_data.json");

  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { force: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(imageDatas, null, 4));
}

main();
