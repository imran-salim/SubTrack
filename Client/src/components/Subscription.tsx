import { useState } from "react"

interface Sub {
    id: number
    name: string
    cost: number
    cycle: number
    renewalDate: string
}

interface SubscriptionProps {
    subscription: {
        id: number
        name: string
        cost: number
        cycle: number
        renewalDate: string
    }
    deleteSubscription: (id: number) => void
    editSubscription: (id: number, updatedSub: Partial<Sub>) => void
}

function Subscription({ subscription, deleteSubscription, editSubscription }: SubscriptionProps) {
    const [editedName, setEditedName] = useState(subscription.name)
    const [editedCost, setEditedCost] = useState(subscription.cost)
    const [editedCycle, setEditedCycle] = useState(subscription.cycle)
    const [editing, setEditing] = useState(false)

    const cycleMap: { [key: string]: string } = {
        0: 'Weekly',
        1: 'Monthly',
        2: 'Yearly',
    }

    function handleEdit() {
        setEditedName(subscription.name)
        setEditedCost(subscription.cost)
        setEditedCycle(subscription.cycle)
        setEditing(true)
    }

    function handleCancel() {
        setEditing(false)
    }

    return (
        <tr>
            <td>
							{editing ? <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : subscription.name}
						</td>
            <td>
							${editing ? <input type="number" value={editedCost.toString()} onChange={(e) => setEditedCost(Number(e.target.value))} /> : subscription.cost}
						</td>
            <td>
							{editing ? 
								<select value={editedCycle} onChange={(e) => setEditedCycle(Number(e.target.value))}>
									{Object.entries(cycleMap).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
								</select> : cycleMap[subscription.cycle]}
						</td>
            <td>{new Date(subscription.renewalDate).toLocaleDateString()}</td>
            <td>
                {editing ? (
                    <>
                        <button
                            onClick={() => {
                                editSubscription(subscription.id, { name: editedName, cost: editedCost, cycle: editedCycle })
                                setEditing(false)
                            }}
                        >
                            Save
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
                    </>
                ) : (
                    <button onClick={handleEdit}>Edit</button>
                )}
            </td>
            <td>
                <button onClick={() => deleteSubscription(subscription.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default Subscription
