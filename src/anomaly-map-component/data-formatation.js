const DateSorter = (features) => {
  features.sort(function (a, b) {
    var aa = a.date.split("/").reverse().join(),
      bb = b.date.split("/").reverse().join();
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });

  let date = "01/01/1666";
  let count = 0;

  const featureWithDateId = features.map((feature) => {
    if (feature.date !== date) {
      count++;
      date = feature.date;
      return {
        ...feature,
        dateId: count,
      };
    } else {
      return {
        ...feature,
        dateId: count,
      };
    }
  });

  return { features: featureWithDateId, totalCount: count };
};

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

    const unionFeaturesByDate = Object.values(
      totalFeatures.reduce((accu, { date, ...rest }) => {
        if (!accu[date]) accu[date] = {};
        accu[date] = { date, ...accu[date], ...rest };
        return accu;
      }, {})
    );

    const sortedFeaturesAndCount = DateSorter(unionFeaturesByDate);

    return {
      labels: totalLabels,
      features: sortedFeaturesAndCount.features,
      totalCount: sortedFeaturesAndCount.totalCount,
    };
  } else if (globalOrLocal === "local") {
    const featureValuesAndLabels = data.map(({ results }) => {
      let batchFeatures = [];
      for (const features of results) {
        for (const anomaly of features.ranking) {
          const { anomaly_level, feature, importance, value, coordinates } =
            anomaly;
          batchFeatures.push({
            date: features.timestamp,
            name: feature,
            value: value,
            importance: importance,
            anomaly_level: anomaly_level,
            coordinates: coordinates,
            anomalus: features.anomaly === "true" ? "yes" : "no",
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

    const sortedFeaturesAndCount = DateSorter(totalFeatures);
    return sortedFeaturesAndCount.features;
  }
}
