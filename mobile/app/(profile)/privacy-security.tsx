import SafeScreen from "@/components/SafeScreen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

type SecurityOption = {
  id: string;
  icon: string;
  title: string;
  description: string;
  type: "navigation" | "toggle";
  value?: boolean;
};

function PrivacyAndSecurityScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [shareData, setShareData] = useState(false);

  const securitySettings: SecurityOption[] = [
    {
      id: "password",
      icon: "lock-closed-outline",
      title: "Change Password",
      description: "Update your account password",
      type: "navigation",
    },
    {
      id: "two-factor",
      icon: "shield-checkmark-outline",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      type: "toggle",
      value: twoFactorEnabled,
    },
    {
      id: "biometric",
      icon: "finger-print-outline",
      title: "Biometric Login",
      description: "Use Face ID or Touch ID",
      type: "toggle",
      value: biometricEnabled,
    },
  ];

  const privacySettings: SecurityOption[] = [
    {
      id: "push",
      icon: "notifications-outline",
      title: "Push Notifications",
      description: "Receive push notifications",
      type: "toggle",
      value: pushNotifications,
    },
    {
      id: "email",
      icon: "mail-outline",
      title: "Email Notifications",
      description: "Receive order updates via email",
      type: "toggle",
      value: emailNotifications,
    },
    {
      id: "marketing",
      icon: "megaphone-outline",
      title: "Marketing Emails",
      description: "Receive promotional emails",
      type: "toggle",
      value: marketingEmails,
    },
    {
      id: "data",
      icon: "analytics-outline",
      title: "Share Usage Data",
      description: "Help us improve the app",
      type: "toggle",
      value: shareData,
    },
  ];

  const accountSettings = [
    {
      id: "activity",
      icon: "time-outline",
      title: "Account Activity",
      description: "View recent login activity",
    },
    {
      id: "devices",
      icon: "phone-portrait-outline",
      title: "Connected Devices",
      description: "Manage devices with access",
    },
    {
      id: "data-download",
      icon: "download-outline",
      title: "Download Your Data",
      description: "Get a copy of your data",
    },
  ];

  const handleToggle = (id: string, value: boolean) => {
    switch (id) {
      case "two-factor":
        setTwoFactorEnabled(value);
        break;
      case "biometric":
        setBiometricEnabled(value);
        break;
      case "push":
        setPushNotifications(value);
        break;
      case "email":
        setEmailNotifications(value);
        break;
      case "marketing":
        setMarketingEmails(value);
        break;
      case "data":
        setShareData(value);
        break;
    }
  };

  return (
    <SafeScreen>
      {/* HEADER */}
      <View className="px-6 pt-8 pb-5 flex-row items-center border-b border-gray-50">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white p-2 rounded-xl border border-gray-100 mr-4 shadow-sm"
        >
          <Ionicons name="arrow-back" size={24} color="#4F46E5" />
        </TouchableOpacity>
        <View>
          <Text className="text-primary text-2xl font-black tracking-tighter">LUXE.</Text>
          <Text className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Privacy & Security</Text>
        </View>
      </View>


      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* SECURITY SETTING */}
        <View className="px-6 pt-8">
          <Text className="text-text-primary text-xl font-black mb-5">Security</Text>

          {securitySettings.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              className="bg-white border border-gray-50 rounded-[2rem] p-5 mb-4 shadow-sm"
              activeOpacity={setting.type === "toggle" ? 1 : 0.7}
            >
              <View className="flex-row items-center">
                <View className="bg-indigo-50 rounded-2xl w-12 h-12 items-center justify-center mr-4">
                  <Ionicons name={setting.icon as any} size={22} color="#4F46E5" />
                </View>

                <View className="flex-1">
                  <Text className="text-text-primary font-bold text-base mb-0.5">
                    {setting.title}
                  </Text>
                  <Text className="text-text-secondary text-xs font-medium">{setting.description}</Text>
                </View>

                {setting.type === "toggle" ? (
                  <Switch
                    value={setting.value}
                    onValueChange={(value) => handleToggle(setting.id, value)}
                    thumbColor="#FFFFFF"
                    trackColor={{ false: "#E5E7EB", true: "#4F46E5" }}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>


        {/* Privacy Section */}
        <View className="px-6 pt-4">
          <Text className="text-text-primary text-xl font-black mb-5">Privacy</Text>

          {privacySettings.map((setting) => (
            <View key={setting.id} className="bg-white border border-gray-50 rounded-[2rem] p-5 mb-4 shadow-sm">
              <View className="flex-row items-center">
                <View className="bg-indigo-50 rounded-2xl w-12 h-12 items-center justify-center mr-4">
                  <Ionicons name={setting.icon as any} size={22} color="#4F46E5" />
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-bold text-base mb-0.5">
                    {setting.title}
                  </Text>
                  <Text className="text-text-secondary text-xs font-medium">{setting.description}</Text>
                </View>
                <Switch
                  value={setting.value}
                  onValueChange={(value) => handleToggle(setting.id, value)}
                  trackColor={{ false: "#E5E7EB", true: "#4F46E5" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          ))}
        </View>


        {/* ACCOUNT SECTION */}
        <View className="px-6 pt-4">
          <Text className="text-text-primary text-xl font-black mb-5">Account</Text>

          {accountSettings.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              className="bg-white border border-gray-50 rounded-[2rem] p-5 mb-4 shadow-sm"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="bg-indigo-50 rounded-2xl w-12 h-12 items-center justify-center mr-4">
                  <Ionicons name={setting.icon as any} size={22} color="#4F46E5" />
                </View>
                <View className="flex-1">
                  <Text className="text-text-primary font-bold text-base mb-0.5">
                    {setting.title}
                  </Text>
                  <Text className="text-text-secondary text-xs font-medium">{setting.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* DELETE ACC BTN */}
        <View className="px-6 pt-4">
          <TouchableOpacity
            className="bg-red-50 rounded-[2rem] p-5 flex-row items-center justify-between border border-red-100 shadow-sm"
            activeOpacity={0.7}
          >
            <View className="flex-row items-center">
              <View className="bg-red-100/50 rounded-2xl w-12 h-12 items-center justify-center mr-4">
                <Ionicons name="trash" size={22} color="#EF4444" />
              </View>
              <View>
                <Text className="text-red-600 font-black text-base">Delete Account</Text>
                <Text className="text-red-400 font-medium text-xs">Permanently delete your account</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* INFO ALERT */}
        <View className="px-6 pt-8 pb-4">
          <View className="bg-indigo-50 rounded-[2rem] p-6 flex-row border border-indigo-100/50">
            <Ionicons name="information-circle" size={24} color="#4F46E5" />
            <Text className="text-text-secondary text-xs font-medium ml-3 flex-1 leading-4">
              We take your privacy seriously. Your data is encrypted and stored securely. You can
              manage your privacy settings at any time.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeScreen>
  );
}

export default PrivacyAndSecurityScreen;
