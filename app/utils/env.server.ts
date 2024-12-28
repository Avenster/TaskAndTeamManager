import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}

export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && defaultValue === undefined) {
    throw new Error(`${name} environment variable is not set`);
  }
  return value || defaultValue!;
}

export const GITHUB_CLIENT_ID = getEnvVar("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = getEnvVar("GITHUB_CLIENT_SECRET");