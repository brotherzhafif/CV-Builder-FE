import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  Link
} from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  headline: { fontSize: 14, color: '#444', marginBottom: 8 },
  contact: { fontSize: 10, color: '#666', lineHeight: 1.4 },
  section: { marginBottom: 15 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#000', paddingBottom: 4 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  company: { fontWeight: 'bold', fontSize: 12 },
  date: { color: '#666', fontSize: 10 },
  address: { color: '#666', fontSize: 9, marginBottom: 4 },
  educationItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  skillsColumn: { padding: 3, flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  skillsList: { width: '48%' },
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month] = dateString.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const CVPreviewPDF = ({ formData }) => {
  const { personal, work, education, skills, summary } = formData;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personal?.firstName} {personal?.lastName}
          </Text>
          {personal?.headline && (
            <Text style={styles.headline}>{personal.headline}</Text>
          )}
          <View style={styles.contact}>
            <Text>
              {[personal?.city, personal?.state].filter(Boolean).join(', ')}
            </Text>
            <Text>
              {personal?.email} | {personal?.phone}
            </Text>
            {personal?.portfolio && (
              <Link src={personal.portfolio} style={{ color: '#2b6cb0' }}>
                {personal.portfolio}
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Summary</Text>
            <Text style={{ lineHeight: 1.4 }}>{summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {work?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Work Experience</Text>
            {work.map((job, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={styles.jobHeader}>
                  <Text style={styles.company}>{job.title}</Text>
                  <Text style={styles.date}>
                    {formatDate(job.startDate)} -{' '}
                    {job.current ? 'Present' : formatDate(job.endDate)}
                  </Text>
                </View>
                <Text style={{ fontSize: 10, color: '#444', marginBottom: 2 }}>
                  {job.company}
                  {job.employmentType && ` • ${job.employmentType}`}
                </Text>
                {job.address && (
                  <Text style={styles.address}>{job.address}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>{edu.degree}</Text>
                  <Text style={{ fontSize: 10, color: '#444' }}>
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#666' }}>
                    {edu.fieldOfStudy}
                  </Text>
                </View>
                <Text style={styles.date}>
                  {formatDate(edu.startDate)} -{' '}
                  {edu.current ? 'Present' : formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Skills</Text>
            <View style={styles.skillsColumn}>
              <View style={styles.skillsList}>
                {skills.slice(0, Math.ceil(skills.length / 2)).map((skill, i) => (
                  <Text key={i} style={{ marginBottom: 4 }}>• {skill}</Text>
                ))}
              </View>
              <View style={styles.skillsList}>
                {skills.slice(Math.ceil(skills.length / 2)).map((skill, i) => (
                  <Text key={i} style={{ marginBottom: 4 }}>• {skill}</Text>
                ))}
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVPreviewPDF;