'use client';
import PocketBase from 'pocketbase';
import { TOOLS } from './config';

let _pb: PocketBase | null = null;

export function getPb(): PocketBase {
  if (!_pb) _pb = new PocketBase(TOOLS.pocketbase);
  return _pb;
}

export async function login(email: string, password: string) {
  const pb = getPb();
  return pb.collection('users').authWithPassword(email, password);
}

export function logout() {
  getPb().authStore.clear();
  window.location.href = '/login';
}

export function isLoggedIn(): boolean {
  return getPb().authStore.isValid;
}

export function getUser() {
  return getPb().authStore.record;
}
