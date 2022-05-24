declare module "*.module.css";
declare module "*.module.scss";
declare module "*.png" {
  const value: string;
  export = value;
}
