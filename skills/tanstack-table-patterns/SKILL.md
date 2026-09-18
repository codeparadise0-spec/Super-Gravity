---
name: tanstack-table-patterns
description: Use when building robust data tables with TanStack Table v8, handling server-side sorting, pagination, column visibility, and row virtualization.
---

# Headless Data Tables with TanStack Table (v8)

TanStack Table is a headless library that handles 100% of data table logic (sorting, multi-filtering, grouping, pagination, pinning) while leaving full visual control to your CSS design system.

---

## 1. Defining Columns with Helper

```typescript
import { createColumnHelper } from '@tanstack/react-table';

export interface Transaction {
  id: string;
  customerName: string;
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  createdAt: string;
}

const columnHelper = createColumnHelper<Transaction>();

export const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => <span className="font-mono text-xs">{info.getValue()}</span>,
  }),
  columnHelper.accessor('customerName', {
    header: 'Customer',
    cell: (info) => <span className="font-medium text-slate-900">{info.getValue()}</span>,
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => {
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(info.getValue());
      return <span className="font-semibold">{formatted}</span>;
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue();
      const badgeClasses = {
        COMPLETED: 'bg-emerald-100 text-emerald-800',
        PENDING: 'bg-amber-100 text-amber-800',
        FAILED: 'bg-rose-100 text-rose-800',
      }[status];
      return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses}`}>{status}</span>;
    },
  }),
];
```

---

## 2. Table Component Rendering Pattern

```tsx
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

export function DataTable<TData, TValue>({ columns, data }: { columns: any[]; data: TData[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-xl">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-slate-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```
