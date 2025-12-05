import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../styles/components/updateButton";

interface EditButtonProps extends TouchableOpacityProps {
  item: string;
  onPress: () => void;
  action: string;
}

export const EditButton = ({ item, onPress, action, ...props }: EditButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
      onPress={onPress}
      {...props}
    >
      <Feather name="edit" size={18} color="#FFF" />
      <Text style={styles.actionButtonText}>{action} {item}</Text>
    </TouchableOpacity>
  );
};