import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles/components/deleteButton";

interface DeleteButtonProps extends TouchableOpacityProps {
  item: string;
  onPress: () => void;
}

export const DeleteButton = ({ item, onPress, style, ...props }: DeleteButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: '#f44336' }, style]}
      onPress={onPress}
      {...props}
    >
      <Feather name="trash" size={18} color="#FFF" />
      <Text style={styles.actionButtonText}>Delete {item}</Text>
    </TouchableOpacity>
  );
};