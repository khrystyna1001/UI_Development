import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles/components/createButton";

interface CreateButtonProps extends TouchableOpacityProps {
  item: string;
  onPress: () => void;
}

export const CreateButton = ({ item, onPress, style, ...props }: CreateButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: '#4CAF50' }, style]}
      onPress={onPress}
      {...props}
    >
      <Feather name="plus" size={18} color="#FFF" />
      <Text style={styles.actionButtonText}>Create {item}</Text>
    </TouchableOpacity>
  );
};