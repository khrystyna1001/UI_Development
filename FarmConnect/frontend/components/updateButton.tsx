import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles/components/updateButton";

interface UpdateButtonProps extends TouchableOpacityProps {
  item: string;
  onPress: () => void;
}

export const UpdateButton = ({ item, onPress, style, ...props }: UpdateButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: '#2196F3' }, style]}
      onPress={onPress}
      {...props}
    >
      <Feather name="edit" size={18} color="#FFF" />
      <Text style={styles.actionButtonText}>Update {item}</Text>
    </TouchableOpacity>
  );
};