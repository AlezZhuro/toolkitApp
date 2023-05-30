// variables from .env files

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

export const APP_ID = import.meta.env.VITE_APP_ID;
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// constants

export const STORAGE_KEY = "github_app";
export const NUMBER_PER_PAGE = 10;
export const REPO_OWNER_KEY = 'owner';
export const REPO_NAME_KEY = 'name';
