import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  duration: integer("duration").notNull(), // in minutes
  effort: integer("effort").notNull(), // 1-5
  status: text("status").notNull().default("todo"), // todo, completed
  deadline: timestamp("deadline"),
  isHighEffort: boolean("is_high_effort").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insights = pgTable("insights", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'workload', 'behavior', 'alert'
  title: text("title").notNull(),
  description: text("description").notNull(),
  severity: text("severity").default("info"), // low, medium, high
  date: timestamp("date").defaultNow(),
});

export const dailyStats = pgTable("daily_stats", {
  id: serial("id").primaryKey(),
  date: text("date").notNull().unique(), // YYYY-MM-DD
  totalMinutesPlanned: integer("total_minutes_planned").default(0),
  totalMinutesCompleted: integer("total_minutes_completed").default(0),
  burnoutRisk: text("burnout_risk").default("Low"), // Low, Medium, High
  tasksCompleted: integer("tasks_completed").default(0),
  tasksOverdue: integer("tasks_overdue").default(0),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({ id: true, createdAt: true });
export const insertInsightSchema = createInsertSchema(insights).omit({ id: true });
export const insertDailyStatsSchema = createInsertSchema(dailyStats).omit({ id: true });

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Insight = typeof insights.$inferSelect;
export type DailyStat = typeof dailyStats.$inferSelect;

export type CreateTaskRequest = InsertTask;
export type UpdateTaskRequest = Partial<InsertTask>;
