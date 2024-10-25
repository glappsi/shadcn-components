import { blocks } from "@/registry/registry-blocks"
import { charts } from "@/registry/registry-charts"
import { examples } from "@/registry/registry-examples"
import { glappsi } from "@/registry/registry-glappsi"
import { hooks } from "@/registry/registry-hooks"
import { lib } from "@/registry/registry-lib"
import { themes } from "@/registry/registry-themes"
import { v0 } from "@/registry/registry-v0"
import { Registry } from "@/registry/schema"

export const registry: Registry = [
  ...glappsi,
  ...examples,
  ...blocks,
  ...charts,
  ...lib,
  ...hooks,
  ...themes,
  ...v0,
]
