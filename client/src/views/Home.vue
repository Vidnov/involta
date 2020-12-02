<template>
  <section>
    <div class="home container">
      <table class="highlight">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Оклад</th>
            <th>Статус</th>
            <th>Дата</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
        </tbody>
      </table>
      <div class="button">Отправить</div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
<style>
.home {
  padding-top: 100px;
}
.container {
  margin: 0 auto;
  width: 80%;
}
body {
}
.highlight {
  margin-bottom: 50px;
}
.button {
  background: darkblue;
  color: white;
  display: grid;
  text-align: center;
  margin: 0 auto;
  width: 200px;
  border: 1px solid grey;
  border-radius: 25px;

}
</style>
