import {
  BORDER_RADIUS,
  COLORS,
  fontConfig,
  SPACING,
} from "@/src/constants/theme";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type SortOrder = "relevance" | "date" | "date-asc";

interface SortOption {
  value: SortOrder;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { value: "relevance", label: "Most popular" },
  { value: "date", label: "Upload date: Latest" },
  { value: "date-asc", label: "Upload date: Oldest" },
];

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  currentOrder: SortOrder;
  onConfirm: (order: SortOrder) => void;
}

export default function SortModal({
  visible,
  onClose,
  currentOrder,
  onConfirm,
}: SortModalProps) {
  const [selectedOrder, setSelectedOrder] = useState<SortOrder>(currentOrder);
  const insets = useSafeAreaInsets();

  const handleConfirm = () => {
    onConfirm(selectedOrder);
    onClose();
  };

  const handleClose = () => {
    setSelectedOrder(currentOrder); // Reset to current order
    onClose();
  };

  const tabBarHeight = 49; // Height of bottom tab bar
  const overlayBottom = insets.bottom + tabBarHeight;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <Pressable
          style={[styles.overlay, { bottom: overlayBottom }]}
          onPress={handleClose}
        >
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalContent}>
              <View style={styles.contentWrapper}>
                <Text style={styles.title}>Sort records by:</Text>

                <View style={styles.optionsContainer}>
                  {SORT_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={styles.radioOption}
                      onPress={() => setSelectedOrder(option.value)}
                      activeOpacity={0.7}
                      accessibilityLabel={option.label}
                      accessibilityRole="radio"
                      accessibilityState={{
                        checked: selectedOrder === option.value,
                      }}
                    >
                      <View style={styles.radioButton}>
                        {selectedOrder === option.value && (
                          <View style={styles.radioButtonInner} />
                        )}
                      </View>
                      <Text style={styles.optionLabel}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 24,
    padding: SPACING.xl,
    minHeight: 400,
    justifyContent: "space-between",
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    ...fontConfig.lg,
    color: COLORS.white,
    marginBottom: SPACING.lg,
    textAlign: "left",
  },
  optionsContainer: {
    flex: 1,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  optionLabel: {
    ...fontConfig.sm_light,
    color: COLORS.white,
    paddingTop: SPACING.sm,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: "center",
  },
  confirmButtonText: {
    ...fontConfig.md,
    color: COLORS.white,
  },
});
