import { Registry } from "@/registry/schema"

export const glappsi: Registry = [
  {
    name: "multi-select",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "command"],
    files: ["glappsi/multi-select.tsx"],
  },
]
