import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginInicial from './LoginInicial';
import LoginVecino from './LoginVecino';
import LoginInspector from './LoginInspector';
import ServiciosInspector from './ServiciosInspector';

const Stack = createStackNavigator();

const ServiciosScreen = ({ navigation }) => {
  const [serviciosComercios, setServiciosComercios] = useState([]);
  const [serviciosProfesionales, setServiciosProfesionales] = useState([]);

  useEffect(() => {
    const fetchServiciosComercios = async () => {
      try {
        const response = await axios.get('http://192.168.0.241:8080/inicio/servicios/comercios');
        setServiciosComercios(response.data);
      } catch (error) {
        console.error('Error fetching comercios:', error);
      }
    };

    const fetchServiciosProfesionales = async () => {
      try {
        const response = await axios.get('http://192.168.0.241:8080/inicio/servicios/profesionales');
        setServiciosProfesionales(response.data);
      } catch (error) {
        console.error('Error fetching profesionales:', error);
      }
    };

    fetchServiciosComercios();
    fetchServiciosProfesionales();
  }, []);

  const renderCard = (servicio, index) => (
    <View key={index} style={styles.card}>
      {servicio.nombre !== undefined && (
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.cardText}><Text style={styles.boldText}>Responsable:</Text> {servicio.apellido + " " + servicio.nombre}</Text>
          <Text style={styles.cardText}><Text style={styles.boldText}>Horario:</Text> {servicio.horario}</Text>
          <Text style={styles.cardText}><Text style={styles.boldText}>Rubro:</Text> {servicio.rubro}</Text>
        </View>
      )}
      {servicio.direccion !== undefined &&(
        <View style={{ flexDirection: "column" }}>
            <Text style={styles.cardText}><Text style={styles.boldText}>Dirección:</Text> {servicio.direccion}</Text>
        </View>
      )}
      <Text style={styles.cardText}><Text style={styles.boldText}>Contacto:</Text> {servicio.contacto}</Text>
      <Text style={styles.cardText}><Text style={styles.boldText}>Descripción:</Text> {servicio.descripcion}</Text>
    </View>
  );

  const handleLoginPress = () => {
    navigation.navigate('LoginInicial');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={handleLoginPress}>
          <Image source={require('./assets/BotonPersonita.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MiMuni</Text>
        <View style={{ width: 20 }}></View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.subtitle}>Comercios</Text>
        {serviciosComercios.map((servicio, index) => renderCard(servicio, index))}
        <Text style={styles.subtitle}>Profesionales</Text>
        {serviciosProfesionales.map((servicio, index) => renderCard(servicio, index))}
      </ScrollView>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Servicios">
        <Stack.Screen
          name="Servicios"
          component={ServiciosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginInicial" component={LoginInicial} options={{ headerShown: false }} />
        <Stack.Screen name="LoginVecino" component={LoginVecino} />
        <Stack.Screen name="LoginInspector" component={LoginInspector} />
        <Stack.Screen name="ServiciosInspector" component={ServiciosInspector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E9E4',
  },
  header: {
    backgroundColor: '#4A4E69',
    paddingTop: 70,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#8C7D85',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cardText: {
    color: '#FFF',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});