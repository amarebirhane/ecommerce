import { Order } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  order: Order | null;
  productRatings: { [key: string]: number };
  onRatingChange: (productId: string, rating: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const RatingModal = ({
  visible,
  onClose,
  order,
  productRatings,
  onRatingChange,
  onSubmit,
  isSubmitting,
}: RatingModalProps) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      {/* backdrop layer */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <TouchableWithoutFeedback>
            <View className="bg-white rounded-[3rem] p-8 w-full max-w-lg shadow-2xl">
              <View className="items-center mb-8">
                <View className="bg-indigo-50 rounded-[2rem] w-20 h-20 items-center justify-center mb-5 border border-indigo-100/50">
                  <Ionicons name="star" size={36} color="#4F46E5" />
                </View>
                <Text className="text-primary text-3xl font-black mb-1 tracking-tighter">
                  Experience
                </Text>
                <Text className="text-text-tertiary text-center font-bold text-[10px] uppercase tracking-widest">
                  Share your thoughts on these items
                </Text>
              </View>

              <ScrollView className="mb-8" showsVerticalScrollIndicator={false}>
                {order?.orderItems.map((item, index) => {
                  const productId = item.product._id;
                  const currentRating = productRatings[productId] || 0;

                  return (
                    <View
                      key={item._id}
                      className={`bg-gray-50/50 rounded-3xl p-5 border border-gray-100/50 ${index < order.orderItems.length - 1 ? "mb-5" : ""
                        }`}
                    >
                      <View className="flex-row items-center mb-5">
                        <Image
                          source={item.image}
                          className="rounded-2xl bg-white shadow-sm"
                          style={{ height: 70, width: 70 }}
                        />
                        <View className="flex-1 ml-4 justify-center">
                          <Text
                            className="text-text-primary font-black text-sm mb-1"
                            numberOfLines={1}
                          >
                            {item.name}
                          </Text>
                          <Text className="text-text-tertiary font-bold text-[10px] uppercase tracking-tighter">
                            Qty: {item.quantity} • ${item.price.toFixed(2)}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row justify-center items-center bg-white py-4 rounded-2xl shadow-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <TouchableOpacity
                            key={star}
                            onPress={() => onRatingChange(productId, star)}
                            activeOpacity={0.7}
                            className="mx-2"
                          >
                            <Ionicons
                              name={star <= currentRating ? "star" : "star-outline"}
                              size={30}
                              color={star <= currentRating ? "#4F46E5" : "#E5E7EB"}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>

              <View className="gap-4">
                <TouchableOpacity
                  className="bg-primary rounded-[2rem] py-5 items-center shadow-xl shadow-primary/30"
                  activeOpacity={0.8}
                  onPress={onSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text className="text-white font-black uppercase tracking-widest">
                      Submit Review
                    </Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-50 rounded-[2rem] py-5 items-center border border-gray-100"
                  activeOpacity={0.7}
                  onPress={onClose}
                  disabled={isSubmitting}
                >
                  <Text className="text-text-tertiary font-black uppercase tracking-widest text-sm">
                    Dismiss
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RatingModal;
