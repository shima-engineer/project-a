import React from "react";

const SortFilter = () => {
  return (
    <div className="flex justify-between">
      <h2 className="text-xs font-semibold text-muted-foreground">並び順</h2>
      <div>
        <select className="border border-input shadow-sm h-8 px-3 text-xs rounded-md bg-background">
          <option value="newest">人気順</option>
          <option value="popular">新着順</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
