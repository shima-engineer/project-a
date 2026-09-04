import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

URL.createObjectURL = vi.fn(() => "blob:vitest-mock");
URL.revokeObjectURL = vi.fn();

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
