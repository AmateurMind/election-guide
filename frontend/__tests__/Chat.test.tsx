import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatPage from "../app/chat/page";

// Mock Next.js router or other things if needed. We mainly need to mock fetch here.
global.fetch = jest.fn();

describe("ChatPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial state with greeting", () => {
    render(<ChatPage />);
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(
      screen.getByText(/Ask me anything about the voting process/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("e.g. How do I register to vote?"),
    ).toBeInTheDocument();
  });

  it("handles user input and shows loading state", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ reply: "Mocked AI reply" }),
    });

    render(<ChatPage />);

    const input = screen.getByPlaceholderText(
      "e.g. How do I register to vote?",
    );
    const submitButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Where do I vote?" } });
    fireEvent.click(submitButton);

    // Should show user message immediately
    expect(screen.getByText("Where do I vote?")).toBeInTheDocument();

    // Should show thinking state
    expect(screen.getByText("Thinking...")).toBeInTheDocument();

    // Wait for AI response to appear
    await waitFor(() => {
      expect(screen.getByText("Mocked AI reply")).toBeInTheDocument();
    });

    // Thinking state should be gone
    expect(screen.queryByText("Thinking...")).not.toBeInTheDocument();
  });

  it("handles API error gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network Error"),
    );

    render(<ChatPage />);

    const input = screen.getByPlaceholderText(
      "e.g. How do I register to vote?",
    );
    const submitButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Test error" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Sorry, I'm having trouble connecting/i),
      ).toBeInTheDocument();
    });
  });
});
