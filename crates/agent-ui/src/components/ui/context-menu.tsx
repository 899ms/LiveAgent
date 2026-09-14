import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
// Base UI context menus use the same popup, positioning and item primitives.
export {
  DropdownMenuContent as ContextMenuContent,
  DropdownMenuItem as ContextMenuItem,
} from "./dropdown-menu";
