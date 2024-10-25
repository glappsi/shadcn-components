# shadcn/extension

This is a custom extension providing additional components based on shadcn.

## Components

### Multi Select

A multi select input field using `command` and `badge` shadcn components.

#### Properties
```typescript
type MultiSelectItem = Record<"value" | "label", string> & {
  readonly?: boolean
}

type Props = {
  items: MultiSelectItem[]
  actions?: MultiSelectItem[]
  onValueChange: (value: string[]) => void
  onActionSelected?: (value: string) => void
  defaultValue?: string[]
  placeholder: string
  variant?: BadgeProps["variant"]
}
```

#### Installation
```bash
# Install default themed
npx shadcn@latest add "https://raw.githubusercontent.com/glappsi/shadcn-components/refs/heads/main/apps/www/public/r/styles/default/multi-select.json"
```

```bash
# Install new-york themed
npx shadcn@latest add "https://raw.githubusercontent.com/glappsi/shadcn-components/refs/heads/main/apps/www/public/r/styles/new-york/multi-select.json"
```

#### Preview
Find a preview on my portfolio page: https://www.glappa.dev/projects
