import { MultiSelect } from "@/registry/default/glappsi/multi-select"

export default function MultiSelectDemo() {
  return (
    <MultiSelect
      items={[
        {
          label: "Item 1",
          value: "item-1",
        },
        {
          label: "Item 2",
          value: "item-2",
        },
      ]}
      onValueChange={(values: string[]) => {
        console.log("Items Selected: ", ...values)
      }}
      actions={[
        {
          label: "Action 1",
          value: "action-1",
        },
      ]}
      onActionSelected={(action: string) => {
        console.log("Action Selected: ", action)
      }}
      placeholder="Select an item"
    />
  )
}
