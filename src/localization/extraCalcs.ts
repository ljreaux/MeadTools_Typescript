const abvCalc = {
  en: {
    abvHeading: "ABV Calculator",
    ogLabel: "Enter OG:",
    fgLabel: "Enter FG:",
  },
};

const brixCalc = {
  en: {
    brixHeading: "Brix Conversion Calculator",
    gravityLabel: "Enter Gravity:",
  },
};

const estOG = {
  en: {
    ogHeading: "Estimated OG Without Reading",
    hydrometerFG: "Enter Hydrometer FG:",
    refractometerFG: "Enter Refractometer FG:",
    estimatedOG: "Estimated OG:",
  },
};

const benchTrials = {
  en: {
    benchTrialsHeading: "Bench Trials",
    batchSize: "Batch Size:",
    sampleSize: "Sample Size (ml):",
    stockSolutionConcentration: "Concentration (%):",
    solutionVolume: "Stock Solution Volume:",
    adjunctAmount: "Adjunct Amount in sample (g):",
    adjunctConcentration: "Adjunct Concentration (PPM):",
    gallonScaledAdjunct: "Scaled Adjunct g/gallon:",
    literScaledAdjunct: "Scaled Adjunct g/liter:",
    scaledBatch: "Scaled Adjunct (entire batch):",
  },
};

const stabilizers = {
  en: {
    sorbateHeading: "Sorbate Addition Calculator",
    kSorb: "k-sorbate",
    sulfiteHeading: "Sulfite Addition Calculator",
    desiredPpm: "Desired PPM:",
    kMeta: "k-meta",
  },
};

const refractometer = {
  en: {
    refractometerHeading: "Refractometer Correction Calculator",
    correctionFactor: "Correction Factor:",
    fgInBrix: "Enter FG in Brix:",
  },
};

const tempCorrection = {
  en: {
    tempCorrectionHeading: "Temperature Correction Calculator",
    measuredSG: "Measured SG:",
    curTemp: "Current Temp:",
    calTemp: "Calibration Temp:",
  },
};

const blending = {
  en: {
    blendingHeading: "Blending Calculator",
    valOne: "Value One:",
    valTwo: "Value Two:",
    volOne: "Volume One:",
    volTwo: "Volume Two:",
    totalVol: "Total Volume:",
    blendedVal: "Blended Value:",
  },
};

const ExtraCalcsEN = {
  ...abvCalc.en,
  ...brixCalc.en,
  ...estOG.en,
  ...benchTrials.en,
  ...stabilizers.en,
  ...refractometer.en,
  ...tempCorrection.en,
  ...blending.en,
};

export const extraCalcsTranslations = [ExtraCalcsEN];
