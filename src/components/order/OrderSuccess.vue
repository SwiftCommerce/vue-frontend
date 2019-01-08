<template>
  <div class="container">
    <div class="row">
      <div class="center-screen d-flex text-center">
        <div id="success-spinner" class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <h1 id="title">Creating Payment</h1>
      </div>
    </div>
  </div>
</template>

<style>
.center-screen {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

#success-spinner {
  height: 5em;
  width: 5em;
}

#title {
  margin: 1em 0 0;
}
</style>
