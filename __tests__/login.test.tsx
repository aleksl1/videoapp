import LoginScreen from "@/app";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { Linking } from "react-native";

// Mock expo-router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// Mock Logo component
jest.mock("@/src/components/icons/Logo", () => {
  const { View } = require("react-native");
  return function Logo() {
    return <View testID="logo" />;
  };
});

// Mock AppIcon component
jest.mock("@/src/components/icons/AppIcon", () => {
  const { View } = require("react-native");
  return function AppIcon() {
    return <View testID="app-icon" />;
  };
});

// Mock Button component
jest.mock("@/src/components/common/Button", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return function Button({
    title,
    onPress,
  }: {
    title: string;
    onPress: () => void;
  }) {
    return (
      <TouchableOpacity testID="guest-button" onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };
});

describe("LoginScreen", () => {
  let openURLSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    openURLSpy = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
  });

  afterEach(() => {
    openURLSpy.mockRestore();
  });

  describe("Rendering", () => {
    it("should render without crashing", () => {
      const { getByTestId } = render(<LoginScreen />);
      expect(getByTestId("logo")).toBeTruthy();
    });

    it("should render Logo component", () => {
      const { getByTestId } = render(<LoginScreen />);
      expect(getByTestId("logo")).toBeTruthy();
    });

    it("should render AppIcon component", () => {
      const { getByTestId } = render(<LoginScreen />);
      expect(getByTestId("app-icon")).toBeTruthy();
    });

    it("should render welcome text", () => {
      const { getByText } = render(<LoginScreen />);
      expect(
        getByText("Welcome to the best YouTube-based learning application.")
      ).toBeTruthy();
    });

    it("should render guest login button", () => {
      const { getByTestId } = render(<LoginScreen />);
      expect(getByTestId("guest-button")).toBeTruthy();
    });

    it("should render guest button with correct text", () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText("Log in as guest")).toBeTruthy();
    });

    it("should render footer text", () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText(/By continuing, you agree with/)).toBeTruthy();
    });

    it("should render Terms of Service link", () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText(" Terms and Conditions ")).toBeTruthy();
    });

    it("should render Privacy Policy link", () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText(" Privacy Policy")).toBeTruthy();
    });

    it("should render 'and' text between links", () => {
      const { getByText } = render(<LoginScreen />);
      expect(getByText(/and/)).toBeTruthy();
    });
  });

  describe("Navigation", () => {
    it("should navigate to tabs screen when guest button is pressed", () => {
      const { getByTestId } = render(<LoginScreen />);
      const guestButton = getByTestId("guest-button");

      fireEvent.press(guestButton);

      expect(router.push).toHaveBeenCalledWith("/(tabs)");
      expect(router.push).toHaveBeenCalledTimes(1);
    });
  });

  describe("External Links", () => {
    it("should open Terms of Service URL when clicked", async () => {
      const { getByText } = render(<LoginScreen />);
      const termsLink = getByText(" Terms and Conditions ");

      fireEvent.press(termsLink);

      await waitFor(() => {
        expect(openURLSpy).toHaveBeenCalledWith("https://www.google.com");
      });
    });

    it("should open Privacy Policy URL when clicked", async () => {
      const { getByText } = render(<LoginScreen />);
      const privacyLink = getByText(" Privacy Policy");

      fireEvent.press(privacyLink);

      await waitFor(() => {
        expect(openURLSpy).toHaveBeenCalledWith("https://www.youtube.com");
      });
    });
  });

  describe("Layout and Structure", () => {
    it("should have all main elements in correct structure", () => {
      const { getByTestId, getByText } = render(<LoginScreen />);

      // Check all elements are present
      expect(getByTestId("logo")).toBeTruthy();
      expect(getByTestId("app-icon")).toBeTruthy();
      expect(
        getByText("Welcome to the best YouTube-based learning application.")
      ).toBeTruthy();
      expect(getByTestId("guest-button")).toBeTruthy();
      expect(getByText(/By continuing, you agree with/)).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have proper text for screen readers", () => {
      const { getByText } = render(<LoginScreen />);

      expect(
        getByText("Welcome to the best YouTube-based learning application.")
      ).toBeTruthy();
      expect(getByText("Log in as guest")).toBeTruthy();
    });
  });

  describe("User Interaction", () => {
    it("should handle multiple button presses", () => {
      const { getByTestId } = render(<LoginScreen />);
      const guestButton = getByTestId("guest-button");

      fireEvent.press(guestButton);
      fireEvent.press(guestButton);
      fireEvent.press(guestButton);

      expect(router.push).toHaveBeenCalledTimes(3);
      expect(router.push).toHaveBeenCalledWith("/(tabs)");
    });

    it("should handle link presses independently", async () => {
      const { getByText } = render(<LoginScreen />);

      const termsLink = getByText(" Terms and Conditions ");
      const privacyLink = getByText(" Privacy Policy");

      fireEvent.press(termsLink);
      fireEvent.press(privacyLink);

      await waitFor(() => {
        expect(openURLSpy).toHaveBeenCalledTimes(2);
        expect(openURLSpy).toHaveBeenCalledWith("https://www.google.com");
        expect(openURLSpy).toHaveBeenCalledWith("https://www.youtube.com");
      });
    });
  });
});
