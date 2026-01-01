import { useEffect, useState } from "react";
import type { Subscription } from "../types";

interface SubscriptionProps {
  subscription: Subscription;
  deleteSubscription: (id: number) => void;
  editSubscription: (id: number, updatedSub: Partial<Subscription>) => void;
}

function SubscriptionItem({
  subscription,
  deleteSubscription,
  editSubscription,
}: SubscriptionProps) {
  const [editedName, setEditedName] = useState(subscription.name);
  const [editedCost, setEditedCost] = useState(subscription.cost);
  const [editedCycle, setEditedCycle] = useState(subscription.cycle);
  const [editedDate, setEditedDate] = useState(subscription.renewalDate);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setEditedName(subscription.name);
    setEditedCost(subscription.cost);
    setEditedCycle(subscription.cycle);
    setEditedDate(subscription.renewalDate);
  }, [subscription]);

  const cycleMap: { [key: string]: string } = {
    0: "Weekly",
    1: "Monthly",
    2: "Yearly",
  };

  function handleEdit() {
    setEditedName(subscription.name);
    setEditedCost(subscription.cost);
    setEditedCycle(subscription.cycle);
    setEditedDate(subscription.renewalDate);
    setEditing(true);
  }

  function handleCancel() {
    setEditing(false);
  }

  return (
    <tr className="border-t border-slate-700 bg-slate-800 hover:bg-slate-750 transition">
      <td className="px-6 py-4 text-slate-100">
        {editing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        ) : (
          subscription.name
        )}
      </td>
      <td className="px-6 py-4 text-slate-100">
        $
        {editing ? (
          <input
            type="number"
            step="0.01"
            value={editedCost.toString()}
            onChange={(e) => setEditedCost(Number(e.target.value))}
            className="w-16 px-2 py-1 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />
        ) : (
          subscription.cost.toFixed(2)
        )}
      </td>
      <td className="px-6 py-4 text-slate-100">
        {editing ? (
          <select
            value={editedCycle}
            onChange={(e) => setEditedCycle(Number(e.target.value))}
            className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          >
            {Object.entries(cycleMap).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        ) : (
          cycleMap[subscription.cycle]
        )}
      </td>
      <td className="px-6 py-4 text-slate-100">
        {editing ? (
          <input
            type="date"
            value={editedDate.split("T")[0]}
            onChange={(e) => setEditedDate(e.target.value)}
            className="px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:ring-blue-500 outline-none transition"
          />
        ) : (
          new Date(subscription.renewalDate).toLocaleDateString()
        )}
      </td>
      <td className="px-6 py-4 flex gap-2">
        {editing ? (
          <>
            <button
              onClick={() => {
                editSubscription(subscription.id, {
                  name: editedName,
                  cost: editedCost,
                  cycle: editedCycle,
                  renewalDate: editedDate,
                });
                setEditing(false);
              }}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
            >
              Edit
            </button>
            <button
              onClick={() => deleteSubscription(subscription.id)}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}

export default SubscriptionItem;
