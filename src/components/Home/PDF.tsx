import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "../../assets/full-logo.png";
import { Ingredient } from "../../App";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 480,
    height: 270,
  },
  sectionTwo: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});

// Create Document Component
const MyDocument = ({ ingredients }: { ingredients: Ingredient[] }) => {
  const primary = ingredients.filter((item) => !item.secondary);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={styles.image} />
        <View>
          <View style={styles.sectionTwo}>
            <Text>Ingredients</Text>
            <Text>Weight</Text>
            <Text>Volume</Text>
          </View>
          {primary.map((item) => (
            <View style={styles.sectionTwo}>
              <Text>{item.name}</Text>
              <Text>{item.details[0]}</Text>
              <Text>{item.details[1]}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;
