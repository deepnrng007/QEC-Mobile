export const getDefectsInjected = attributes => {
  const productItem = attributes.find(item => {
    return item.attribute == 'DefectsInjected';
  });
  return productItem?.currentStatus;
};

export const getDefectsFixed = attributes => {
  const productItem = attributes.find(item => {
    return item.attribute == 'DefectsFixed';
  });
  return productItem?.currentStatus;
};

export const getDefectsTrends = attributes => {
  const productItem = attributes.find(item => {
    return item.attribute == 'DefectTrends';
  });
  return productItem?.currentStatus;
};

export const getCommittedStoryPoints = attributes => {
  const productItem = attributes.find(item => {
    return item.attribute == 'CommittedStoryPoints';
  });
  return productItem?.currentStatus;
};

export const getCompletedStoryPoints = attributes => {
  const productItem = attributes.find(item => {
    return item.attribute == 'CompletedStoryPoints';
  });
  return productItem?.currentStatus;
};

export const getEffortRate = attributes => {
  const productItem = attributes.find(item => {
    return item.attribute == 'EffortRate';
  });
  return productItem?.currentStatus;
};

export const getMaxValue = values => {
  return Math.max(
    ...values.map(item => {
      return Math.max(...item);
    }),
  );
};
