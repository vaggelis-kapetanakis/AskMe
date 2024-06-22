interface Item {
  _id: string;
}

const foundInArr = (arr: Item[], id: string): boolean => {
  const found = arr.some((el) => el._id === id);
  return found;
};

export { foundInArr };
