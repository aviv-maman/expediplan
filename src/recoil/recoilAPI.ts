'use client';
import { getPlanByIdFromServer, getPlansOfAuthenticatedUserFromServer, uploadPlanToServer } from '@/api/PlansAPI';
import type { Plan } from '../../types/general';
import { getSession } from 'next-auth/react';

class PlanListAPI {
  items: Plan[];

  constructor() {
    const persisted = window.localStorage.getItem('planList');
    if (persisted == null) {
      this.items = [];
    } else {
      this.items = JSON.parse(persisted);
    }
  }

  async isAuthenticated() {
    const session = await getSession();
    return session?.user?.email ? true : false;
  }

  async getItems() {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) return;
    const plans = await getPlansOfAuthenticatedUserFromServer();
    plans ? (this.items = plans) : this.items;
    return this.items;
  }

  async getItem(id: number): Promise<Plan | undefined> {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) return this.items.find((item) => item.id === id);
    return await getPlanByIdFromServer(id);
  }

  async createItem(item: Plan) {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) {
      this.items.push(item);
      this.persist();
      return;
    }
    const plan = await uploadPlanToServer(item);
    if (plan) this.items.push(plan);
  }

  async updateItem(id: number, item: Plan) {
    this.items[id] = item;
    this.persist();
  }

  async deleteItem(id: number) {
    delete this.items[id];
    this.persist();
  }

  private persist() {
    window.localStorage.setItem('planList', JSON.stringify(this.items));
  }
}

export const planListAPI = new PlanListAPI();
