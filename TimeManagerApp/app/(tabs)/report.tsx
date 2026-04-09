import { View, Text, StyleSheet } from 'react-native';

export default function ReportScreen() {
  // TEMP DATA (we will connect real data next)
  const total = 5;
  const done = 3;
  const missed = 2;
  const score = Math.round((done / total) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Report</Text>

      <Text style={styles.text}>Total Tasks: {total}</Text>
      <Text style={styles.text}>Done: {done}</Text>
      <Text style={styles.text}>Missed: {missed}</Text>
      <Text style={styles.score}>Score: {score}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  score: {
    fontSize: 22,
    color: 'lightgreen',
    marginTop: 20,
    fontWeight: 'bold',
  },
});