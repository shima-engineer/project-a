import React from "react";

const SocialLinksSection = () => {
  return (
    <>
      <div className="mb-4">
        <h2 className="mb-0.5 text-base font-semibold">ソーシャル</h2>
        <p className="text-xs text-muted-foreground">Social Links</p>
      </div>
      <div className="mb-4">
        <label htmlFor="productXLink" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">Twitter / X</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <div>
          <input
            type="text"
            id="productXLink"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="@yourhandle"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="productGitHubLink" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">GitHub</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <div>
          <input
            type="text"
            id="productGitHubLink"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="github.com/you/repo"
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="productMakerWebsite" className="mb-1.5 block">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">メイカー Website</span>
            <span className="text-primary">*</span>
          </div>
        </label>
        <div>
          <input
            type="text"
            id="productMakerWebsite"
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            placeholder="https://you.dev"
          />
        </div>
      </div>
    </>
  );
};

export default SocialLinksSection;
