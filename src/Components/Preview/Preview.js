import React from 'react';
import {
  Page,
  Image,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
} from '@react-pdf/renderer';

import './Preview.css';

import RalewayRegular from '../../Assets/Fonts/Raleway-Regular.ttf';
import RalewayMedium from '../../Assets/Fonts/Raleway-Medium.ttf';
import RalewayBold from '../../Assets/Fonts/Raleway-Bold.ttf';

Font.register({
  family: 'Raleway',
  fonts: [
    { src: RalewayRegular },
    { src: RalewayMedium, fontWeight: 'medium' },
    { src: RalewayBold, fontWeight: 'bold' },
  ],
});

// Create styles
const styles = StyleSheet.create({
  pictureContainer: {
    border: '2 solid white',
    borderRadius: '100%',

    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 20,
  },
  image: {
    width: 90,
    height: 90,
    objectFit: 'cover',
    objectPosition: 'center',

    borderRadius: '100%',
  },
  page: {
    flexDirection: 'row',
    fontFamily: 'Raleway',
  },
  sideBar: {
    backgroundColor: 'rgb(66, 152, 223)',
    height: '100%',
    width: '35%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main: {
    width: '35%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

// Create Document Component
const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.sideBar}>
        {/*passing an empty string makes this crash*/}
        {props.img ? (
          <View style={styles.pictureContainer}>
            <Image src={props.img} style={styles.image} />
          </View>
        ) : (
          false
        )}
      </View>
      <View style={styles.main}>
        <Text>{props.info[0] || false}</Text>
      </View>
    </Page>
  </Document>
);

function Preview(props) {
  return (
    <div className="PreviewContainer">
      <PDFViewer width="595px" height="842px">
        <MyDocument img={props.currentImg} info={props.info}></MyDocument>
      </PDFViewer>
    </div>
  );
}

export default Preview;
