import React from 'react';
import {
  Page,
  Image,
  Text,
  Link,
  View,
  Document,
  StyleSheet,
  Font,
  PDFViewer,
  PDFDownloadLink,
} from '@react-pdf/renderer';

import './Preview.css';

import RalewayRegular from '../../Assets/Fonts/Raleway-Regular.ttf';
import RalewayMedium from '../../Assets/Fonts/Raleway-Medium.ttf';
import RalewayBold from '../../Assets/Fonts/Raleway-Bold.ttf';

import { convertDateRangeToString } from '../ExperienceList/ExperienceList.js';

Font.register({
  family: 'Raleway',
  fonts: [
    { src: RalewayRegular },
    { src: RalewayMedium, fontWeight: 'medium' },
    { src: RalewayBold, fontWeight: 'bold' },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

// Create styles
const styles = StyleSheet.create({
  pictureContainer: {
    border: '2 solid white',
    borderRadius: '100%',

    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',

    margin: 20,
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
    color: 'white',
  },
  main: {
    width: '65%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  profession: {},
  nameDisplay: {
    position: 'relative',
    width: '90%',
    height: '12%',
    margin: 20,
    backgroundColor: 'rgb(66, 152, 223)',
    color: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  sideBarSection: {
    marginLeft: 40,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  sideBarContent: {
    fontSize: 10.5,
    margin: '5 40 20 10',
  },
  listCircle: {
    height: 2,
    width: 2,
    borderRadius: '100%',
    backgroundColor: 'white',
    marginRight: 10,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    lineHeight: 2,
  },
  contactsSection: {
    lineHeight: 2,
    fontSize: 10.5,
  },
  icon: {
    width: 10,
    height: 10,
  },
  mainSection: {
    width: '90%',
    marginBottom: 25,
  },
  mainContent: {
    margin: '0 40',
    fontSize: 10.5,
  },
});

let convertUrlToUsername = (url) => {
  let copy = url.replace(/https:\/\//i, '');
  copy = copy.replace(/(www\.)?.+\.com\/(in\/)?/i, '');
  copy = copy.replace(/(\/)?$/, ''); //remove trailing '/'

  return copy;
};

// Create Document Component
const MyDocument = (props) => {
  let generateExperience = (experience) => {
    return (
      <View style={{ margin: '15 0' }} key={experience.id}>
        <Text style={{ fontWeight: 400 }}>{experience.title}</Text>
        <Text>{experience.description}</Text>
        <Text style={{ marginTop: '10' }}>
          {experience.startDate || experience.endDate
            ? convertDateRangeToString(experience.startDate, experience.endDate)
            : false}
        </Text>
      </View>
    );
  };

  let generateSection = (section, index) => {
    if (!section.list.length) return false;
    return (
      <View style={styles.mainSection} key={section.id}>
        <Text style={styles.header}>{section.title}</Text>
        <View style={styles.mainContent}>
          {props.sections[index].list.map(generateExperience)}
        </View>
      </View>
    );
  };

  return (
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
          <View style={styles.sideBarSection}>
            <Text style={styles.header}>Summary</Text>
            <Text style={styles.sideBarContent}>
              {props.info[1].input || false}
            </Text>
          </View>
          <View style={styles.sideBarSection}>
            <Text style={styles.header}>Contacts</Text>
            <View
              style={{ ...styles.sideBarContent, ...styles.contactsSection }}
            >
              <View>
                {/* 
                For some weird reason, if none of the first 3 images
                in this section get displayed, the download button at
                the bottom of the page does not work.

                To circumvent that, here we display one of those images
                with 0x0 dimensions.
                */}
                <Image
                  src={props.info[2].icon}
                  style={{ position: 'absolute', width: 0, height: 0 }}
                />
                {/* */}
                {props.info[2].input ? (
                  <View>
                    <Image src={props.info[2].icon} style={styles.icon} />
                    <Text>{props.info[2].input || false}</Text>
                  </View>
                ) : (
                  false
                )}
              </View>
              <View>
                {props.info[3].input ? (
                  <View>
                    <Image src={props.info[3].icon} style={styles.icon} />
                    <Text>{props.info[3].input || false}</Text>
                  </View>
                ) : (
                  false
                )}
              </View>
              <View>
                {props.info[4].input ? (
                  <View>
                    <Image src={props.info[4].icon} style={styles.icon} />
                    <Text>{props.info[4].input || false}</Text>
                  </View>
                ) : (
                  false
                )}
              </View>
              <View>
                {props.info[5].input ? (
                  <View>
                    <Image src={props.info[5].icon} style={styles.icon} />
                    <Link
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      src={props.info[5].input || false}
                    >
                      {convertUrlToUsername(props.info[5].input) || false}
                    </Link>
                  </View>
                ) : (
                  false
                )}
              </View>

              <View>
                {props.info[6].input ? (
                  <View>
                    <Image src={props.info[6].icon} style={styles.icon} />
                    <Link
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      src={props.info[6].input || false}
                    >
                      {convertUrlToUsername(props.info[6].input) || false}
                    </Link>
                  </View>
                ) : (
                  false
                )}
              </View>
            </View>
          </View>
          <View style={styles.sideBarSection}>
            <Text style={styles.header}>Skills</Text>
            <View style={styles.sideBarContent}>
              {props.skills
                ? props.skills.map((skill) => {
                    return (
                      <View style={styles.listItem} key={skill.id}>
                        <View style={styles.listCircle} />
                        <Text>{skill.text}</Text>
                      </View>
                    );
                  })
                : false}
            </View>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.nameDisplay}>
            <Text style={styles.name}>{props.info[0].input || false}</Text>
            <Text style={styles.profession}>
              {props.info[7].input || false}
            </Text>
          </View>

          {props.sections ? props.sections.map(generateSection) : false}
        </View>
      </Page>
    </Document>
  );
};

function Preview(props) {
  let generatedPDF = (
    <MyDocument
      img={props.currentImg}
      info={props.info}
      skills={props.skills}
      sections={props.sections}
    />
  );
  return (
    <div className="PreviewContainer">
      <PDFViewer width="595px" height="842px">
        {generatedPDF}
      </PDFViewer>
      <PDFDownloadLink
        className="DownloadLink"
        document={generatedPDF}
        fileName="cv.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default Preview;
