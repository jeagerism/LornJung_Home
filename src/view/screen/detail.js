import React from "react";
import { Image, Text, View, StyleSheet, SafeAreaView } from "react-native";
import COLORS from "./color";
import Icon from "react-native-vector-icons/MaterialIcons";

const Detail = ({ navigation, route }) => {
  const productData = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/sohot.png")}
          style={{ resizeMode: "contain", flex: 1 }}
        />
      </View>
      <View style={styles.detailContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginLeft: 10 }}>Alien</Text>
          <Text
            style={{
              fontSize: 16,
              padding: 15,
              backgroundColor: COLORS.green,
              justifyContent: "center",
              alignItems: "center",
              borderBottomLeftRadius: 30,
              borderTopLeftRadius: 30,
              color: COLORS.white,
            }}
          ></Text>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={{ fontSize: 14, color: COLORS.black }}>
            Case1 (สภาวะอากาศร้อนระดับปานกลาง (80°F-90°F or 27°C-32°C)) Noti
            เตรียมน้ำให้เพียงพอและสวมใส่เสื้อผ้าบางเบาเพื่อรักษาความสดชื่นในสภาพอากาศร้อนระดับปานกลาง
            Simple
            อย่าลืมดื่มน้ำเพียงพอและบ่อยครั้งเพื่อรักษาความชุ่มชื้นในร่างกาย
            สวมใส่เสื้อผ้าบางเบาและระบายอากาศได้ดีเพื่อช่วยลดความร้อนและรักษาความรู้สึกสดชื่น
            หลีกเลี่ยงการอยู่ภายนอกในช่วงเวลาที่ร้อนที่สุดและหากจำเป็นต้องอยู่ภายนอก
            ให้สวมหมวกหรือใช้ร่มกันแดดเพื่อป้องกันจากแสงแดดโดยตรง.{"\n"} Case2
            Noti ระวังความร้อนสูง! ดื่มน้ำเพียงพอและรักษาร่างกายเย็นสบายตลอดเวลา
            Simple
            อย่าลืมดื่มน้ำเพียงพอและเพิ่มปริมาณการดื่มในสภาวะอากาศร้อนระดับสูง
            เพื่อป้องกันการขาดน้ำและรักษาความชุ่มชื้นในร่างกาย
            สวมใส่เสื้อผ้าบางเบาและระบายอากาศได้ดีเพื่อช่วยลดความร้อนและรักษาความรู้สึกสดชื่น
            หลีกเลี่ยงกิจกรรมที่ต้องการพลังงานมากหรือเครื่องใช้ที่อาจเพิ่มความร้อนให้แก่ร่างกายในช่วงเวลาที่อากาศร้อนสูงสุด.
            {"\n"}
            Case3(103°F-124°F (39°C-51°C): ระดับความร้อนอันตราย)
            -ภายในอากาศร้อนอันตรายนี้, อย่าออกนอกบ้านหากไม่จำเป็น
            ให้หาที่ร่มรื่นหรือใช้ร่มบังเพื่อป้องกันจากแสงแดดที่ร้อนจัด *ถ้าพอ
            (+ ดื่มน้ำเย็นและดื่มน้ำมากๆ
            และใส่หมวกหรือผ้าคลุมหัวเพื่อปกป้องจากแสงแดดและรังแดดโดยตลอด) Simple
            -หลีกเลี่ยงการอยู่นอกอาคารหรือที่แสงแดดตรงโดยเฉพาะในช่วงเวลาที่อากาศร้อนมากที่สุด
            ให้ใช้เสื้อผ้าที่ระบายความร้อนและหมวกหรือผ้าคลุมหัวเพื่อป้องกันจากแสงแดด
            ดื่มน้ำเพียงพอและบ่อยครั้งเพื่อรักษาความชื้นในร่างกาย
            หากมีอาการไม่สบายหรืออาการอ่อนเพลียรุนแรง
            ให้หาที่ร่มรื่นและพักผ่อนให้เพียงพอ{"\n"} Case 4 -noti
            สภาวะอากาศร้อนอันตรายมากเหล่านี้เป็นอันตรายสำหรับชีวิต
            คุณควรหลีกเลี่ยงการอยู่ภายนอกในเวลาเหล่านี้ -Simple
            ระดับความร้อนนี้อันตรายมาก อย่าออกนอกบ้านเด็ดขาด
            หาที่ร่มรื่นและเย็นสบาย
            เพื่อป้องกันจากความร้อนฉุกเฉินที่อาจก่อให้เกิดอันตรายต่อร่างกาย
            ดื่มน้ำเย็นอย่างต่อเนื่องเพื่อรักษาความชื้นในร่างกาย
            ระวังอาการเหนื่อยหอบหรือมีอาการผิดปกติอื่นๆ
            และหากมีอาการผิดปกติหรือรู้สึกไม่สบาย
            ติดต่อสถานพยาบาลหรือเจ้าหน้าที่ทางการแพทย์ทันที
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    backgroundColor: COLORS.light,
    flex: 0.95,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 30,
  },
  aboutContainer: {
    marginHorizontal: 10,
  },
  buyContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginHorizontal: 20,
    alignItems: "center",
    marginBottom: 50,
  },
});

export default Detail;
