import api from "@/worker/api";
import type { Env } from "@/worker/env";

export default {
  fetch: api.fetch,
} satisfies ExportedHandler<Env>;
