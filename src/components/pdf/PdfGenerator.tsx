'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Font
} from '@react-pdf/renderer';
import type { ExamResults } from '@/types/exam';
import { formatDateShort, formatTime } from '@/lib/utils';

// Register fonts (using system fonts that are likely available)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#002B7A', // UNAM Blue
    paddingBottom: 15
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002B7A', // UNAM Blue
    marginBottom: 5
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b'
  },
  scoreSection: {
    flexDirection: 'row',
    marginBottom: 25,
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#002B7A', // UNAM Blue
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  scoreTotal: {
    fontSize: 10,
    color: '#C59D5F' // UNAM Gold
  },
  scoreDetails: {
    flex: 1,
    justifyContent: 'center'
  },
  scorePercent: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b'
  },
  scoreGrade: {
    fontSize: 16,
    color: '#002B7A', // UNAM Blue
    marginTop: 5
  },
  scoreMessage: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 1.4
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002B7A', // UNAM Blue
    marginBottom: 12,
    marginTop: 20
  },
  table: {
    marginBottom: 15
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    padding: 8,
    marginBottom: 2
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569'
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  tableCell: {
    fontSize: 9,
    color: '#334155'
  },
  col1: { width: '40%' },
  col2: { width: '20%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'center' },
  col4: { width: '20%', textAlign: 'center' },
  priorityItem: {
    flexDirection: 'row',
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#fffbeb', // Light Amber
    borderRadius: 4
  },
  priorityRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C59D5F', // UNAM Gold
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  priorityRankText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  priorityContent: {
    flex: 1
  },
  priorityTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b'
  },
  priorityReason: {
    fontSize: 8,
    color: '#64748b',
    marginTop: 2
  },
  weekPlan: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 4
  },
  weekTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#002B7A', // UNAM Blue
    marginBottom: 5
  },
  weekFocus: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 8
  },
  sessionItem: {
    marginBottom: 5
  },
  sessionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#334155'
  },
  sessionGoals: {
    fontSize: 8,
    color: '#64748b'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10
  },
  footerText: {
    fontSize: 8,
    color: '#94a3b8'
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontSize: 8,
    fontWeight: 'bold'
  },
  badgeGreen: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  badgeYellow: {
    backgroundColor: '#fef9c3',
    color: '#854d0e'
  },
  badgeRed: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  }
});

interface PdfDocumentProps {
  results: ExamResults;
}

const PdfDocument = ({ results }: PdfDocumentProps) => {
  const getBadgeStyle = (percent: number) => {
    if (percent >= 70) return styles.badgeGreen;
    if (percent >= 50) return styles.badgeYellow;
    return styles.badgeRed;
  };

  return (
    <Document>
      {/* Page 1: Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Diagnóstico Académico</Text>
          <Text style={styles.subtitle}>
            Examen de Ingreso a Bachillerato • {formatDateShort(results.completedAt)}
          </Text>
        </View>

        <View style={styles.scoreSection}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{results.totalCorrect}</Text>
            <Text style={styles.scoreTotal}>de {results.totalQuestions}</Text>
          </View>
          <View style={styles.scoreDetails}>
            <Text style={styles.scorePercent}>{results.percent}%</Text>
            <Text style={styles.scoreGrade}>{results.grade}</Text>
            <Text style={styles.scoreMessage}>{results.message}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rendimiento por Área</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.col1]}>Área</Text>
            <Text style={[styles.tableHeaderCell, styles.col2]}>Correctas</Text>
            <Text style={[styles.tableHeaderCell, styles.col3]}>Total</Text>
            <Text style={[styles.tableHeaderCell, styles.col4]}>Porcentaje</Text>
          </View>
          {results.bySection.map((section, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.col1]}>{section.section}</Text>
              <Text style={[styles.tableCell, styles.col2]}>{section.correct}</Text>
              <Text style={[styles.tableCell, styles.col3]}>{section.total}</Text>
              <View style={[styles.col4, { alignItems: 'center' }]}>
                <Text style={[styles.badge, getBadgeStyle(section.percent)]}>
                  {section.percent}%
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Top 5 Prioridades de Estudio</Text>
        {results.priorities.slice(0, 5).map((priority, idx) => (
          <View key={idx} style={styles.priorityItem}>
            <View style={styles.priorityRank}>
              <Text style={styles.priorityRankText}>{priority.rank}</Text>
            </View>
            <View style={styles.priorityContent}>
              <Text style={styles.priorityTitle}>
                {priority.subtopic} ({priority.section})
              </Text>
              <Text style={styles.priorityReason}>{priority.reason}</Text>
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Simulador de Examen Diagnóstico</Text>
          <Text style={styles.footerText}>Página 1 de 2</Text>
        </View>
      </Page>

      {/* Page 2: Study Plan */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Plan de Estudio - 4 Semanas</Text>
          <Text style={styles.subtitle}>
            Plan personalizado basado en tu diagnóstico
          </Text>
        </View>

        {results.studyPlan4w.map((week, idx) => (
          <View key={idx} style={styles.weekPlan}>
            <Text style={styles.weekTitle}>Semana {week.week}</Text>
            <Text style={styles.weekFocus}>Enfoque: {week.focus}</Text>
            {week.sessions.map((session, sIdx) => (
              <View key={sIdx} style={styles.sessionItem}>
                <Text style={styles.sessionTitle}>
                  • {session.title} ({session.minutes} min)
                </Text>
                <Text style={styles.sessionGoals}>
                  Objetivos: {session.goals.join(', ')}
                </Text>
              </View>
            ))}
          </View>
        ))}

        {results.mistakes.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              Errores más importantes ({Math.min(results.mistakes.length, 5)} de {results.mistakes.length})
            </Text>
            {results.mistakes.slice(0, 5).map((mistake, idx) => (
              <View key={idx} style={[styles.tableRow, { flexDirection: 'column', padding: 10 }]}>
                <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#991b1b', marginBottom: 4 }}>
                  Pregunta {mistake.questionNumber} - {mistake.section}
                </Text>
                <Text style={{ fontSize: 8, color: '#64748b', marginBottom: 2 }}>
                  Tu respuesta: {mistake.chosen || 'Sin respuesta'} | Correcta: {mistake.correct}
                </Text>
                <Text style={{ fontSize: 8, color: '#334155' }}>
                  {mistake.recommendation}
                </Text>
              </View>
            ))}
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Tiempo total: {formatTime(results.totalTimeSec)} • ID: {results.attemptId.substring(0, 8)}
          </Text>
          <Text style={styles.footerText}>Página 2 de 2</Text>
        </View>
      </Page>
    </Document>
  );
};

export async function generatePDF(results: ExamResults) {
  const blob = await pdf(<PdfDocument results={results} />).toBlob();
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Diagnostico_Simulador_${formatDateShort(results.completedAt).replace(/\//g, '-')}_${results.attemptId.substring(0, 8)}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
