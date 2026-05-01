import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import GuidePage from "../app/guide/page";

global.fetch = jest.fn();

describe("GuidePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders guide steps", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        steps: [
          {
            id: "1",
            step: 1,
            title: "Register",
            description: "Do it early",
            tip: "Tip 1",
          },
          {
            id: "2",
            step: 2,
            title: "Vote",
            description: "Cast ballot",
            tip: "Tip 2",
          },
        ],
      }),
    });

    render(<GuidePage />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("Voting Guide")).toBeInTheDocument();
      expect(screen.getByText("Register")).toBeInTheDocument();
      expect(screen.getByText("Vote")).toBeInTheDocument();
    });
  });

  it("shows no results message for unmatched search", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ steps: [] }), // Mock empty return
    });

    render(<GuidePage />);

    // Set a search value
    const searchInput = screen.getByPlaceholderText(/Search guide/i);
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(
        screen.getByText(/No matching steps found for "nonexistent"/i),
      ).toBeInTheDocument();
    });
  });
});
