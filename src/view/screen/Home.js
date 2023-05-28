import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import * as Location from "expo-location";
import Weather from "../../../components/Weather";
import { API_KEY } from "../../../utils/WeatherAPIKey";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "./color";

class Home extends Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
  };

  componentDidMount() {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status === "granted") {
          Location.getCurrentPositionAsync()
            .then((position) => {
              this.fetchWeather(
                position.coords.latitude,
                position.coords.longitude
              );
            })
            .catch((error) => {
              console.error("Error Getting Weather Conditions:", error);
              this.setState({
                isLoading: false,
                error: "Error Getting Weather Conditions",
              });
            });
        } else {
          this.setState({
            isLoading: false,
            error: "Location permission not granted",
          });
        }
      })
      .catch((error) => {
        console.error("Error Getting Location Permission:", error);
        this.setState({
          isLoading: false,
          error: "Error Getting Location Permission",
        });
      });
  }

  fetchWeather = (lat = 25, lon = 25) => {
    this.setState({ isLoading: true });

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoading: false,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, error: "Error Fetching Weather" });
      });
  };

  render() {
    const { isLoading, temperature, error } = this.state;
    const handleEmergencyCall = () => {
      const phoneNumber = "1669"; // เพิ่มเบอร์โทรฉุกเฉินที่ต้องการ

      Linking.openURL(`tel:${phoneNumber}`);
    };
    const temperatureText =
      temperature > 51
        ? "อุณหภูมิสูงมาก"
        : temperature > 46 && temperature < 51
        ? "อุณหภูมิสูง"
        : temperature > 37 && temperature < 45
        ? "อุณหภูมิร้อน"
        : temperature < 36 && temperature > 27
        ? "อุณหภูมิปานกลาง"
        : "อุณหภูมิปกติ";

    const arrowUpMargin =
      temperature > 51
        ? 300
        : temperature > 46 && temperature < 51
        ? 250
        : temperature > 37 && temperature < 45
        ? 200
        : temperature < 36 && temperature > 27
        ? 40
        : 10;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={styles.header}>
          <View style={{}}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.subtitle}>Heat Index</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Detail")}
        >
          <View style={styles.topContainer}>
            <View style={styles.messegeTop}>
              <View>
                <Image
                  source={require("../../assets/m.png")}
                  style={{ width: 40, height: 40, position: "relative" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    height: 30,
                    alignItems: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  คำแนะนำในการป้องกัน
                </Text>
              </View>
            </View>
            <View style={styles.top}>
              <View style={{}}>
                <Text style={{ fontSize: 20 }}>{temperatureText}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.statusContainer}>
          <View style={styles.cardTop1}>
            <View style={styles.barTop1}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: 40,
                    height: 30,
                    alignItems: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Shirt
                </Text>
              </View>
              <View>
                <Image
                  source={require("../../assets/tshirt.png")}
                  style={{ width: 40, height: 40, position: "relative" }}
                />
              </View>
            </View>
            <View style={styles.contentZone}>
              <View style={styles.colorContainer}>
                <View style={styles.color1}></View>
                <View style={styles.color2}></View>
                <View style={styles.color3}></View>
              </View>
            </View>
          </View>
          <View style={styles.cardTop2}>
            <View style={styles.barTop2}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    width: 100,
                    height: 30,
                    alignItems: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: COLORS.white,
                  }}
                >
                  Temp
                </Text>
              </View>
              <View style={styles.Iamge1}>
                <Image
                  source={require("../../assets/temp.png")}
                  style={{ width: 40, height: 40, position: "relative" }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.statusBarBottom1}>
                {isLoading ? (
                  <Text style={styles.loadingText}>Fetching The Weather</Text>
                ) : error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : (
                  <Weather temperature={temperature} />
                )}
                <Text style={{ color: COLORS.white }}>°C</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomcard}>
          <View style={styles.bottomcard1}>
            <View style={styles.bottomBar1}>
              <View style={styles.statusBarBottom1}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      width: 50,
                      height: 30,
                      alignItems: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Water
                  </Text>
                </View>
                <View style={styles.Iamge1}>
                  <Image
                    source={require("../../assets/water-bottle.png")}
                    style={{ width: 40, height: 40, position: "relative" }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.bottomBarContent}>
              <View style={styles.Bottle}>
                <View style={styles.Water}></View>
              </View>

              <View style={styles.BottleFa}></View>
            </View>
            <View style={styles.btnGroup}>
              <View style={styles.btnReset}>
                <Icon name="cached" size={30} color={COLORS.white}></Icon>
              </View>
              <View style={styles.Lit}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>0.1L</Text>
              </View>
              <View style={styles.btnAdd}>
                <Icon name="add" size={29} color={COLORS.white}>
                  {" "}
                </Icon>
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("DetailEmergency")}
          >
            <View style={styles.bottomcard2}>
              <View style={styles.bottomBar1}>
                <View style={styles.statusBarBottom1}>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Status
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={require("../../assets/risk.png")}
                      style={{ width: 40, height: 40, position: "relative" }}
                    />
                  </View>
                </View>
                <View style={styles.contentZone2}>
                  <View style={styles.colorContainer2}>
                    <View style={styles.risk11}></View>
                    <View style={styles.risk1}></View>
                    <View style={styles.risk2}></View>
                    <View style={styles.risk3}></View>
                    <View style={styles.risk4}></View>
                  </View>
                  <View style={{ marginLeft: arrowUpMargin }}>
                    <Image
                      source={require("../../assets/arrow-up.png")}
                      style={{ width: 20, height: 20, position: "relative" }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      Level : 1
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginLeft: 190,
            padding: 24,
            backgroundColor: "#ff6600",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            size: 20,
          }}
          onPress={handleEmergencyCall}
        >
          <Text>โทรฉุกเฉิน</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.green,
  },

  loadingText: {
    fontSize: 16,
    color: "rgba(236, 153, 95, 1)",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  IconEdit: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.green,
    borderColor: COLORS.green,
    borderRadius: 25,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 120,
  },
  topContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
  messegeTop: {
    flexDirection: "row",
    backgroundColor: COLORS.gray,
    padding: 10,
  },
  cardTop1: {
    height: 165,
    width: 165,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
  cardTop2: {
    height: 165,
    width: 165,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    borderTopRightRadius: 10,
    borderColor: COLORS.gray,
    borderRadius: 10,
    backgroundColor: COLORS.green,
  },
  statusContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  barTop1: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  barTop2: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  color1: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.light,
    borderWidth: 1,
  },
  color2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.yellow,
    borderWidth: 1,
  },
  color3: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.orange,
    borderWidth: 1,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  risk1: {
    width: 30,
    height: 20,
    borderRadius: 5,
    backgroundColor: COLORS.green2,
    borderWidth: 1,
  },
  risk11: {
    width: 30,
    height: 20,
    borderRadius: 5,
    backgroundColor: COLORS.green,
    borderWidth: 1,
  },
  risk2: {
    width: 30,
    height: 20,
    borderRadius: 5,
    backgroundColor: COLORS.yellow2,
    borderWidth: 1,
  },
  risk3: {
    width: 30,
    height: 20,
    borderRadius: 5,
    backgroundColor: COLORS.orange,
    borderWidth: 1,
  },
  risk4: {
    width: 30,
    height: 20,
    borderRadius: 5,
    backgroundColor: COLORS.red,
    borderWidth: 1,
  },
  colorContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
  },
  bottomcard1: {
    height: 205,
    width: 165,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 10,
    marginTop: 20,
  },
  statusBarBottom1: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  Bottle: {
    width: 120,
    height: 50,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.dark,
    borderRadius: 20,
  },
  BottleFa: {
    width: 20,
    height: 30,
    backgroundColor: COLORS.light,
    borderWidth: 1,
    borderColor: COLORS.dark,
    borderRadius: 10,
  },
  bottomBarContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  Water: {
    backgroundColor: COLORS.sky,
    width: 100,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.dark,
    borderRadius: 20,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 25,
  },
  btnReset: {
    padding: 10,
    backgroundColor: COLORS.btnWater,
    borderRadius: 15,
  },
  btnAdd: {
    padding: 10,
    backgroundColor: COLORS.btnWater,
    borderRadius: 15,
  },
  bottomcard2: {
    height: 165,
    width: 165,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 2,
    borderColor: COLORS.gray,
    borderRadius: 10,
    marginTop: 20,
  },
  bottomcard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textAgency: {
    alignItems: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Home;
