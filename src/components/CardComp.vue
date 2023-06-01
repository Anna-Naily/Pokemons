<template>
  <div class="card-main">
    <div class="header-block">
      <div class="header wrapper">
        <div class="header__logo">
          <router-link to="/">
            <img class="img-logo" src="../assets/img/pokiLogo.png" alt="logo" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="btn-block wrapper">
      <router-link to="/">
        <button class="return">
          <font-awesome-icon class="icon" icon="fa-solid fa-left-long" />Return
        </button>
      </router-link>
    </div>
    <article class="card-block wrapper">
      <div class="left-bar">
        <span class="left-bar__name">{{ pokemon.name }}</span>
        <span class="left-bar__id">№ {{ pokemon.id }}</span>
        <img
          class="left-bar__img"
          :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/' + id + '.png'"
          alt="picture"
        />
        <div class="card-params">
          <span class="card-params__element">
            <p class="params-name">Height</p>
            <span class="params-value">{{ pokemon.height/10 }}</span>
          </span>
          <span class="card-params__element">
            <p class="params-name">Weight</p>
            <span class="params-value">{{ pokemon.weight/10 }}</span>
          </span>
          <span class="card-params__element" v-for="item in pokemon.stats" :key="item.stat.name">
            <p class="params-name">{{ item.stat.name }}</p>
            <p class="params-value">{{ item.base_stat }}</p>
          </span>
          <span class="card-params__element">
            <p class="params-name">EXP</p>
            <span class="params-value">{{ pokemon.base_experience }}</span>
          </span>
        </div>
      </div>
      <div class="right-bar">
        <div class="types">
          <p class="types__name types-item">Pokemon's Type</p>
          <div class="types__value types-el">
            <span
              class="type-list list-block"
              v-for="item in pokemon.types"
              :key="item.type.name"
            >{{ item.type.name }}</span>
          </div>
          <p class="gender__name types-item">Gender</p>
          <div class="gender__value types-el">
            <span class="gender-list list-block" v-for="item in gender" :key="item">{{ item }}</span>
          </div>
          <p class="habitat__name types-item">Habitat</p>
          <div class="habitat__value types-el">
            <span class="habitat-list list-block" v-for="item in habitat" :key="item">{{ item }}</span>
          </div>
        </div>
        <div class="ability">
          <p class="ability__name">Abilities</p>
          <span
            v-if="pokemon.abilities"
            class="ability__value"
          >{{ pokemon.abilities[0].ability.name }}</span>
          <span class="ability__abilDiscription">{{discriptionAbility}}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CardComp',
  data() {
    return {
      pokemon: {},
      gender: [],
      habitat: [],
      id: '',
      url: 'https://pokeapi.co/api/v2/pokemon/',
      genderUrl: 'https://pokeapi.co/api/v2/gender/',
      habitatUrl: 'https://pokeapi.co/api/v2/pokemon-habitat/',
      imgUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/',
      discriptionAbility: '',
    };
  },
  methods: {
    getPokemon() {
      let request = new Request(this.url + this.id);
      fetch(request)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          this.pokemon = data;
          return data;
        })
        .then((obj) => {
          this.getDiscriptionAbility(obj.abilities[0].ability.url);
          return obj;
        })
        .then((pokemon) => {
          this.getGender(pokemon.name);
          return pokemon;
        })
        .then((pokemon) => {
          this.getHabitat(pokemon.name);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //выводит описание абилки на англ. языке
    getDiscriptionAbility(url) {
      let request = new Request(url);
      fetch(request)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          data.effect_entries.forEach((effectItem) => {
            if (effectItem.language.name === 'en') {
              this.discriptionAbility = effectItem.effect;
              return;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGender(pokeName) {
      let request = new Request(this.genderUrl);
      fetch(request)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          data.results.forEach((el) => {
            let request = new Request(el.url);
            fetch(request)
              .then((resp) => {
                if (resp.status === 200) return resp.json();
              })
              .then((genderItems) => {
                genderItems.pokemon_species_details.forEach((el) => {
                  if (el.pokemon_species.name == pokeName)
                    this.gender.push(genderItems.name);
                });
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getHabitat(pokeName) {
      let request = new Request(this.habitatUrl);
      fetch(request)
        .then((resp) => {
          if (resp.status === 200) return resp.json();
        })
        .then((data) => {
          data.results.forEach((el) => {
            let request = new Request(el.url);
            fetch(request)
              .then((resp) => {
                if (resp.status === 200) return resp.json();
              })
              .then((habitatItems) => {
                habitatItems.pokemon_species.forEach((el) => {
                  if (el.name == pokeName) this.habitat.push(habitatItems.name);
                });
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.getPokemon();
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/style/main.scss';
@import '../assets/style/responsive.scss';

.card-main {
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
}
.btn-block {
  .return {
    margin-top: 30px;
    background: none;
    border-image: linear-gradient(
        90deg,
        rgba(148, 148, 228, 1) 41%,
        rgba(0, 212, 255, 1) 100%
      )
      1;
    border-width: 3px;
    border-style: solid;
    padding: 15px 30px;
    font-size: 20px;
    color: #9494e4;
    font-weight: 400;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      background: linear-gradient(
        90deg,
        rgba(148, 148, 228, 1) 41%,
        rgba(0, 212, 255, 1) 100%
      );
      color: #031924;
    }
    .icon {
      color: rgba(148, 148, 228, 1);
      margin-right: 3px;
    }
  }
}
.card-block {
  display: flex;
  justify-content: space-around;
  padding-bottom: 50px;
  margin-top: 50px;
  align-items: center;
}
.left-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  .left-bar__name {
    font-size: 30px;
    color: #0b5274;
    text-align: center;
    font-weight: 600;
    &:first-letter {
      text-transform: uppercase;
    }
  }
  .left-bar__id {
    font-size: 16px;
    text-align: center;
    color: #0b5274;
    margin-top: 20px;
  }
  .left-bar__img {
    width: 350px;
    margin-top: 20px;
  }
  .card-params {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #13cdfc75;
    padding: 20px;
    border-radius: 7px;
    -webkit-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);

    .card-params__element {
      display: flex;
      justify-content: space-between;
      width: 300px;
      margin-bottom: 7px;
      &:last-child {
        margin-bottom: 0px;
      }
      .params-name {
        font-size: 18px;
        color: #031924;
        font-weight: 400;
        text-transform: uppercase;
      }
      .params-value {
        font-size: 18px;
        color: rgb(197, 29, 29);
        font-weight: 600;
      }
    }
  }
}
.right-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  .types {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #b1ffc980;
    border-radius: 7px;
    -webkit-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    padding: 30px;
    width: 300px;
    .types-item {
      font-size: 24px;
      text-align: center;
      font-weight: 600;
      margin-top: 30px;
    }
    .types-el {
      display: flex;
      justify-content: space-around;
      .type-list {
        color: #ffffff;
        background-color: #583bffad;
      }
      .gender-list {
        color: #ffffff;
        background-color: #f500e0ad;
      }
      .habitat-list {
        color: #ffffff;
        background-color: #0027d3ad;
      }
      .list-block {
        margin-top: 20px;
        padding: 5px 7px;
        border-radius: 7px;
        font-size: 18px;
        margin-right: 10px;
      }
    }
    .types__name {
      color: #006ba0da;
    }
    .gender__name {
      color: #af7913fb;
    }
    .habitat__name {
      color: #1a8631e1;
    }
  }

  .ability {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffee0780;
    border-radius: 7px;
    -webkit-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 16px 7px rgba(34, 60, 80, 0.2);
    padding: 30px;
    width: 300px;
    margin-top: 50px;
    .ability__name {
      font-size: 24px;
      color: #031924bb;
      text-align: center;
      font-weight: 600;
    }
    .ability__value {
      text-transform: uppercase;
      background-color: #0b7fb4;
      color: rgb(255, 255, 255);
      font-weight: 600;
      padding: 10px 12px;
      border-radius: 7px;
      margin-top: 30px;
    }
    .ability__abilDiscription {
      margin-top: 40px;
      font-size: 16px;
      font-style: italic;
      font-weight: 400;
      color: #053449;
    }
  }
}
</style>