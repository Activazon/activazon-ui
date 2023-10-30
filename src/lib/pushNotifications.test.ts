import { getNotificationHandlingDecision } from "./pushNotifications";

describe("getNotificationHandlingDecision", () => {
  it('should return "subscribe" if push notifications are supported and user is in standalone mode with granted permission', () => {
    jest
      .spyOn(window.navigator, "userAgent", "get")
      .mockReturnValue("Mozilla/5.0 (Android)");

    jest.spyOn(window, "Notification", "get").mockReturnValueOnce({
      requestPermission: jest
        .fn()
        .mockImplementation((callback) => callback("granted")),
    });

    expect(getNotificationHandlingDecision()).toBe("subscribe");
  });

  it('should return "ask_permission" if push notifications are supported and user is in standalone mode with no permission', () => {
    jest
      .spyOn(window.navigator, "userAgent", "get")
      .mockReturnValue("Mozilla/5.0 (Android)");

    jest.spyOn(window, "Notification", "get").mockReturnValueOnce({
      requestPermission: jest
        .fn()
        .mockImplementation((callback) => callback("default")),
    });

    expect(getNotificationHandlingDecision()).toBe("ask_permission");
  });

  it('should return "redirect_to_a2hs" if push notifications are supported but app is not in standalone mode', () => {
    jest
      .spyOn(window.navigator, "userAgent", "get")
      .mockReturnValue("Mozilla/5.0 (Android)");

    jest.spyOn(window, "Notification", "get").mockReturnValueOnce({
      requestPermission: jest
        .fn()
        .mockImplementation((callback) => callback("default")),
    });

    jest.spyOn(window, "navigator", "get").mockReturnValue({
      standalone: false,
    });

    expect(getNotificationHandlingDecision()).toBe("redirect_to_a2hs");
  });

  it('should return "unsupported" if push notifications are not supported', () => {
    jest
      .spyOn(window.navigator, "userAgent", "get")
      .mockReturnValue("Mozilla/5.0 (Windows NT)");

    expect(getNotificationHandlingDecision()).toBe("unsupported");
  });
});
