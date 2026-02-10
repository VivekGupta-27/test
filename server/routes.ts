import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed data on startup
  await storage.seedData();

  app.get(api.tasks.list.path, async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post(api.tasks.create.path, async (req, res) => {
    try {
      const input = api.tasks.create.input.parse(req.body);
      const task = await storage.createTask(input);
      res.status(201).json(task);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.tasks.update.path, async (req, res) => {
    try {
      const input = api.tasks.update.input.parse(req.body);
      const task = await storage.updateTask(Number(req.params.id), input);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.tasks.delete.path, async (req, res) => {
    await storage.deleteTask(Number(req.params.id));
    res.status(204).end();
  });

  app.get(api.insights.list.path, async (req, res) => {
    const insights = await storage.getInsights();
    res.json(insights);
  });

  app.get(api.dailyStats.get.path, async (req, res) => {
    // Return today's stats, or seed new ones if not found
    const today = new Date().toISOString().split('T')[0];
    let stats = await storage.getDailyStats(today);
    
    // Fallback if seeded date doesn't match "today" (simple mock logic)
    if (!stats) {
      // Create dummy stats for "today"
      // In a real app we'd aggregate tasks. Here we just mock it.
      stats = {
        id: 0,
        date: today,
        totalMinutesPlanned: 300,
        totalMinutesCompleted: 240,
        burnoutRisk: "Medium",
        tasksCompleted: 4,
        tasksOverdue: 1
      };
    }
    
    res.json(stats);
  });

  return httpServer;
}
