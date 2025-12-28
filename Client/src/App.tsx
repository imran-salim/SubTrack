import { useEffect, useState } from "react";
import Subscription from "./components/Subscription";

interface Subscription {
  id: number;
  name: string;
  cost: number;
  cycle: number;
  renewalDate: string;
}

function App() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [newSubName, setNewSubName] = useState("");
  const [newSubCost, setNewSubCost] = useState(0);
  const [newSubCycle, setNewSubCycle] = useState(1);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5123/subs";

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched subscriptions:", data);
        setSubs(data);
      })
      .catch((error) => console.error("Error fetching subscriptions:", error));
  }, [apiUrl]);

  function deleteSubscription(id: number) {
    setSubs(subs.filter((sub) => sub.id !== id));
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        console.error("Error deleting subscription with ID:", id);
      }
    });
  }

  function editSubscription(id: number, updatedSub: Partial<Subscription>) {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSub),
    })
      .then((response) => {
        if (response.ok) {
          return fetch(`${apiUrl}/${id}`).then((res) => res.json());
        } else {
          console.error("Error updating subscription with ID:", id);
        }
      })
      .then((updatedSubscription) => {
        if (updatedSubscription) {
          setSubs(
            subs.map((sub) => (sub.id === id ? updatedSubscription : sub)),
          );
        }
      });
  }

  function addSubscription(newSub: Omit<Subscription, "id" | "renewalDate">) {
    if (!newSub.name.trim()) {
      console.error("Subscription name cannot be empty");
      return;
    }
    if (newSub.cost < 0) {
      console.error("Subscription cost cannot be negative");
      return;
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSub),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add subscription");
        }
      })
      .then((newSubscription) => {
        setSubs([...subs, newSubscription]);
        setNewSubName("");
        setNewSubCost(0);
        setNewSubCycle(1);
      })
      .catch((error) => console.error("Error adding subscription:", error));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white mb-2 text-center">
          SubTrack
        </h1>
        <p className="text-center text-slate-400 mb-8">
          Track and manage your subscriptions
        </p>

        <div className="bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700 border-b border-slate-600">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">
                  Cost
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">
                  Billing Cycle
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">
                  Renewal Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {subs.map((sub) => (
                <Subscription
                  key={sub.id}
                  subscription={sub}
                  deleteSubscription={deleteSubscription}
                  editSubscription={editSubscription}
                />
              ))}
              <tr className="border-t border-slate-700 bg-slate-800 hover:bg-slate-750">
                <td className="px-6 py-4">
                  <input
                    type="text"
                    placeholder="New Subscription Name"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    placeholder="Cost"
                    value={newSubCost}
                    onChange={(e) => setNewSubCost(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    value={newSubCycle}
                    onChange={(e) => setNewSubCycle(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  >
                    <option value="0">Weekly</option>
                    <option value="1">Monthly</option>
                    <option value="2">Yearly</option>
                  </select>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      addSubscription({
                        name: newSubName,
                        cost: newSubCost,
                        cycle: newSubCycle,
                      })
                    }
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
