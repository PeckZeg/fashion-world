const func1 = () => new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('func1 error')), 512);
});

const func2 = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve('func2'), 512);
});


const func = async () => {
  const f1 = await func1();
  const f2 = await func2();

  console.log({ f1, f2 });

  return { f1, f2 };
};

const funcc = async () => {
  try {
    const funcV = await func();

    console.log(funcV);
  }

  catch (err) {
    console.error(err);
  }
};

funcc();
