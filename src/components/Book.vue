<template>
  <div class="book-cover">
    <div class="image">
      <img :src="book.cover" alt>
      <div
        class="status"
        :class="[book.done ? 'done' : 'reading']"
      >{{book.done ? 'Done' : 'Reading'}}</div>
    </div>
    <div class="content">
      <p class="book-title">{{book.title}}</p>
      <p class="author">{{book.author}}</p>
    </div>
    <div class="extra">
      <v-btn color="primary">More</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["book"]
};
</script>

<style scoped>
.image {
  position: relative;
}

.status {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  color: white;
  font-weight: bold;
}

.done {
  background: #00e676;
}

.reading {
  background: #ffa000;
}
.book-cover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.363);
  height: auto;
  height: 450px;
  display: flex;
  margin: 10px;
  flex-direction: column;
}

.image {
  height: 300px;
  width: 100%;
}

img {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: contain;
}

.book-title {
  text-align: center;
  height: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0;
}

.author {
  font-size: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.extra {
  display: flex;
  text-align: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .book-cover {
    width: 350px;
    align-self: center;
  }
}
</style>