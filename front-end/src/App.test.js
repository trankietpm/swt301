import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { getTextItems, createTextItem, updateTextItem, deleteTextItem } from "./services/TextItemService";

jest.mock("./services/TextItemService", () => {
  return {
    getTextItems: jest.fn(() => Promise.resolve([])),
    createTextItem: jest.fn(() => Promise.resolve({})),
    updateTextItem: jest.fn(() => Promise.resolve({})),
    deleteTextItem: jest.fn(() => Promise.resolve({})),
  };
});


describe("App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("hiển thị tiêu đề TODO LIST", () => {
    render(<App />);
    expect(screen.getByText("TODO LIST")).toBeInTheDocument();
  });

  test("tải danh sách item từ API và hiển thị", async () => {
    getTextItems.mockResolvedValue([{ id: 1, content: "Công việc 1" }]);

    render(<App />);
    expect(await screen.findByText("Công việc 1")).toBeInTheDocument();
  });

  test("thêm một item mới", async () => {
    createTextItem.mockResolvedValue({ id: 2, content: "Công việc mới" });

    render(<App />);
    const input = screen.getByPlaceholderText("New item");
    const addButton = screen.getByText("Add Item");

    fireEvent.change(input, { target: { value: "Công việc mới" } });
    fireEvent.click(addButton);

    expect(await screen.findByText("Công việc mới")).toBeInTheDocument();
  });

  test("chỉnh sửa một item", async () => {
    getTextItems.mockResolvedValue([{ id: 3, content: "Cũ" }]);
    updateTextItem.mockResolvedValue({ id: 3, content: "Mới" });

    render(<App />);
    expect(await screen.findByText("Cũ")).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("edit-button"));
    const editInput = screen.getByDisplayValue("Cũ");
    fireEvent.change(editInput, { target: { value: "Mới" } });

    fireEvent.click(screen.getByText("Save"));

    expect(await screen.findByText("Mới")).toBeInTheDocument();
  });

  test("xóa một item", async () => {
    getTextItems.mockResolvedValue([{ id: 4, content: "Xóa cái này" }]);
    deleteTextItem.mockResolvedValue({});

    render(<App />);
    expect(await screen.findByText("Xóa cái này")).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("delete-button"));

    await waitFor(() => expect(screen.queryByText("Xóa cái này")).not.toBeInTheDocument());
  });

  test("hiển thị thông báo lỗi khi nội dung vượt quá 92 ký tự", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("New item");
    const addButton = screen.getByText("Add Item");
    fireEvent.change(input, { target: { value: "A".repeat(93) } }); 
    fireEvent.click(addButton);
    expect(screen.getByText("Content exceeds 92 characters!")).toBeInTheDocument();
  });
});
