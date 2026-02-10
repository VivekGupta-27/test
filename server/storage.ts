import { db } from "./db";
import {
  tasks, insights, dailyStats,
  type Task, type InsertTask,
  type Insight,
  type DailyStat
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getTasks(): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, updates: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<void>;
  
  getInsights(): Promise<Insight[]>;
  getDailyStats(date: string): Promise<DailyStat | undefined>;
  seedData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask;
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task | undefined> {
    const [updated] = await db.update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .returning();
    return updated;
  }

  async deleteTask(id: number): Promise<void> {
    await db.delete(tasks).where(eq(tasks.id, id));
  }

  async getInsights(): Promise<Insight[]> {
    return await db.select().from(insights);
  }

  async getDailyStats(date: string): Promise<DailyStat | undefined> {
    const [stat] = await db.select().from(dailyStats).where(eq(dailyStats.date, date));
    return stat;
  }

  async seedData(): Promise<void> {
    const existingTasks = await this.getTasks();
    if (existingTasks.length > 0) return;

    // Seed Tasks
    await db.insert(tasks).values([
      { title: "Study Machine Learning", duration: 60, effort: 5, status: "todo", isHighEffort: true },
      { title: "Finish UI Mockups", duration: 60, effort: 3, status: "completed", isHighEffort: false },
      { title: "Prepare for ML Presentation", duration: 70, effort: 4, status: "todo", isHighEffort: true },
      { title: "Email Client Updates", duration: 43, effort: 2, status: "todo", isHighEffort: false },
    ]);

    // Seed Insights
    await db.insert(insights).values([
      { 
        type: "workload", 
        title: "High Effort Streak", 
        description: "You've had high-effort tasks 4 days in a row. Consider planning a lighter day tomorrow.", 
        severity: "medium" 
      },
      { 
        type: "behavior", 
        title: "Overrun Alert", 
        description: "Yesterday, 3 out of your 4 tasks took longer than planned. Schedule extra padding time.", 
        severity: "low" 
      }
    ]);

    // Seed Daily Stats
    const today = new Date().toISOString().split('T')[0];
    await db.insert(dailyStats).values({
      date: today,
      totalMinutesPlanned: 300,
      totalMinutesCompleted: 240,
      burnoutRisk: "Medium",
      tasksCompleted: 4,
      tasksOverdue: 1
    });
  }
}

export const storage = new DatabaseStorage();
