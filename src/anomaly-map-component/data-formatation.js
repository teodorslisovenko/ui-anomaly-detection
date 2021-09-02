export default function DataFormatation(data, globalOrLocal) {
  if (globalOrLocal === "global") {
    const featureValuesAndLabels = data.map(({ results }) => {
      let batchLables = new Set();
      let batchFeatures = [];

      for (const features of results) {
        for (const anomaly of features.ranking) {
          const { feature, value } = anomaly;
          batchFeatures.push({
            date: features.timestamp,
            [feature]: value,
          });
          batchLables.add(feature);
        }
      }
      return { labels: batchLables, features: batchFeatures };
    });

    let totalLabels = new Set();
    let totalFeatures = [];

    for (const object of featureValuesAndLabels) {
      for (const feature of object.features) {
        totalFeatures.push(feature);
      }

      for (let elem of object.labels) {
        totalLabels.add(elem);
      }
    }

    const unionFeatures = Object.values(
      totalFeatures.reduce((accu, { date, ...rest }) => {
        if (!accu[date]) accu[date] = {};
        accu[date] = { date, ...accu[date], ...rest };
        return accu;
      }, {})
    );

    return { labels: totalLabels, features: unionFeatures };
  } else if (globalOrLocal === "local") {
    const featureValuesAndLabels = data.map(({ results }) => {
      let batchFeatures = [];
      for (const features of results) {
        for (const anomaly of features.ranking) {
          const { anomaly_level, feature, importance, value } = anomaly;
          batchFeatures.push({
            date: features.timestamp,
            name: feature,
            value: value,
            importance: importance,
            anomaly_level: anomaly_level,
          });
        }
      }
      return batchFeatures;
    });

    let totalFeatures = [];

    for (const object of featureValuesAndLabels) {
      for (const feature of object) {
        totalFeatures.push(feature);
      }
    }
    return totalFeatures;
  }
}
