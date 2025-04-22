import { CreateTenantData, CreateUserData, Credentials } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "api/auth";
export const CATALOG_SERVICE = "api/catalog";

// // Auth service
export const login = (credentials: Credentials) =>
  api.post(`/${AUTH_SERVICE}/auth/login`, credentials);
export const self = () => api.get(`/${AUTH_SERVICE}/auth/self`);
export const logout = () => api.post(`/${AUTH_SERVICE}/auth/logout`);
export const getUsers = (queryString: string) =>
  api.get(`/${AUTH_SERVICE}/users?${queryString}`);
export const getTenants = (queryString: string) =>
  api.get(`/${AUTH_SERVICE}/tenants?${queryString}`);
export const createUser = (user: CreateUserData) =>
  api.post(`/${AUTH_SERVICE}/users`, user);
export const updateUser = (user: CreateUserData, id: string) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, user);

// TODO: add tenant endpoint ko use karo yaha.
export const createTenant = (tenant: CreateTenantData) =>
  api.post(`/${AUTH_SERVICE}/tenants`, tenant);

// Catalog service
export const getCategories = () => api.get(`/${CATALOG_SERVICE}/categories`);
export const getProducts = (queryParam: string) =>
  api.get(`/${CATALOG_SERVICE}/products?${queryParam}`);

// -
// -
// -
// -
// -
// -
// -
// -
// -
// -

// -
// -
// -
// -
// -

// -
// -
// -
// -
// -
// -

// -
// -
// -
// -

// without AUTH_SERVICE and CATALOG_SERVICE
// Auth service
// export const login = (credentials: Credentials) =>
//   api.post(`/auth/login`, credentials);
// export const self = () => api.get(`/auth/self`);
// export const logout = () => api.post(`/auth/logout`);
// export const getUsers = () => api.get(`/users`);
// export const getTenants = (queryString: string) =>
//   api.get(`/tenants?${queryString}`);
// export const createUser = (user: CreateUserData) => api.post(`/users`, user);

// export const createTenant = (tenant: CreateTenantData) =>
//   api.post(`/tenants`, tenant);

// Catalog service
// export const getCategories = () => api.get(`/categories`);
// export const getProducts = (queryParam: string) =>
//   api.get(`/products?${queryParam}`);
//  ends here code for without AUTH_SERVICE and CATALOG_SERVICE
