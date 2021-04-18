import React from 'react';
import {
  Page,
  Image,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

import './Preview.css';

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
  },
  section: {
    backgroundColor: 'rgb(66, 152, 223)',
    height: '100%',
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

// Create Document Component
const MyDocument = (props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/*passing an empty string makes this crash*/}
        {props.img ? (
          <View style={styles.pictureContainer}>
            <Image src={props.img} style={styles.image} />
          </View>
        ) : (
          false
        )}
      </View>
    </Page>
  </Document>
);

function Preview(props) {
  return (
    <div className="PreviewContainer">
      <PDFViewer width="595px" height="842px">
        <MyDocument img={props.currentImg}></MyDocument>
      </PDFViewer>
    </div>
  );
}

export default Preview;
