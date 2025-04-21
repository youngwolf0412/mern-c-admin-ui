import { CreateTenantData, CreateUserData, Credentials } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "api/auth";
export const CATALOG_SERVICE = "api/catalog";

// Auth service
export const login = (credentials: Credentials) =>
  api.post(`/${AUTH_SERVICE}/auth/login`, credentials);
export const self = () => api.get(`/${AUTH_SERVICE}/auth/self`);
export const logout = () => api.post(`/${AUTH_SERVICE}/auth/logout`);
export const getUsers = () => api.get(`/${AUTH_SERVICE}/users`);
export const getRestaurants = () => api.get(`/${AUTH_SERVICE}/tenants`);
export const createUser = (user: CreateUserData) => api.post(`/users`, user);

// TODO: add tenant endpoint ko use karo yaha.
export const createTenant = (tenant: CreateTenantData) =>
  api.post(`/${AUTH_SERVICE}/tenants`, tenant);
