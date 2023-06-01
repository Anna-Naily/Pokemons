<template>
  <div class="main">
    <div class="header-block">
      <div class="header wrapper">
        <div class="header__logo">
          <router-link to="/">
            <img class="img-logo" src="../assets/img/pokiLogo.png" alt="logo" />
          </router-link>
        </div>
        <div class="header__search">
          <input
            class="search-input"
            type="search"
            placeholder="Pokemon's name..."
            v-model.trim="searchForm"
          />
          <button class="search-btn" @click="clearSearch">
            <img src="../assets/img/searchBtn.png" alt="button" />
          </button>
        </div>
      </div>
    </div>
    <main class="content wrapper">
      <div class="content__list">
        <span class="content__list-span" v-for="pokemon in searchHandler" :key="pokemon.id">
          <router-link class="card" :to="'/'+pokemon.id">
            <img
              class="card__img"
              :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/' + pokemon.id + '.png'"
              alt="picture"
            />
            <p class="card__name">{{ pokemon.name }}</p>
          </router-link>
        </span>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'MainComp',
  data() {
    return {
      url: 'https://pokeapi.co/api/v2/pokemon/?limit=70',
      imgUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/',
      pokemons: [],
      searchForm: '',
    };
  },

  methods: {
    fetchData() {
      let request = new Request(this.url);
      fetch(request)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          data.results.forEach((pokemon) => {
            this.fetchPokemon(pokemon.url);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchPokemon(url) {
      let request = new Request(url);
      fetch(request)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.pokemons.push(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearSearch() {
      this.searchForm = '';
    },
  },
  mounted() {
    this.fetchData();
  },

  computed: {
    searchHandler() {
      return this.pokemons.filter((pokemon) => {
        return pokemon.name
          .toLowerCase()
          .includes(this.searchForm.toLowerCase());
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/main.scss';
@import '../assets/style/responsive.scss';
.main {
  background-color: #d1e6f5;
  min-height: calc(100vh - 200px);
}
.header-block {
  background-color: #031924;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  .header__logo {
    .img-logo {
      width: 200px;
    }
  }
  .header__search {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .search-input {
      width: 190px;
      padding: 7px 6px;
      font-size: 16px;
      color: #4d4d4d;
      border-radius: 6px;
      border: none;
      margin-right: 8px;
      background-color: #f1efef;
      &:focus {
        outline: none;
      }
    }
    .search-btn {
      background: none;
      border: none;
      cursor: pointer;
      width: 30px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding-top: 2px;
      }
    }
  }
}
.content {
  .content__list {
    margin-top: 50px;
    padding-bottom: 50px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 30px;
    .card {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 222px;
      height: 333px;
      border: none;
      border-radius: 6px;
      background-color: #fff;
      transition: 0.2s;
      cursor: pointer;
      -webkit-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
      box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
      &:hover {
        transform: scale(1.1);
        -webkit-box-shadow: 0px 0px 16px 18px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 0px 16px 18px rgba(34, 60, 80, 0.2);
        box-shadow: 0px 0px 16px 18px rgba(34, 60, 80, 0.2);
      }
      .card__img {
        width: 200px;
        margin-top: 24px;
      }
      .card__name {
        font-size: 24px;
        text-align: center;
        color: #072c3f;
        margin-top: 20px;
        &:first-letter {
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>