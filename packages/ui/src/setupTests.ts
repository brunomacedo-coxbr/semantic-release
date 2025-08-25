import "@testing-library/jest-dom";

globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

globalThis.HTMLElement.prototype.scrollIntoView = jest.fn();
