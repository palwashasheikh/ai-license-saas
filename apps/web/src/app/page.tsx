
"use client";

import { useCallback, useEffect, useState } from "react";

type License = {
  id: string;
  name: string;
  vendor: string;
  licenseKey: string;
  expiresAt: string | null;
  status: string;
};

const API_URL = "http://localhost:3003/licenses";

export default function Home() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
const loadLicenses = useCallback(async () => {
  try {
    setError("");

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: License[] = await response.json();
    setLicenses(data);
  } catch {
    setError(
      "Could not load licenses. Check that the NestJS API is running on port 3001."
    );
  } finally {
    setLoading(false);
  }
}, []);


  
useEffect(() => {
  const controller = new AbortController();

  async function fetchLicenses() {
    try {
      const response = await fetch(API_URL, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: License[] = await response.json();
      setLicenses(data);
      setError("");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setError(
        "Could not load licenses. Check that the NestJS API is running on port 3001."
      );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  void fetchLicenses();

  return () => controller.abort();
}, []);


  const activeCount = licenses.filter(
    (license) => license.status.toLowerCase() === "active"
  ).length;

  function formatDate(date: string | null) {
    if (!date) return "No expiry date";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function statusClass(status: string) {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-700";
      case "expired":
        return "bg-red-50 text-red-700";
      case "revoked":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-amber-50 text-amber-700";
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              LICENSEHUB
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              License Management
            </h1>
          </div>

          <button
            onClick={() => void loadLicenses()}
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            Refresh
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <section>
          <p className="text-slate-500">
            Monitor your software licenses in one place.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total licenses</p>
            <p className="mt-3 text-3xl font-bold">
              {loading ? "—" : licenses.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active licenses</p>
            <p className="mt-3 text-3xl font-bold text-emerald-600">
              {loading ? "—" : activeCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Other statuses</p>
            <p className="mt-3 text-3xl font-bold text-slate-700">
              {loading ? "—" : licenses.length - activeCount}
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold">All licenses</h2>
            <p className="mt-1 text-sm text-slate-500">
              License records retrieved from your database.
            </p>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-slate-500">
              Loading licenses...
            </div>
          ) : error ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={() => void loadLicenses()}
                className="mt-4 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
              >
                Try again
              </button>
            </div>
          ) : licenses.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="font-medium">No licenses yet</p>
              <p className="mt-2 text-sm text-slate-500">
                Your licenses will appear here when you add them.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">License</th>
                    <th className="px-6 py-4 font-semibold">Vendor</th>
                    <th className="px-6 py-4 font-semibold">License key</th>
                    <th className="px-6 py-4 font-semibold">Expires</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {licenses.map((license) => (
                    <tr key={license.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {license.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        {license.vendor}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-slate-600">
                        {license.licenseKey}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                        {formatDate(license.expiresAt)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(license.status)}`}
                        >
                          {license.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
