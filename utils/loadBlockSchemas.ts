import fs from "fs";
import path from "path";

export interface BlockSchema {
  name: string;
  title?: string;
}

export const loadBlockSchemas = (directory: string): BlockSchema[] => {
  const schemas: BlockSchema[] = [];

  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  files.forEach((file) => {
    const schema = require(path.join(directory, file)).default;
    if (schema && schema.name) {
      schemas.push({
        name: schema.name,
        title: schema.title || schema.name,
      });
    }
  });

  return schemas;
};
