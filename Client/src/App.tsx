import { useEffect, useState } from "react";
import Subscription from "./components/Subscription";
import "./App.css";

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
    <>
      <h1>Welcome to SubTrack</h1>
      <div className="subs">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
              <th>Billing Cycle</th>
              <th>Renewal Date</th>
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
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="New Subscription Name"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Cost"
                  value={newSubCost}
                  onChange={(e) => setNewSubCost(Number(e.target.value))}
                />
              </td>
              <td>
                <select
                  value={newSubCycle}
                  onChange={(e) => setNewSubCycle(Number(e.target.value))}
                >
                  <option value="0">Weekly</option>
                  <option value="1">Monthly</option>
                  <option value="2">Yearly</option>
                </select>
              </td>
              <div></div>
              <td>
                <button
                  onClick={() =>
                    addSubscription({
                      name: newSubName,
                      cost: newSubCost,
                      cycle: newSubCycle,
                    })
                  }
                >
                  Add Subscription
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
