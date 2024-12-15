import { View, StyleSheet } from 'react-native';
import Card from '@/components/app/Card';

export default function Activity() {
  return (
    <View style={styles.container}>
      <Card title="活動">
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});