import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useInsights() {
  return useQuery({
    queryKey: [api.insights.list.path],
    queryFn: async () => {
      const res = await fetch(api.insights.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch insights");
      return api.insights.list.responses[200].parse(await res.json());
    },
  });
}
