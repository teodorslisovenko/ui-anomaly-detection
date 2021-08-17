export const anomalySchema = {
    "$schema": "http://json-schema.org/schema#",
    "title": "Anomaly",
    "type": "object",
    "required": ["results"],
    "properties": {
      "results": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "timestamp": {
              "type": "string",
              "pattern": "^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)\\d{4}$"
            },
            "anomaly": {
              "type": "string"
            },
            "ranking": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "anomaly_level": {
                    "type": "number"
                  },
                  "feature": {
                    "type": "string"
                  },
                  "importance": {
                    "type": "number"
                  },
                  "value": {
                    "type": "number"
                  },
                  "coordinates": {
                    "type": "object",
                    "properties": {
                      "x": {
                        "type": "string"
                      },
                      "y": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "x",
                      "y"
                    ]
                  }
                },
                "required": [
                  "anomaly_level",
                  "feature",
                  "importance",
                  "value",
                  "coordinates"
                ]
              }
            }
          },
          "required": ["timestamp", "anomaly", "ranking"]
        }
      }
    }
  };
