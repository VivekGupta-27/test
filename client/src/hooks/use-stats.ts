import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useDailyStats() {
  return useQuery({
    queryKey: [api.dailyStats.get.path],
    queryFn: async () => {
      const res = await fetch(api.dailyStats.get.path, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch daily stats");
      return api.dailyStats.get.responses[200].parse(await res.json());
    },
  });
}
