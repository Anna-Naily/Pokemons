<template>
  <div>
    <footer class="footer">
      <p class="footer__text">That's All!</p>
      <button class="footer__btn" @click="scrollTo">Come Back</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FooterComp',
  methods: {
    scrollTo() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: #031924;
}
.footer {
  max-width: 1400px;
  margin: 0 auto;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .footer__text {
    font-size: 28px;
    color: aliceblue;
    margin-top: 30px;
  }
  .footer__btn {
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
  }
}
</style>