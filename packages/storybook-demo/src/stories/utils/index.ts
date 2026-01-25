export const hideAttributes = (hiddenKeys: string[]) => {
  const hideAttributeOption = {
    table: {
      disable: true,
    },
  };

  const hiddenAttributeArgTypes = hiddenKeys.reduce<Record<string, typeof hideAttributeOption>>(
    (obj, key) => {
      obj[key] = hideAttributeOption;
      return obj;
    },
    {}
  );

  return hiddenAttributeArgTypes;
};

export const disableAttributes = (disableKeys: string[]) => {
  const disableAttributeOption = {
    control: {
      disable: true,
    },
  };

  const disabledAttributeArgTypes = disableKeys.reduce<
    Record<string, typeof disableAttributeOption>
  >((obj, key) => {
    obj[key] = disableAttributeOption;
    return obj;
  }, {});

  return disabledAttributeArgTypes;
};

export const groupArgs = (argNames: string[], groupName: string) => {
  const res: Record<string, unknown> = {};
  argNames.forEach((v) => {
    res[v] = { table: { category: groupName } };
  });
  return res;
};
