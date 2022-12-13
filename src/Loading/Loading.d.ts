export type LoadingType = "default" | "skip" | "heartbeat"
export interface LoadingConfig {
  text?: string;
  type?: LoadingType;
  backgroundColor?: string;
  color?: string;
}