---
name: react-headless-ui
description: Use when building accessible, unstyled UI primitives using Radix UI or Headless UI with custom Tailwind and CSS token styling.
---

# Headless UI & Accessible Primitives (Radix UI)

Headless component libraries provide 100% accessible logic (keyboard navigation, focus trapping, screen reader ARIA attributes, portal rendering) while leaving 100% of styling to your design system.

---

## 1. Accessible Dialog Modal (Radix UI)

```tsx
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

export function ConfirmDeleteDialog({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">
          Delete Project
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Semi-translucent Backdrop Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-fadeIn" />

        {/* Centered Modal Content with Focus Trap */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 focus:outline-none">
          <Dialog.Title className="text-xl font-bold text-slate-900 dark:text-white">
            Are you absolutely sure?
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            This action cannot be undone. This will permanently delete your repository and remove all collaborators.
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
            >
              Yes, Delete
            </button>
          </div>

          <Dialog.Close asChild>
            <button className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-600">
              <Cross2Icon className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

---

## 2. Headless Primitives Rule
Never build custom dropdowns, popovers, or modal dialogs from scratch using raw `<div>` tags with manual `onClick` event listeners. You will inevitably miss edge cases: focus trapping, `Escape` key listeners, ARIA expanded state, and screen reader announcements. Use Radix UI primitives.
