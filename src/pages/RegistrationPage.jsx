import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {changeIcon, getIcon} from 'react-native-change-icon';
import axios from 'axios';

import logo1 from '../assets/1.png';
import logo2 from '../assets/2.png';
import logo3 from '../assets/3.png';
import logo4 from '../assets/4.png';

const appIcons = [
  {
    id: 1,
    label: 'logo_1',
    img: logo1,
    bg: '#E7D2CC',
  },
  {
    id: 2,
    label: 'logo_2',
    img: logo2,
    bg: '#E4D4C8',
  },
  {
    id: 3,
    label: 'logo_3',
    img: logo3,
    bg: '#F6F0E7',
  },
  {
    id: 4,
    label: 'logo_4',
    img: logo4,
    bg: '#EEEDE7',
  },
];

const RegistrationPage = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const getCurrentIcon = async () => {
      const currentIcon = await getIcon();
      setActiveIcon(
        currentIcon === 'default'
          ? appIcons[0]
          : appIcons.find(icon => icon.label === currentIcon),
      );
    };
    getCurrentIcon();
  }, []);

  const onSelectIcon = async selectedIcon => {
    try {
      await changeIcon(selectedIcon.label);
      setActiveIcon(selectedIcon);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post('https://app.sutradhar.tech/api/api/v1/geticontesting/', {
        mobileNumber,
      });
  
      if (response.data.success) {
        Alert.alert('Registration Successful');
        changeIcon('icon_2');
        console.log('Icon Changed');
      changeIcon(appIcons[1].label);

      } else {
        Alert.alert('Not Registered', 'Registration failed');
        changeIcon('icon_3');
        console.log('Icon Changed');
      changeIcon(appIcons[2].label);

      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again later.');
      console.error('API Request failed:', error);
      // If API request fails, set the icon to default
      changeIcon(appIcons[0].label);
      console.log('Icon Changed');
    }
  };

  return (
    <View style={styles.container}>
      {appIcons.map(icon => (
        <TouchableOpacity
          key={icon.id}
          style={[
            styles.iconContainer,
            activeIcon?.label === icon.label && styles.activeIconContainer,
          ]}
          onPress={() => onSelectIcon(icon)}>
          <Image source={icon.img} style={styles.iconImage} />
          <Text style={styles.iconLabel}>{icon.label}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile number"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.buttonContainer}
        onPress={handleRegistration}>
        <Text style={styles.buttonLabel}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  activeIconContainer: {
    borderWidth: 2,
    borderColor: '#007bff',
  },
  iconImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  iconLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    height: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ae3251',
    elevation: 5,
    marginTop: 60,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default RegistrationPage;
