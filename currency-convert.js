const axios = require('axios');

axios.get('http://data.fixer.io/api/latest?access_key=da8bab68e11d18881dfde48cf1b83b1a')
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });


// USD, CAD, 20
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada

//http://data.fixer.io/api/latest?access_key=da8bab68e11d18881dfde48cf1b83b1a

// const getExchangeRate = (from, to) =>{
//
//   return  axios.get('http://data.fixer.io/api/latest?access_key=da8bab68e11d18881dfde48cf1b83b1a').then( (response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

const getExchangeRate = async (from, to) =>{

  try{
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=da8bab68e11d18881dfde48cf1b83b1a');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if(isNaN(rate)) {
      throw new Error();
    }

    return rate;
  }catch(e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }

};

// const getCourties = (currencyCode) =>{
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then( (response) =>{
//     return response.data.map((country) => country.name);
//   });
// }


const getCourties = async (currencyCode) => {

  try{
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);

  }catch(e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }

};

const converyCurreny = async (from, to, amount) =>{
  const rate = await getExchangeRate(from, to);
  const convertedAmoud = (rate * amount).toFixed(2);
  const countries = await getCourties(to);


  return `${amount} ${from} is worth ${convertedAmoud} ${to}. You can spend these in the following countries: ${countries}`;
}

converyCurreny('USD', 'CAD', 20).then( (result)=> {
 console.log(result);
}).catch( (e) =>{
  console.log(e.message);
});

const add = async (a, b) => a + b + c;

const doWork = async () =>{
  try{
    const result = await add(12, 13);
    return result;
  }catch (e) {
    return 10;
  }
};

doWork().then( (data) =>{
  console.log(data);
}).catch( (e)=>{
  console.log('Something went wrong');
});
