import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare(`SELECT * FROM meals where slug = ?`).get(slug);
}

export async function saveMeal(meal) {
  const slug = slugify(meal.title, { lower: true });
  meal.slug = slug;
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
  meal.image = `/images/${fileName}`;

  db.prepare(
    `INSERT INTO meals (title, summary, slug, instructions, image, creator, creator_email) VALUES (@title, @summary, @slug, @instructions, @image, @creator, @creator_email)`
  ).run(meal);
}
