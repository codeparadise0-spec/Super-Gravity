---
name: react-forms-and-validation
description: Use when implementing complex forms in React, handling schema validation (Zod / React Hook Form), managing dynamic field arrays, and ensuring accessible error feedback.
---

# React Forms & Schema Validation Protocol

Forms must be accessible, performant (preventing full-form re-renders on every keystroke), and strictly validated against type-safe schemas.

---

## 1. The Standard Stack: React Hook Form + Zod

Avoid managing individual `useState` hooks for each input field. Use uncontrolled form inputs with React Hook Form:

```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define Type-Safe Schema
export const ProfileFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(300, 'Bio cannot exceed 300 characters').optional(),
  receiveNewsletter: z.boolean().default(false),
});

export type ProfileFormData = z.infer<typeof ProfileFormSchema>;

export function ProfileForm({ onSubmitSuccess }: { onSubmitSuccess: (data: ProfileFormData) => void }) {
  // 2. Initialize Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      bio: '',
      receiveNewsletter: false,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      onSubmitSuccess(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md" noValidate>
      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name</label>
        <input
          id="fullName"
          type="text"
          {...register('fullName')}
          aria-invalid={errors.fullName ? 'true' : 'false'}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          className="mt-1 block w-full px-3 py-2 border rounded-md border-slate-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-xs text-red-600 font-medium">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="mt-1 block w-full px-3 py-2 border rounded-md border-slate-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isDirty}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}
```

---

## 2. Dynamic Field Arrays Pattern

For nested arrays of inputs (e.g. adding multiple team members or invoice line items), use `useFieldArray`:

```tsx
import { useFieldArray, useForm } from 'react-hook-form';

export function TeamInviteForm() {
  const { control, register, handleSubmit } = useForm<{ emails: { email: string }[] }>({
    defaultValues: { emails: [{ email: '' }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'emails' });

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input
            {...register(`emails.${index}.email` as const, { required: true })}
            placeholder="colleague@example.com"
            className="p-2 border rounded w-full"
          />
          {fields.length > 1 && (
            <button type="button" onClick={() => remove(index)} className="px-3 py-1 bg-red-100 text-red-700 rounded">
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => append({ email: '' })} className="text-sm text-blue-600 hover:underline">
        + Add Another Email
      </button>
    </form>
  );
}
```
