// getting all required elements
const searchInput = document.querySelector('.searchInput');
const input = searchInput.querySelector('input');
const resultBox = searchInput.querySelector('.resultBox');
const icon = searchInput.querySelector('.icon');
let linkTag = searchInput.querySelector('a');
const preTag = document.querySelector('pre');
let webLink;

const elasticApi = `https://testi.es.us-east-2.aws.elastic-cloud.com/_search`;
const carApi = `http://localhost:3000/api/search`;

document.addEventListener('DOMContentLoaded', () => {
  input.onkeyup = _.debounce((e) => {
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if (userData) {
      Http.post(`${carApi}/_search`, {
        query: {
          match_phrase_prefix: {
            name: {
              query: `${userData.trim()}`,
            },
          },
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          emptyArray = resp.hits.hits.map((hit) => ({
            name: hit._source.name,
            id: hit._source.id,
          }));
          emptyArray = emptyArray.map((data) => {
            // passing return data inside li tag
            return (data = `<li id=${data.id}>` + data.name + '</li>');
          });

          searchInput.classList.add('active'); //show autocomplete box

          showSuggestions(emptyArray);
          let allList = resultBox.querySelectorAll('li');

          for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute('onclick', 'select(this)');
          }
        });
    } else {
      searchInput.classList.remove('active'); //hide autocomplete box
      preTag.innerHTML = '';
    }
  }, 500);
});

// if user press any key and release

function select(element) {
  Http.get(`${carApi}?id=${element.getAttribute('id')}`)
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      preTag.innerHTML = JSON.stringify(resp, null, 2);
    });
  let selectData = element.textContent;
  input.value = selectData;
  resultBox.innerHTML = '';
}

function showSuggestions(list) {
  let listData;
  if (!list.length) {
    listData = '';
    preTag.innerHTML = '';
    resultBox.innerHTML = listData;
  } else {
    listData = list.join('');
    resultBox.innerHTML = listData;
  }
}
