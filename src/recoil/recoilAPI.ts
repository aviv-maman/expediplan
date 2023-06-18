'use client';
import { deletePlanFromServer, getPlanByIdFromServer, getPlansOfUserFromServer, editPlanOnServer, uploadPlanToServer } from '@/api/PlansAPI';
import type { Plan } from '../../types/general';
import { getSession } from 'next-auth/react';

class PlanListAPI {
  localList: Plan[];
  remoteList: Plan[];

  constructor() {
    const savedValue = window.localStorage.getItem('planList');
    this.localList = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
    this.remoteList = [];
  }

  private replaceItemAtIndex(array: Plan[], index: number, newValue: Plan) {
    return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
  }

  private removeItemAtIndex(array: Plan[], index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }

  async isAuthenticated() {
    const session = await getSession();
    return session?.user?.email ? true : false;
  }

  async getItems() {
    const isAuthenticated = await this.isAuthenticated();
    if (isAuthenticated) {
      const plans = await getPlansOfUserFromServer();
      if (!plans) return;
      this.remoteList = plans;
      return this.remoteList;
    } else {
      const savedValue = window.localStorage.getItem('planList');
      this.localList = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
      return this.localList;
    }
  }

  async getItem(id: number | string): Promise<Plan | undefined> {
    const isAuthenticated = await this.isAuthenticated();
    if (isAuthenticated) {
      return await getPlanByIdFromServer(Number(id));
    } else {
      const savedValue = window.localStorage.getItem('planList');
      this.localList = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
      return this.localList.find((plan) => plan.id === id);
    }
  }

  async createItem(item: Plan) {
    const isAuthenticated = await this.isAuthenticated();
    if (isAuthenticated) {
      const plan = await uploadPlanToServer(item);
      if (!plan) return;
    } else {
      const savedValue = window.localStorage.getItem('planList');
      this.localList = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
      const newValue = this.localList ? [...this.localList, item] : [item];
      window.localStorage.setItem('planList', JSON.stringify(newValue));
    }
  }

  async editItem(id: number | string, item: Plan) {
    const isAuthenticated = await this.isAuthenticated();
    if (isAuthenticated) {
      const updatedPlan = await editPlanOnServer(Number(id), item);
      if (!updatedPlan) return;
    } else {
      const savedValue = window.localStorage.getItem('planList');
      this.localList = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
      const index = this.localList.findIndex((plan) => plan.id === id);
      const newValue = this.replaceItemAtIndex(this.localList, index, item);
      window.localStorage.setItem('planList', JSON.stringify(newValue));
    }
  }

  async deleteItem(id: number | string) {
    const isAuthenticated = await this.isAuthenticated();
    if (isAuthenticated) {
      const deletedPlan = await deletePlanFromServer(Number(id));
      if (!deletedPlan) return;
    } else {
      const savedValue = window.localStorage.getItem('planList');
      this.localList = savedValue ? (JSON.parse(savedValue) as Plan[]) : [];
      const index = this.localList.findIndex((plan) => plan.id === id);
      const newValue = this.removeItemAtIndex(this.localList, index);
      window.localStorage.setItem('planList', JSON.stringify(newValue));
    }
  }
}

export const planListAPI = new PlanListAPI();
