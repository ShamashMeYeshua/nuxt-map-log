import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

import { user } from "./auth";

export const location = sqliteTable("location", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    slug: text().notNull().unique(),
    description: text(),
    lat: real().notNull(),
    lng: real().notNull(),
    userId: int().notNull().references(() => user.id),
    createdAt: int().notNull().$default(() => Date.now()),
    updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
    unique().on(t.name, t.userId),
]);

export const InsertLocation = createSelectSchema(location, {
    name: field => field.min(10).max(100),
    description: field => field.max(1000),
    lat: field => field.min(-90).max(90),
    lng: field => field.min(-180).max(180),
}).omit({
    id: true,
    slug: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
});
