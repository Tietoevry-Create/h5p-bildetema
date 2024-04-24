import { useMemo } from "react";

export const environment = {
  prod: "PROD",
  dev: "DEV",
  stage: "STAGE",
  local: "LOCAL",
} as const;

type environment = (typeof environment)[keyof typeof environment];
export const useEnvironment = (): environment => {
  const env = useMemo(() => {
    const { host } = window.location;
    if (host.includes("nybildetema.oslomet")) return environment.prod;
    if (host.includes("bildetema-stage.oslomet")) return environment.stage;
    if (host.includes("bildetema-dev.oslomet")) return environment.dev;
    return environment.local;
  }, []);

  return env;

};
