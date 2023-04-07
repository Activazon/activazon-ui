export const timeTaken = () => {
  const stops = {};
  let start = null;
  let last = null;

  const toString = () =>
    Object.values(stops)
      .map(
        (stop) =>
          `${stop.name}: ${stop.diffSinceStart}ms (+${stop.diffSinceLast}ms)`
      )
      .join(",\n");

  const add = (name) => {
    const now = Date.now();
    const lastDate = last || start;
    stops[name] = {
      name,
      date: now,
      diffSinceStart: now - start,
      diffSinceLast: now - lastDate,
    };
    last = now;
    alert(
      `${stops[name].name}: ${stops[name].diffSinceStart}ms (+${stops[name].diffSinceLast}ms)`
    );
  };

  return {
    start: () => {
      start = Date.now();
    },
    add,
    toString,
  };
};
