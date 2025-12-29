import { LucideIcon } from "lucide-react";
export type UserRole = "목사님" | "리더" | "새가족 담당" | "셀원";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  requiredRoles: UserRole[];
}
