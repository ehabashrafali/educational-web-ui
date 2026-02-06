export interface FuseConfirmationConfig {
  title?: string;
  message?: string;
  icon?: {
    show?: boolean;
    name?: string;
    color?: "primary" | "info" | "success" | "warning" | "danger";
  };
  actions?: {
    confirm?: {
      show?: boolean;
      label?: string;
      color?: "primary" | "info" | "success" | "warning" | "danger";
    };
    cancel?: {
      show?: boolean;
      label?: string;
    };
  };
  dismissible?: boolean;
}
