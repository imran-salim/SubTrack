interface SubscriptionProps {
	subscription: {
		id: number
		name: string
		cost: number
		cycle: string
		renewalDate: string
	}
}

function Subscription({ subscription }: SubscriptionProps) {
	return (
		<tr>
			<td>{subscription.name}</td>
			<td>{subscription.cost}</td>
			<td>{subscription.cycle}</td>
			<td>{new Date(subscription.renewalDate).toLocaleDateString()}</td>
			<td>
				<button>Edit</button>
			</td>
			<td>
				<button>Delete</button>
			</td>
		</tr>
	)
}

export default Subscription
