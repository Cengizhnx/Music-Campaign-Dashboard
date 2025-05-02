import {
  pgTable,
  text,
  timestamp,
  uuid,
  date,
  numeric,
} from "drizzle-orm/pg-core";

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  brand: text("brand").notNull(),
  start_date: date("start_date"),
  end_date: date("end_date"),
  budget: numeric("budget"),
  description: text("description"),
  image_url: text("image_url"),
  created_at: timestamp("created_at").defaultNow(),
});
