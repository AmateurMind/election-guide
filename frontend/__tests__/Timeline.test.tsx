import { render, screen, waitFor } from "@testing-library/react";
import TimelinePage from "../app/timeline/page";

// Mock IntersectionObserver for Framer Motion
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = IntersectionObserverMock as any;

global.fetch = jest.fn();

describe("TimelinePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    (global.fetch as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<TimelinePage />);
    expect(screen.getByText("Loading election dates...")).toBeInTheDocument();
  });

  it("renders events after fetching", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        events: [
          {
            id: "1",
            date: "2024-11-05",
            title: "General Election",
            description: "Vote today!",
          },
        ],
      }),
    });

    render(<TimelinePage />);

    await waitFor(() => {
      expect(screen.getByText("Election Timeline")).toBeInTheDocument();
      expect(screen.getByText("General Election")).toBeInTheDocument();
      expect(screen.getByText("Vote today!")).toBeInTheDocument();
    });
  });

  it("renders error state on fetch failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<TimelinePage />);

    await waitFor(() => {
      expect(screen.getByText("Could not load timeline")).toBeInTheDocument();
    });
  });
});
