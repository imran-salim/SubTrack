import type { Subscription, NewSubscription } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5123/subs";

export const api = {
    async getAll(): Promise<Subscription[]> {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch subscriptions");
        }
        return response.json();
    },

    async create(sub: NewSubscription): Promise<Subscription> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sub),
        });
        if (!response.ok) {
            throw new Error("Failed to create subscription");
        }
        return response.json();
    },

    async update(id: number, updatedSub: Partial<Subscription>): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedSub),
        });
        if (!response.ok) {
            throw new Error("Failed to update subscription");
        }
    },

    async delete(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete subscription");
        }
    }
}
