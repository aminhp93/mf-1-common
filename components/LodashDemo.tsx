import _ from "lodash";

const LodashDemo = () => {
  const xxx = _.chunk(["a", "b", "c", "d"], 2);
  // => [['a', 'b'], ['c', 'd']]
  return xxx.map((i: any) => JSON.stringify(i));
};

export default LodashDemo;
