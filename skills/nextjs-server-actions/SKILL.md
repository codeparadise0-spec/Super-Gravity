---
name: nextjs-server-actions
description: Use when building full-stack data mutations with Next.js Server Actions, revalidating cache tags, handling optimistic updates, and form pending states.
---

# Next.js Server Actions & Form Mutations

Server Actions allow you to run asynchronous server code directly from form submissions and event handlers without authoring boilerplate API route endpoints.

---

## 1. Type-Safe Server Action Pattern with Zod

```typescript
// app/actions/createProject.ts
'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { auth } from '@/lib/auth';

const CreateProjectSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().optional(),
});

export type ActionState = {
  success?: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createProjectAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: 'Unauthorized. Please log in.' };
  }

  const parsed = CreateProjectSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await db.project.create({
      data: {
        ...parsed.data,
        ownerId: session.user.id,
      },
    });

    // Revalidate cached server components tagged with 'projects'
    revalidateTag('projects');
    return { success: true, message: 'Project created successfully!' };
  } catch (err: any) {
    return { success: false, message: 'Database error. Please try again.' };
  }
}
```

---

## 2. Consuming in Client Component with `useActionState` & `useFormStatus`

```tsx
// app/components/CreateProjectForm.tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createProjectAction, ActionState } from '@/app/actions/createProject';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-4 py-2 bg-blue-600 text-white rounded font-medium disabled:opacity-50"
    >
      {pending ? 'Creating Project...' : 'Create Project'}
    </button>
  );
}

export function CreateProjectForm() {
  const [state, formAction] = useActionState(createProjectAction, {} as ActionState);

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      {state.message && (
        <div className={`p-3 rounded text-sm ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {state.message}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium">Project Name</label>
        <input id="name" name="name" className="w-full p-2 border rounded mt-1" required />
        {state.errors?.name && <p className="text-xs text-red-600 mt-1">{state.errors.name[0]}</p>}
      </div>

      <SubmitButton />
    </form>
  );
}
```
