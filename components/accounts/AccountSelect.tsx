
"use client";

import { useEffect, useState } from "react";
import { getAccounts } from "@/lib/storage/accounts";
import { Account } from "@/lib/models/accounts";

interface Props {
  value?: string;
  onChange: (id: string) => void;
}

export default function AccountSelect({ value, onChange }: Props) {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    getAccounts().then(setAccounts);
  }, []);

  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded p-2"
    >
      <option value="">Select account</option>
      {accounts.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      ))}
    </select>
  );
}
