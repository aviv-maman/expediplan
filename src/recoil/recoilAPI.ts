'use client';
import { deletePlanFromServer, getPlanByIdFromServer, getPlansOfUserFromServer, editPlanOnServer, uploadPlanToServer } from '@/api/PlansAPI';
import type { Plan } from '../../types/general';
import { getSession } from 'next-auth/react';

class PlanListAPI {
  items: Plan[];

  constructor() {
    this.items = [];
  }

  async isAuthenticated() {
    const session = await getSession();
    return session?.user?.email ? true : false;
  }

  async getItems() {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) return;
    const plans = await getPlansOfUserFromServer();
    plans ? (this.items = plans) : (this.items = []);
    return this.items;
  }

  async getItem(id: number): Promise<Plan | undefined> {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) return;
    const plan = await getPlanByIdFromServer(id);
    this.items = this.items.map((plan) => (plan.id === id ? plan : plan));
    return plan;
  }

  async createItem(item: Plan) {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) return;
    const plan = await uploadPlanToServer(item);
    if (plan) this.items.push(plan);
    return plan;
  }

  async editItem(id: number, item: Plan) {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) return;
    const updatedPlan = await editPlanOnServer(id, item);
    if (!updatedPlan) return;
    this.items = this.items.map((plan) => (plan.id === id ? item : plan));
  }

  async deleteItem(id: number) {
    const isAuthenticated = await this.isAuthenticated();
    if (!isAuthenticated) return;
    const deletedPlan = await deletePlanFromServer(id);
    if (!deletedPlan) return;
    this.items = this.items.filter((plan) => plan.id !== id);
  }
}

export const planListAPI = new PlanListAPI();
