import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { useState } from 'react';
// import footTypes from '@/assets/images/foot-types.png';
// or
// import footTypes from '../../../assets/foot-types.png';

interface FilterOption {
  id: string;
  label: string;
  options: string[];
}

export default function ShoeFilter() {
  const [selectedFootType, setSelectedFootType] = useState<string>('Roman');
  const [selectedWidth, setSelectedWidth] = useState<string>('넓음');
  const [selectedLevel, setSelectedLevel] = useState<string>('중급');
  const [size, setSize] = useState<string>('');

  const filterOptions: FilterOption[] = [
    {
      id: 'footType',
      label: '족형',
      options: ['Egyptian', 'Roman', 'Greek']
    },
    {
      id: 'width',
      label: '발볼',
      options: ['좁음', '보통', '넓음']
    },
    {
      id: 'level',
      label: 'Level',
      options: ['엘리트', '고급', '중급', '초급']
    }
  ];

  const getSelectedValue = (id: string) => {
    switch(id) {
      case 'footType': return selectedFootType;
      case 'width': return selectedWidth;
      case 'level': return selectedLevel;
      default: return '';
    }
  };

  const handleOptionSelect = (id: string, value: string) => {
    switch(id) {
      case 'footType': setSelectedFootType(value); break;
      case 'width': setSelectedWidth(value); break;
      case 'level': setSelectedLevel(value); break;
    }
  };

  const handleAnalysis = () => {
    // 분석 로직 구현
  };

  return (
    <View style={styles.container}>
      <View style={styles.footTypeImages}>
        <Image source={require('../../../assets/images/foot-types.png')} style={styles.footTypeImage} />
      </View>
      
      {filterOptions.map((option) => (
        <View key={option.id} style={styles.filterSection}>
          <Text style={styles.filterLabel}>{option.label}</Text>
          <View style={styles.optionsContainer}>
            {option.options.map((item) => (
              <Button
                key={item}
                mode={getSelectedValue(option.id) === item ? 'contained' : 'outlined'}
                onPress={() => handleOptionSelect(option.id, item)}
                style={styles.optionButton}
              >
                {item}
              </Button>
            ))}
          </View>
        </View>
      ))}
      
      <TextInput
        label="Size"
        value={size}
        onChangeText={setSize}
        style={styles.sizeInput}
        keyboardType="numeric"
      />

      <Button
        mode="contained"
        onPress={handleAnalysis}
        style={styles.analysisButton}
      >
        추천 암벽화 검색
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  footTypeImages: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footTypeImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
  },
  filterSection: {
    marginVertical: 12,
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    marginRight: 8,
  },
  sizeInput: {
    marginTop: 16,
  },
  analysisButton: {
    marginTop: 24,
    padding: 8,
  },
});
