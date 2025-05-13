
import React from "react";
import { GridView } from "./GridView";
import { ListView } from "./ListView";

export interface SupplementListProps {
  supplements: any[];
  viewMode: "grid" | "list";
}

export const SupplementList: React.FC<SupplementListProps> = ({ 
  supplements,
  viewMode
}) => {
  return viewMode === "grid" ? (
    <GridView supplements={supplements} />
  ) : (
    <ListView supplements={supplements} />
  );
};
